import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Database, Check, AlertTriangle } from "lucide-react";
import { query, saveData } from "@/lib/db";

const DatabaseSetup = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "creating" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const createTables = async () => {
    setIsCreating(true);
    setStatus("creating");
    setMessage("Membuat tabel database...");

    try {
      // Create tables in sequence
      await createGuruTable();
      setMessage("Tabel Guru berhasil dibuat");

      await createKelasTable();
      setMessage("Tabel Kelas berhasil dibuat");

      await createRuanganTable();
      setMessage("Tabel Ruangan berhasil dibuat");

      await createMataPelajaranTable();
      setMessage("Tabel Mata Pelajaran berhasil dibuat");

      await createSlotWaktuTable();
      setMessage("Tabel Slot Waktu berhasil dibuat");

      await createPreferensiGuruTable();
      setMessage("Tabel Preferensi Guru berhasil dibuat");

      await createJadwalTable();
      setMessage("Tabel Jadwal berhasil dibuat");

      await createUserTable();
      setMessage("Tabel User berhasil dibuat");

      // Insert sample data
      await insertSampleData();
      setMessage("Data sampel berhasil ditambahkan");

      setStatus("success");
    } catch (error) {
      console.error("Error creating database tables:", error);
      setStatus("error");
      setMessage(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
    } finally {
      setIsCreating(false);
    }
  };

  const createGuruTable = async () => {
    await query(`
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
      )
    `);
  };

  const createKelasTable = async () => {
    await query(`
      CREATE TABLE IF NOT EXISTS kelas (
        id SERIAL PRIMARY KEY,
        nama VARCHAR(50) NOT NULL,
        tingkat INTEGER NOT NULL,
        jurusan VARCHAR(100) NOT NULL,
        jumlah_siswa INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  };

  const createRuanganTable = async () => {
    await query(`
      CREATE TABLE IF NOT EXISTS ruangan (
        id SERIAL PRIMARY KEY,
        nama VARCHAR(50) NOT NULL,
        kapasitas INTEGER DEFAULT 0,
        jenis VARCHAR(50) DEFAULT 'kelas',
        fasilitas TEXT[] DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  };

  const createMataPelajaranTable = async () => {
    await query(`
      CREATE TABLE IF NOT EXISTS mata_pelajaran (
        id SERIAL PRIMARY KEY,
        kode VARCHAR(20) NOT NULL,
        nama VARCHAR(100) NOT NULL,
        jurusan VARCHAR(100) NOT NULL,
        tingkat INTEGER NOT NULL,
        jam_per_minggu INTEGER DEFAULT 2,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  };

  const createSlotWaktuTable = async () => {
    await query(`
      CREATE TABLE IF NOT EXISTS slot_waktu (
        id SERIAL PRIMARY KEY,
        hari VARCHAR(20) NOT NULL,
        jam_mulai TIME NOT NULL,
        jam_selesai TIME NOT NULL,
        is_istirahat BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  };

  const createPreferensiGuruTable = async () => {
    await query(`
      CREATE TABLE IF NOT EXISTS preferensi_guru (
        id SERIAL PRIMARY KEY,
        guru_id INTEGER REFERENCES guru(id) ON DELETE CASCADE,
        slot_waktu_id INTEGER REFERENCES slot_waktu(id) ON DELETE CASCADE,
        preferensi VARCHAR(20) CHECK (preferensi IN ('available', 'preferred', 'unavailable')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(guru_id, slot_waktu_id)
      )
    `);
  };

  const createJadwalTable = async () => {
    await query(`
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
      )
    `);
  };

  const createUserTable = async () => {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        nama VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE,
        role VARCHAR(20) CHECK (role IN ('admin', 'user', 'viewer')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  };

  const insertSampleData = async () => {
    // Insert sample guru
    try {
      const guruData = [
        {
          nip: "198501152010011001",
          nama: "Budi Santoso",
          email: "budi@example.com",
          bidang_keahlian: "Matematika",
          beban_mengajar_min: 12,
          beban_mengajar_max: 24,
        },
        {
          nip: "198607232011012002",
          nama: "Siti Rahayu",
          email: "siti@example.com",
          bidang_keahlian: "Bahasa Inggris",
          beban_mengajar_min: 12,
          beban_mengajar_max: 24,
        },
        {
          nip: "197905122008011003",
          nama: "Ahmad Hidayat",
          email: "ahmad@example.com",
          bidang_keahlian: "Fisika",
          beban_mengajar_min: 12,
          beban_mengajar_max: 24,
        },
        {
          nip: "198112302012012004",
          nama: "Dewi Lestari",
          email: "dewi@example.com",
          bidang_keahlian: "Kimia",
          beban_mengajar_min: 12,
          beban_mengajar_max: 24,
        },
        {
          nip: "199003152013011005",
          nama: "Eko Prasetyo",
          email: "eko@example.com",
          bidang_keahlian: "Biologi",
          beban_mengajar_min: 12,
          beban_mengajar_max: 24,
        },
      ];

      for (const guru of guruData) {
        await saveData("guru", guru);
      }
    } catch (error) {
      console.error("Error inserting guru data:", error);
      // Fallback to SQL query if saveData fails
      await query(`
        INSERT INTO guru (nip, nama, email, bidang_keahlian, beban_mengajar_min, beban_mengajar_max)
        VALUES 
          ('198501152010011001', 'Budi Santoso', 'budi@example.com', 'Matematika', 12, 24),
          ('198607232011012002', 'Siti Rahayu', 'siti@example.com', 'Bahasa Inggris', 12, 24),
          ('197905122008011003', 'Ahmad Hidayat', 'ahmad@example.com', 'Fisika', 12, 24),
          ('198112302012012004', 'Dewi Lestari', 'dewi@example.com', 'Kimia', 12, 24),
          ('199003152013011005', 'Eko Prasetyo', 'eko@example.com', 'Biologi', 12, 24)
        ON CONFLICT (nip) DO NOTHING
      `);
    }

    // Insert sample kelas
    try {
      const kelasData = [
        {
          nama: "X-TKJ-1",
          tingkat: 10,
          jurusan: "Teknik Komputer Jaringan",
          jumlah_siswa: 36,
        },
        {
          nama: "X-TKJ-2",
          tingkat: 10,
          jurusan: "Teknik Komputer Jaringan",
          jumlah_siswa: 36,
        },
        {
          nama: "X-RPL-1",
          tingkat: 10,
          jurusan: "Rekayasa Perangkat Lunak",
          jumlah_siswa: 36,
        },
        {
          nama: "XI-TKJ-1",
          tingkat: 11,
          jurusan: "Teknik Komputer Jaringan",
          jumlah_siswa: 34,
        },
        {
          nama: "XI-RPL-1",
          tingkat: 11,
          jurusan: "Rekayasa Perangkat Lunak",
          jumlah_siswa: 32,
        },
        {
          nama: "XII-TKJ-1",
          tingkat: 12,
          jurusan: "Teknik Komputer Jaringan",
          jumlah_siswa: 30,
        },
        {
          nama: "XII-RPL-1",
          tingkat: 12,
          jurusan: "Rekayasa Perangkat Lunak",
          jumlah_siswa: 28,
        },
      ];

      for (const kelas of kelasData) {
        await saveData("kelas", kelas);
      }
    } catch (error) {
      console.error("Error inserting kelas data:", error);
      // Fallback to SQL query if saveData fails
      await query(`
        INSERT INTO kelas (nama, tingkat, jurusan, jumlah_siswa)
        VALUES 
          ('X-TKJ-1', 10, 'Teknik Komputer Jaringan', 36),
          ('X-TKJ-2', 10, 'Teknik Komputer Jaringan', 36),
          ('X-RPL-1', 10, 'Rekayasa Perangkat Lunak', 36),
          ('XI-TKJ-1', 11, 'Teknik Komputer Jaringan', 34),
          ('XI-RPL-1', 11, 'Rekayasa Perangkat Lunak', 32),
          ('XII-TKJ-1', 12, 'Teknik Komputer Jaringan', 30),
          ('XII-RPL-1', 12, 'Rekayasa Perangkat Lunak', 28)
        ON CONFLICT (nama) DO NOTHING
      `);
    }

    // Insert sample ruangan
    await query(`
      INSERT INTO ruangan (nama, kapasitas, jenis, fasilitas)
      VALUES 
        ('R101', 40, 'kelas', ARRAY['Proyektor', 'AC']),
        ('R102', 40, 'kelas', ARRAY['Proyektor', 'AC']),
        ('R103', 40, 'kelas', ARRAY['Proyektor', 'AC']),
        ('LAB-KOM-1', 36, 'laboratorium', ARRAY['Komputer', 'Proyektor', 'AC']),
        ('LAB-KOM-2', 36, 'laboratorium', ARRAY['Komputer', 'Proyektor', 'AC'])
      ON CONFLICT (nama) DO NOTHING
    `);

    // Insert sample mata pelajaran
    await query(`
      INSERT INTO mata_pelajaran (kode, nama, jurusan, tingkat, jam_per_minggu)
      VALUES 
        ('MAT-10', 'Matematika', 'Umum', 10, 4),
        ('BIG-10', 'Bahasa Inggris', 'Umum', 10, 4),
        ('FIS-10', 'Fisika', 'Umum', 10, 3),
        ('KIM-10', 'Kimia', 'Umum', 10, 3),
        ('BIO-10', 'Biologi', 'Umum', 10, 3),
        ('TKJ-10-1', 'Dasar Jaringan Komputer', 'Teknik Komputer Jaringan', 10, 6),
        ('RPL-10-1', 'Dasar Pemrograman', 'Rekayasa Perangkat Lunak', 10, 6)
      ON CONFLICT (kode) DO NOTHING
    `);

    // Insert sample slot waktu
    await query(`
      INSERT INTO slot_waktu (hari, jam_mulai, jam_selesai, is_istirahat)
      VALUES 
        ('Senin', '07:00:00', '07:45:00', FALSE),
        ('Senin', '07:45:00', '08:30:00', FALSE),
        ('Senin', '08:30:00', '09:15:00', FALSE),
        ('Senin', '09:15:00', '09:30:00', TRUE),  -- Istirahat
        ('Senin', '09:30:00', '10:15:00', FALSE),
        ('Senin', '10:15:00', '11:00:00', FALSE),
        ('Senin', '11:00:00', '11:45:00', FALSE),
        ('Senin', '11:45:00', '12:30:00', TRUE),  -- Istirahat
        ('Senin', '12:30:00', '13:15:00', FALSE),
        ('Senin', '13:15:00', '14:00:00', FALSE),
        ('Selasa', '07:00:00', '07:45:00', FALSE),
        ('Selasa', '07:45:00', '08:30:00', FALSE),
        ('Selasa', '08:30:00', '09:15:00', FALSE),
        ('Selasa', '09:15:00', '09:30:00', TRUE),  -- Istirahat
        ('Selasa', '09:30:00', '10:15:00', FALSE),
        ('Selasa', '10:15:00', '11:00:00', FALSE)
      ON CONFLICT DO NOTHING
    `);

    // Insert sample user (admin)
    await query(`
      INSERT INTO users (username, password, nama, email, role)
      VALUES ('admin', '$2a$10$xVqYLGUJX0P7ZOYs6.tQWOYtyVEtv/s7UYGjnn5OccWpnGJVYd3Oe', 'Administrator', 'admin@smkscheduler.com', 'admin')
      ON CONFLICT (username) DO NOTHING
    `);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Setup Database</CardTitle>
        <CardDescription>
          Buat tabel dan data awal untuk sistem penjadwalan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-primary" />
            <p className="text-sm">Buat struktur database dan data awal</p>
          </div>

          {status === "creating" && (
            <div className="bg-muted p-3 rounded-md">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <p className="text-sm">{message}</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-md">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                <p className="text-sm text-green-600 dark:text-green-400">
                  {message}
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-50 dark:bg-red-950 p-3 rounded-md">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  {message}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={createTables}
          disabled={isCreating || status === "success"}
          className="w-full"
        >
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Membuat Database...
            </>
          ) : status === "success" ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Database Berhasil Dibuat
            </>
          ) : (
            "Buat Database"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatabaseSetup;
