import { query } from "@/lib/db";
import { Jadwal } from "./types";

export async function getAllJadwal(): Promise<any[]> {
  const result = await query(
    `SELECT j.*, 
     mp.nama as mata_pelajaran, 
     g.nama as guru, 
     k.nama as kelas, 
     r.nama as ruangan, 
     sw.hari, sw.jam_mulai, sw.jam_selesai 
     FROM jadwal j 
     JOIN mata_pelajaran mp ON j.mata_pelajaran_id = mp.id 
     JOIN guru g ON j.guru_id = g.id 
     JOIN kelas k ON j.kelas_id = k.id 
     JOIN ruangan r ON j.ruangan_id = r.id 
     JOIN slot_waktu sw ON j.slot_waktu_id = sw.id 
     ORDER BY sw.hari, sw.jam_mulai`,
  );
  return result.rows;
}

export async function getJadwalById(id: number): Promise<any | null> {
  const result = await query(
    `SELECT j.*, 
     mp.nama as mata_pelajaran, 
     g.nama as guru, 
     k.nama as kelas, 
     r.nama as ruangan, 
     sw.hari, sw.jam_mulai, sw.jam_selesai 
     FROM jadwal j 
     JOIN mata_pelajaran mp ON j.mata_pelajaran_id = mp.id 
     JOIN guru g ON j.guru_id = g.id 
     JOIN kelas k ON j.kelas_id = k.id 
     JOIN ruangan r ON j.ruangan_id = r.id 
     JOIN slot_waktu sw ON j.slot_waktu_id = sw.id 
     WHERE j.id = $1`,
    [id],
  );
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function getJadwalByKelas(kelasId: number): Promise<any[]> {
  const result = await query(
    `SELECT j.*, 
     mp.nama as mata_pelajaran, 
     g.nama as guru, 
     r.nama as ruangan, 
     sw.hari, sw.jam_mulai, sw.jam_selesai 
     FROM jadwal j 
     JOIN mata_pelajaran mp ON j.mata_pelajaran_id = mp.id 
     JOIN guru g ON j.guru_id = g.id 
     JOIN ruangan r ON j.ruangan_id = r.id 
     JOIN slot_waktu sw ON j.slot_waktu_id = sw.id 
     WHERE j.kelas_id = $1 
     ORDER BY sw.hari, sw.jam_mulai`,
    [kelasId],
  );
  return result.rows;
}

export async function getJadwalByGuru(guruId: number): Promise<any[]> {
  const result = await query(
    `SELECT j.*, 
     mp.nama as mata_pelajaran, 
     k.nama as kelas, 
     r.nama as ruangan, 
     sw.hari, sw.jam_mulai, sw.jam_selesai 
     FROM jadwal j 
     JOIN mata_pelajaran mp ON j.mata_pelajaran_id = mp.id 
     JOIN kelas k ON j.kelas_id = k.id 
     JOIN ruangan r ON j.ruangan_id = r.id 
     JOIN slot_waktu sw ON j.slot_waktu_id = sw.id 
     WHERE j.guru_id = $1 
     ORDER BY sw.hari, sw.jam_mulai`,
    [guruId],
  );
  return result.rows;
}

export async function getJadwalByRuangan(ruanganId: number): Promise<any[]> {
  const result = await query(
    `SELECT j.*, 
     mp.nama as mata_pelajaran, 
     g.nama as guru, 
     k.nama as kelas, 
     sw.hari, sw.jam_mulai, sw.jam_selesai 
     FROM jadwal j 
     JOIN mata_pelajaran mp ON j.mata_pelajaran_id = mp.id 
     JOIN guru g ON j.guru_id = g.id 
     JOIN kelas k ON j.kelas_id = k.id 
     JOIN slot_waktu sw ON j.slot_waktu_id = sw.id 
     WHERE j.ruangan_id = $1 
     ORDER BY sw.hari, sw.jam_mulai`,
    [ruanganId],
  );
  return result.rows;
}

export async function createJadwal(
  jadwal: Omit<Jadwal, "id" | "created_at" | "updated_at">,
): Promise<Jadwal> {
  // Check for conflicts before creating
  const conflicts = await checkJadwalConflicts(jadwal);
  if (conflicts.length > 0) {
    throw new Error(`Jadwal conflicts detected: ${JSON.stringify(conflicts)}`);
  }

  const result = await query(
    "INSERT INTO jadwal (mata_pelajaran_id, guru_id, kelas_id, ruangan_id, slot_waktu_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      jadwal.mata_pelajaran_id,
      jadwal.guru_id,
      jadwal.kelas_id,
      jadwal.ruangan_id,
      jadwal.slot_waktu_id,
    ],
  );
  return result.rows[0];
}

