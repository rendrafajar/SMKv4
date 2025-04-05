// Utility to generate PostgreSQL schema from our models

export function generateDatabaseSchema(): string {
  // Generate complete schema
  return `
-- Database schema for SMK Scheduler

-- Guru (Teacher) table
CREATE TABLE IF NOT EXISTS guru (
  id SERIAL PRIMARY KEY,
  nip VARCHAR(20) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  bidang_keahlian TEXT,
  beban_mengajar_min INTEGER DEFAULT 12,
  beban_mengajar_max INTEGER DEFAULT 24,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kelas (Class) table
CREATE TABLE IF NOT EXISTS kelas (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(50) NOT NULL,
  tingkat INTEGER NOT NULL,
  jurusan VARCHAR(100) NOT NULL,
  jumlah_siswa INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ruangan (Room) table
CREATE TABLE IF NOT EXISTS ruangan (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(50) NOT NULL,
  kapasitas INTEGER DEFAULT 0,
  jenis VARCHAR(50) DEFAULT 'kelas',
  fasilitas TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jurusan (Department) table
CREATE TABLE IF NOT EXISTS jurusan (
  id VARCHAR(50) PRIMARY KEY,
  kode VARCHAR(20) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  "ketuaJurusan" VARCHAR(100),
  "tahunDibentuk" INTEGER,
  "jumlahKelas" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mata Pelajaran (Subject) table
CREATE TABLE IF NOT EXISTS mata_pelajaran (
  id SERIAL PRIMARY KEY,
  kode VARCHAR(20) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  jurusan VARCHAR(100) NOT NULL,
  tingkat INTEGER NOT NULL,
  jam_per_minggu INTEGER DEFAULT 2,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Slot Waktu (Time Slot) table
CREATE TABLE IF NOT EXISTS slot_waktu (
  id SERIAL PRIMARY KEY,
  hari VARCHAR(20) NOT NULL,
  jam_mulai TIME NOT NULL,
  jam_selesai TIME NOT NULL,
  is_istirahat BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Preferensi Guru (Teacher Preference) table
CREATE TABLE IF NOT EXISTS preferensi_guru (
  id SERIAL PRIMARY KEY,
  guru_id INTEGER REFERENCES guru(id) ON DELETE CASCADE,
  slot_waktu_id INTEGER REFERENCES slot_waktu(id) ON DELETE CASCADE,
  preferensi VARCHAR(20) CHECK (preferensi IN ('available', 'preferred', 'unavailable')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(guru_id, slot_waktu_id)
);

-- Jadwal (Schedule) table
CREATE TABLE IF NOT EXISTS jadwal (
  id SERIAL PRIMARY KEY,
  mata_pelajaran_id INTEGER REFERENCES mata_pelajaran(id) ON DELETE CASCADE,
  guru_id INTEGER REFERENCES guru(id) ON DELETE CASCADE,
  kelas_id INTEGER REFERENCES kelas(id) ON DELETE CASCADE,
  ruangan_id INTEGER REFERENCES ruangan(id) ON DELETE CASCADE,
  slot_waktu_id INTEGER REFERENCES slot_waktu(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(kelas_id, slot_waktu_id),
  UNIQUE(guru_id, slot_waktu_id),
  UNIQUE(ruangan_id, slot_waktu_id)
);

-- User table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  role VARCHAR(20) CHECK (role IN ('admin', 'user', 'viewer')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
}

// Export schema to a file
export function exportSchemaToFile(schema: string): string {
  // In a browser environment, create a downloadable file
  if (typeof window !== "undefined") {
    const blob = new Blob([schema], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "database.sql";
    a.click();
    URL.revokeObjectURL(url);
    return "Schema exported to database.sql";
  }

  // In a Node.js environment, this would write to a file
  return "Schema generated but file export is only available in browser environment";
}
