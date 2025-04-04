// Database model types

export interface Guru {
  id: number;
  nip: string;
  nama: string;
  email: string;
  bidang_keahlian: string;
  beban_mengajar_min: number;
  beban_mengajar_max: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Kelas {
  id: number;
  nama: string;
  tingkat: number;
  jurusan: string;
  jumlah_siswa: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Ruangan {
  id: number;
  nama: string;
  kapasitas: number;
  jenis: string;
  fasilitas: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface MataPelajaran {
  id: number;
  kode: string;
  nama: string;
  jurusan: string;
  tingkat: number;
  jam_per_minggu: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface SlotWaktu {
  id: number;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
  is_istirahat: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface PreferensiGuru {
  id: number;
  guru_id: number;
  slot_waktu_id: number;
  preferensi: "available" | "preferred" | "unavailable";
  created_at?: Date;
  updated_at?: Date;
}

export interface Jadwal {
  id: number;
  mata_pelajaran_id: number;
  guru_id: number;
  kelas_id: number;
  ruangan_id: number;
  slot_waktu_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id: number;
  username: string;
  password: string;
  nama: string;
  email: string;
  role: "admin" | "user" | "viewer";
  created_at?: Date;
  updated_at?: Date;
}
