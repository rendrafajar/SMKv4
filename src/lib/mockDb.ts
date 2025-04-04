// Mock database for browser environment

// Mock database connection status
let connectionStatus = true;

// Mock Pool class for browser environment
export class MockPool {
  async connect() {
    if (!connectionStatus) {
      throw new Error("Database connection failed");
    }
    return {
      query: async (text: string, params?: any[]) => {
        return await query(text, params);
      },
      release: () => {},
    };
  }

  async query(text: string, params?: any[]) {
    return await query(text, params);
  }
}

// Mock data storage
const mockData = {
  guru: [
    {
      id: 1,
      nip: "198501152010011001",
      nama: "Budi Santoso",
      email: "budi@example.com",
      bidang_keahlian: "Matematika",
      beban_mengajar_min: 12,
      beban_mengajar_max: 24,
    },
    {
      id: 2,
      nip: "198607232011012002",
      nama: "Siti Rahayu",
      email: "siti@example.com",
      bidang_keahlian: "Bahasa Inggris",
      beban_mengajar_min: 12,
      beban_mengajar_max: 24,
    },
    {
      id: 3,
      nip: "197905122008011003",
      nama: "Ahmad Hidayat",
      email: "ahmad@example.com",
      bidang_keahlian: "Fisika",
      beban_mengajar_min: 12,
      beban_mengajar_max: 24,
    },
    {
      id: 4,
      nip: "198112302012012004",
      nama: "Dewi Lestari",
      email: "dewi@example.com",
      bidang_keahlian: "Kimia",
      beban_mengajar_min: 12,
      beban_mengajar_max: 24,
    },
    {
      id: 5,
      nip: "199003152013011005",
      nama: "Eko Prasetyo",
      email: "eko@example.com",
      bidang_keahlian: "Biologi",
      beban_mengajar_min: 12,
      beban_mengajar_max: 24,
    },
  ],
  kelas: [
    {
      id: 1,
      nama: "X-TKJ-1",
      tingkat: 10,
      jurusan: "Teknik Komputer Jaringan",
      jumlah_siswa: 36,
    },
    {
      id: 2,
      nama: "X-TKJ-2",
      tingkat: 10,
      jurusan: "Teknik Komputer Jaringan",
      jumlah_siswa: 36,
    },
    {
      id: 3,
      nama: "X-RPL-1",
      tingkat: 10,
      jurusan: "Rekayasa Perangkat Lunak",
      jumlah_siswa: 36,
    },
    {
      id: 4,
      nama: "XI-TKJ-1",
      tingkat: 11,
      jurusan: "Teknik Komputer Jaringan",
      jumlah_siswa: 34,
    },
    {
      id: 5,
      nama: "XI-RPL-1",
      tingkat: 11,
      jurusan: "Rekayasa Perangkat Lunak",
      jumlah_siswa: 32,
    },
    {
      id: 6,
      nama: "XII-TKJ-1",
      tingkat: 12,
      jurusan: "Teknik Komputer Jaringan",
      jumlah_siswa: 30,
    },
    {
      id: 7,
      nama: "XII-RPL-1",
      tingkat: 12,
      jurusan: "Rekayasa Perangkat Lunak",
      jumlah_siswa: 28,
    },
  ],
  ruangan: [
    {
      id: 1,
      nama: "R101",
      kapasitas: 40,
      jenis: "kelas",
      fasilitas: ["Proyektor", "AC"],
    },
    {
      id: 2,
      nama: "R102",
      kapasitas: 40,
      jenis: "kelas",
      fasilitas: ["Proyektor", "AC"],
    },
    {
      id: 3,
      nama: "R103",
      kapasitas: 40,
      jenis: "kelas",
      fasilitas: ["Proyektor", "AC"],
    },
    {
      id: 4,
      nama: "LAB-KOM-1",
      kapasitas: 36,
      jenis: "laboratorium",
      fasilitas: ["Komputer", "Proyektor", "AC"],
    },
    {
      id: 5,
      nama: "LAB-KOM-2",
      kapasitas: 36,
      jenis: "laboratorium",
      fasilitas: ["Komputer", "Proyektor", "AC"],
    },
  ],
  mata_pelajaran: [
    {
      id: 1,
      kode: "MAT-10",
      nama: "Matematika",
      jurusan: "Umum",
      tingkat: 10,
      jam_per_minggu: 4,
    },
    {
      id: 2,
      kode: "BIG-10",
      nama: "Bahasa Inggris",
      jurusan: "Umum",
      tingkat: 10,
      jam_per_minggu: 4,
    },
    {
      id: 3,
      kode: "FIS-10",
      nama: "Fisika",
      jurusan: "Umum",
      tingkat: 10,
      jam_per_minggu: 3,
    },
    {
      id: 4,
      kode: "KIM-10",
      nama: "Kimia",
      jurusan: "Umum",
      tingkat: 10,
      jam_per_minggu: 3,
    },
    {
      id: 5,
      kode: "BIO-10",
      nama: "Biologi",
      jurusan: "Umum",
      tingkat: 10,
      jam_per_minggu: 3,
    },
    {
      id: 6,
      kode: "TKJ-10-1",
      nama: "Dasar Jaringan Komputer",
      jurusan: "Teknik Komputer Jaringan",
      tingkat: 10,
      jam_per_minggu: 6,
    },
    {
      id: 7,
      kode: "RPL-10-1",
      nama: "Dasar Pemrograman",
      jurusan: "Rekayasa Perangkat Lunak",
      tingkat: 10,
      jam_per_minggu: 6,
    },
  ],
  jadwal: [],
};

