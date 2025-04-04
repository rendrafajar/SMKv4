import { query } from "@/lib/db";
import { Kelas } from "./types";

export async function getAllKelas(): Promise<Kelas[]> {
  const result = await query(
    "SELECT * FROM kelas ORDER BY tingkat, jurusan, nama",
  );
  return result.rows;
}

export async function getKelasByJurusan(jurusan: string): Promise<Kelas[]> {
  const result = await query(
    "SELECT * FROM kelas WHERE jurusan = $1 ORDER BY tingkat, nama",
    [jurusan],
  );
  return result.rows;
}

export async function getKelasByTingkat(tingkat: number): Promise<Kelas[]> {
  const result = await query(
    "SELECT * FROM kelas WHERE tingkat = $1 ORDER BY jurusan, nama",
    [tingkat],
  );
  return result.rows;
}

export async function getKelasById(id: number): Promise<Kelas | null> {
  const result = await query("SELECT * FROM kelas WHERE id = $1", [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function createKelas(
  kelas: Omit<Kelas, "id" | "created_at" | "updated_at">,
): Promise<Kelas> {
  const result = await query(
    "INSERT INTO kelas (nama, tingkat, jurusan, jumlah_siswa) VALUES ($1, $2, $3, $4) RETURNING *",
    [kelas.nama, kelas.tingkat, kelas.jurusan, kelas.jumlah_siswa],
  );
  return result.rows[0];
}

export async function updateKelas(
  id: number,
  kelas: Partial<Omit<Kelas, "id" | "created_at" | "updated_at">>,
): Promise<Kelas | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (kelas.nama !== undefined) {
    fields.push(`nama = $${paramIndex}`);
    values.push(kelas.nama);
    paramIndex++;
  }

  if (kelas.tingkat !== undefined) {
    fields.push(`tingkat = $${paramIndex}`);
    values.push(kelas.tingkat);
    paramIndex++;
  }

  if (kelas.jurusan !== undefined) {
    fields.push(`jurusan = $${paramIndex}`);
    values.push(kelas.jurusan);
    paramIndex++;
  }

  if (kelas.jumlah_siswa !== undefined) {
    fields.push(`jumlah_siswa = $${paramIndex}`);
    values.push(kelas.jumlah_siswa);
    paramIndex++;
  }

  fields.push(`updated_at = NOW()`);

  if (fields.length === 0) {
    return await getKelasById(id);
  }

  values.push(id);

  const result = await query(
    `UPDATE kelas SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
    values,
  );

  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function deleteKelas(id: number): Promise<boolean> {
  const result = await query("DELETE FROM kelas WHERE id = $1 RETURNING id", [
    id,
  ]);
  return result.rows.length > 0;
}

export async function getKelasWithJadwal(kelasId: number) {
  const result = await query(
    `SELECT k.*, j.id as jadwal_id, mp.nama as mata_pelajaran, g.nama as guru, r.nama as ruangan, 
     sw.hari, sw.jam_mulai, sw.jam_selesai 
     FROM kelas k 
     LEFT JOIN jadwal j ON k.id = j.kelas_id 
     LEFT JOIN mata_pelajaran mp ON j.mata_pelajaran_id = mp.id 
     LEFT JOIN guru g ON j.guru_id = g.id 
     LEFT JOIN ruangan r ON j.ruangan_id = r.id 
     LEFT JOIN slot_waktu sw ON j.slot_waktu_id = sw.id 
     WHERE k.id = $1 
     ORDER BY sw.hari, sw.jam_mulai`,
    [kelasId],
  );
  return result.rows;
}
