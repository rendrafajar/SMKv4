import { query } from "@/lib/db";
import { Guru } from "./types";

export async function getAllGuru(): Promise<Guru[]> {
  const result = await query("SELECT * FROM guru ORDER BY nama");
  return result.rows;
}

export async function getGuruById(id: number): Promise<Guru | null> {
  const result = await query("SELECT * FROM guru WHERE id = $1", [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function createGuru(
  guru: Omit<Guru, "id" | "created_at" | "updated_at">,
): Promise<Guru> {
  const result = await query(
    "INSERT INTO guru (nip, nama, email, bidang_keahlian, beban_mengajar_min, beban_mengajar_max) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      guru.nip,
      guru.nama,
      guru.email,
      guru.bidang_keahlian,
      guru.beban_mengajar_min,
      guru.beban_mengajar_max,
    ],
  );
  return result.rows[0];
}

export async function updateGuru(
  id: number,
  guru: Partial<Omit<Guru, "id" | "created_at" | "updated_at">>,
): Promise<Guru | null> {
  // Build the SET part of the query dynamically based on provided fields
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (guru.nip !== undefined) {
    fields.push(`nip = $${paramIndex}`);
    values.push(guru.nip);
    paramIndex++;
  }

  if (guru.nama !== undefined) {
    fields.push(`nama = $${paramIndex}`);
    values.push(guru.nama);
    paramIndex++;
  }

  if (guru.email !== undefined) {
    fields.push(`email = $${paramIndex}`);
    values.push(guru.email);
    paramIndex++;
  }

  if (guru.bidang_keahlian !== undefined) {
    fields.push(`bidang_keahlian = $${paramIndex}`);
    values.push(guru.bidang_keahlian);
    paramIndex++;
  }

  if (guru.beban_mengajar_min !== undefined) {
    fields.push(`beban_mengajar_min = $${paramIndex}`);
    values.push(guru.beban_mengajar_min);
    paramIndex++;
  }

  if (guru.beban_mengajar_max !== undefined) {
    fields.push(`beban_mengajar_max = $${paramIndex}`);
    values.push(guru.beban_mengajar_max);
    paramIndex++;
  }

  // Add updated_at timestamp
  fields.push(`updated_at = NOW()`);

  if (fields.length === 0) {
    return await getGuruById(id); // No fields to update
  }

  values.push(id); // Add ID as the last parameter

  const result = await query(
    `UPDATE guru SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
    values,
  );

  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function deleteGuru(id: number): Promise<boolean> {
  const result = await query("DELETE FROM guru WHERE id = $1 RETURNING id", [
    id,
  ]);
  return result.rows.length > 0;
}

export async function getGuruWithPreferensi(guruId: number) {
  const result = await query(
    `SELECT g.*, p.slot_waktu_id, p.preferensi, s.hari, s.jam_mulai, s.jam_selesai 
     FROM guru g 
     LEFT JOIN preferensi_guru p ON g.id = p.guru_id 
     LEFT JOIN slot_waktu s ON p.slot_waktu_id = s.id 
     WHERE g.id = $1`,
    [guruId],
  );
  return result.rows;
}

export async function getGuruBebanMengajar() {
  const result = await query(
    `SELECT g.id, g.nama, g.beban_mengajar_min, g.beban_mengajar_max, 
     COUNT(j.id) as jumlah_jam_mengajar, 
     SUM(mp.jam_per_minggu) as total_jam_per_minggu 
     FROM guru g 
     LEFT JOIN jadwal j ON g.id = j.guru_id 
     LEFT JOIN mata_pelajaran mp ON j.mata_pelajaran_id = mp.id 
     GROUP BY g.id, g.nama, g.beban_mengajar_min, g.beban_mengajar_max`,
  );
  return result.rows;
}