// Helper function to simulate query execution
export async function query(text: string, params?: any[]) {
  console.log("Mock query:", { text, params });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!connectionStatus) {
    throw new Error("Database connection failed");
  }

  // Parse the query to determine what to return
  if (text.includes("SELECT COUNT(*) FROM guru")) {
    return { rows: [{ count: mockData.guru.length }] };
  } else if (text.includes("SELECT COUNT(*) FROM kelas")) {
    return { rows: [{ count: mockData.kelas.length }] };
  } else if (text.includes("SELECT COUNT(*) FROM mata_pelajaran")) {
    return { rows: [{ count: mockData.mata_pelajaran.length }] };
  } else if (text.includes("SELECT COUNT(*) FROM ruangan")) {
    return { rows: [{ count: mockData.ruangan.length }] };
  } else if (text.includes("SELECT NOW()")) {
    return { rows: [{ now: new Date().toISOString() }] };
  } else if (text.includes("CREATE TABLE")) {
    return { rowCount: 0, rows: [] };
  } else if (text.includes("INSERT INTO")) {
    return { rowCount: 1, rows: [{ id: Math.floor(Math.random() * 1000) }] };
  }

  // Default response
  return { rowCount: 0, rows: [] };
}

// Test database connection
export async function testConnection() {
  try {
    if (!connectionStatus) {
      throw new Error("Connection failed");
    }
    console.log("Mock database connection successful");
    return connectionStatus;
  } catch (error) {
    console.error("Mock database connection failed:", error);
    return false;
  }
}

// Toggle connection status (for testing)
export function setConnectionStatus(status: boolean) {
  connectionStatus = status;
  return connectionStatus;
}

// Function to save data to mock database
export async function saveData(table: string, data: any) {
  console.log(`Saving data to ${table}:`, data);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (!connectionStatus) {
    throw new Error("Database connection failed");
  }

  // Add to mock data
  if (table in mockData) {
    const id = Math.max(...mockData[table].map((item: any) => item.id), 0) + 1;
    const newItem = { ...data, id };
    mockData[table].push(newItem);
    return { id, ...data };
  }

  throw new Error(`Table ${table} not found`);
}

export default { query, testConnection, setConnectionStatus, MockPool };