export async function updateJadwal(
  id: number,
  jadwal: Partial<Omit<Jadwal, "id" | "created_at" | "updated_at">>,
): Promise<Jadwal | null> {
  // Get current jadwal data
  const currentJadwal = await query("SELECT * FROM jadwal WHERE id = $1", [id]);
  if (currentJadwal.rows.length === 0) {
    return null;
  }

  // Merge current with updates
  const updatedJadwal = {
    ...currentJadwal.rows[0],
    ...jadwal,
  };

  // Check for conflicts with the updated data
  const conflicts = await checkJadwalConflicts(updatedJadwal, id);
  if (conflicts.length > 0) {
    throw new Error(`Jadwal conflicts detected: ${JSON.stringify(conflicts)}`);
  }

  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (jadwal.mata_pelajaran_id !== undefined) {
    fields.push(`mata_pelajaran_id = $${paramIndex}`);
    values.push(jadwal.mata_pelajaran_id);
    paramIndex++;
  }

  if (jadwal.guru_id !== undefined) {
    fields.push(`guru_id = $${paramIndex}`);
    values.push(jadwal.guru_id);
    paramIndex++;
  }

  if (jadwal.kelas_id !== undefined) {
    fields.push(`kelas_id = $${paramIndex}`);
    values.push(jadwal.kelas_id);
    paramIndex++;
  }

  if (jadwal.ruangan_id !== undefined) {
    fields.push(`ruangan_id = $${paramIndex}`);
    values.push(jadwal.ruangan_id);
    paramIndex++;
  }

  if (jadwal.slot_waktu_id !== undefined) {
    fields.push(`slot_waktu_id = $${paramIndex}`);
    values.push(jadwal.slot_waktu_id);
    paramIndex++;
  }

  fields.push(`updated_at = NOW()`);

  if (fields.length === 0) {
    return await getJadwalById(id);
  }

  values.push(id);

  const result = await query(
    `UPDATE jadwal SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
    values,
  );

  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function deleteJadwal(id: number): Promise<boolean> {
  const result = await query("DELETE FROM jadwal WHERE id = $1 RETURNING id", [
    id,
  ]);
  return result.rows.length > 0;
}

// Helper function to check for jadwal conflicts
async function checkJadwalConflicts(
  jadwal: Partial<Jadwal>,
  excludeId?: number,
): Promise<any[]> {
  const conflicts = [];

  // Check guru availability for the slot
  const guruConflict = await query(
    `SELECT j.*, g.nama as guru_nama, sw.hari, sw.jam_mulai, sw.jam_selesai 
     FROM jadwal j 
     JOIN guru g ON j.guru_id = g.id 
     JOIN slot_waktu sw ON j.slot_waktu_id = sw.id 
     WHERE j.guru_id = $1 AND j.slot_waktu_id = $2 ${excludeId ? "AND j.id != $3" : ""}`,
    excludeId
      ? [jadwal.guru_id, jadwal.slot_waktu_id, excludeId]
      : [jadwal.guru_id, jadwal.slot_waktu_id],
  );

  if (guruConflict.rows.length > 0) {
    conflicts.push({
      type: "guru_conflict",
      message: `Guru ${guruConflict.rows[0].guru_nama} sudah dijadwalkan pada slot waktu yang sama`,
      conflictingJadwal: guruConflict.rows[0],
    });
  }

  // Check kelas availability for the slot
  const kelasConflict = await query(
    `SELECT j.*, k.nama as kelas_nama, sw.hari, sw.jam_mulai, sw.jam_selesai 
     FROM jadwal j 
     JOIN kelas k ON j.kelas_id = k.id 
     JOIN slot_waktu sw ON j.slot_waktu_id = sw.id 
     WHERE j.kelas_id = $1 AND j.slot_waktu_id = $2 ${excludeId ? "AND j.id != $3" : ""}`,
    excludeId
      ? [jadwal.kelas_id, jadwal.slot_waktu_id, excludeId]
      : [jadwal.kelas_id, jadwal.slot_waktu_id],
  );

  if (kelasConflict.rows.length > 0) {
    conflicts.push({
      type: "kelas_conflict",
      message: `Kelas ${kelasConflict.rows[0].kelas_nama} sudah dijadwalkan pada slot waktu yang sama`,
      conflictingJadwal: kelasConflict.rows[0],
    });
  }

  // Check ruangan availability for the slot
  const ruanganConflict = await query(
    `SELECT j.*, r.nama as ruangan_nama, sw.hari, sw.jam_mulai, sw.jam_selesai 
     FROM jadwal j 
     JOIN ruangan r ON j.ruangan_id = r.id 
     JOIN slot_waktu sw ON j.slot_waktu_id = sw.id 
     WHERE j.ruangan_id = $1 AND j.slot_waktu_id = $2 ${excludeId ? "AND j.id != $3" : ""}`,
    excludeId
      ? [jadwal.ruangan_id, jadwal.slot_waktu_id, excludeId]
      : [jadwal.ruangan_id, jadwal.slot_waktu_id],
  );

  if (ruanganConflict.rows.length > 0) {
    conflicts.push({
      type: "ruangan_conflict",
      message: `Ruangan ${ruanganConflict.rows[0].ruangan_nama} sudah digunakan pada slot waktu yang sama`,
      conflictingJadwal: ruanganConflict.rows[0],
    });
  }

  // Check guru preference for the slot
  const guruPreference = await query(
    `SELECT p.*, g.nama as guru_nama, sw.hari, sw.jam_mulai, sw.jam_selesai 
     FROM preferensi_guru p 
     JOIN guru g ON p.guru_id = g.id 
     JOIN slot_waktu sw ON p.slot_waktu_id = sw.id 
     WHERE p.guru_id = $1 AND p.slot_waktu_id = $2 AND p.preferensi = 'unavailable'`,
    [jadwal.guru_id, jadwal.slot_waktu_id],
  );

  if (guruPreference.rows.length > 0) {
    conflicts.push({
      type: "guru_preference_conflict",
      message: `Guru ${guruPreference.rows[0].guru_nama} tidak tersedia pada slot waktu yang dipilih`,
      conflictingPreference: guruPreference.rows[0],
    });
  }

  return conflicts;
}

// Function to generate jadwal using genetic algorithm
export async function generateJadwal(params: {
  populationSize?: number;
  generations?: number;
  mutationRate?: number;
  crossoverRate?: number;
  elitismCount?: number;
}) {
  // Default parameters
  const populationSize = params.populationSize || 100;
  const generations = params.generations || 100;
  const mutationRate = params.mutationRate || 0.1;
  const crossoverRate = params.crossoverRate || 0.8;
  const elitismCount = params.elitismCount || 5;

  // This is a placeholder for the actual genetic algorithm implementation
  // In a real implementation, you would:
  // 1. Fetch all necessary data (mata pelajaran, guru, kelas, ruangan, slot waktu, preferensi)
  // 2. Initialize a population of random schedules
  // 3. Evaluate fitness of each schedule based on constraints
  // 4. Perform selection, crossover, and mutation for specified generations
  // 5. Return the best schedule found

  // For now, we'll just return a message indicating the function was called
  return {
    message: "Jadwal generation requested with parameters:",
    params: {
      populationSize,
      generations,
      mutationRate,
      crossoverRate,
      elitismCount,
    },
    status: "not_implemented",
  };
}
