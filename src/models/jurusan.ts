import { query, saveData } from "@/lib/db";

export interface Jurusan {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string;
  ketuaJurusan: string;
  tahunDibentuk: number;
  jumlahKelas: number;
}

// Mock data for fallback when database is not available
export const mockJurusanData: Jurusan[] = [
  {
    id: "1",
    kode: "RPL",
    nama: "Rekayasa Perangkat Lunak",
    deskripsi: "Jurusan yang fokus pada pengembangan software dan aplikasi",
    ketuaJurusan: "Budi Santoso",
    tahunDibentuk: 2010,
    jumlahKelas: 6,
  },
  {
    id: "2",
    kode: "TKJ",
    nama: "Teknik Komputer dan Jaringan",
    deskripsi: "Jurusan yang fokus pada infrastruktur jaringan dan hardware",
    ketuaJurusan: "Siti Aminah",
    tahunDibentuk: 2008,
    jumlahKelas: 6,
  },
  {
    id: "3",
    kode: "MM",
    nama: "Multimedia",
    deskripsi: "Jurusan yang fokus pada desain grafis dan multimedia",
    ketuaJurusan: "Ahmad Fauzi",
    tahunDibentuk: 2012,
    jumlahKelas: 4,
  },
];

// Function to get all jurusan
export const getAllJurusan = async (): Promise<Jurusan[]> => {
  try {
    const result = await query("SELECT * FROM jurusan ORDER BY kode");

    if (result && result.rows && result.rows.length > 0) {
      return result.rows as Jurusan[];
    }

    console.log("No jurusan data found, using mock data");
    return mockJurusanData; // Fallback to mock data
  } catch (error) {
    console.error("Error fetching jurusan:", error);
    return mockJurusanData; // Fallback to mock data
  }
};

// Function to get jurusan by id
export const getJurusanById = async (
  id: string,
): Promise<Jurusan | undefined> => {
  try {
    const result = await query("SELECT * FROM jurusan WHERE id = $1", [id]);

    if (result && result.rows && result.rows.length > 0) {
      return result.rows[0] as Jurusan;
    }

    console.log(`No jurusan found with id ${id}, using mock data`);
    return mockJurusanData.find((j) => j.id === id); // Fallback to mock data
  } catch (error) {
    console.error("Error fetching jurusan by id:", error);
    return mockJurusanData.find((j) => j.id === id); // Fallback to mock data
  }
};

// Function to add new jurusan
export const addJurusan = async (
  jurusan: Omit<Jurusan, "id">,
): Promise<Jurusan> => {
  try {
    // Generate a new ID for the jurusan
    const newId = Date.now().toString();
    const newJurusan = { id: newId, ...jurusan };

    // Try to save to database
    const result = await saveData("jurusan", newJurusan);

    if (result) {
      console.log("Jurusan added successfully to database");
      return result as Jurusan;
    }

    // Fallback to mock data if database save fails
    console.log("Falling back to mock data for adding jurusan");
    mockJurusanData.push(newJurusan);
    return newJurusan;
  } catch (error) {
    console.error("Error adding jurusan:", error);
    // Fallback to mock data
    const newJurusan = { id: Date.now().toString(), ...jurusan };
    mockJurusanData.push(newJurusan);
    return newJurusan;
  }
};

// Function to update jurusan
export const updateJurusan = async (jurusan: Jurusan): Promise<Jurusan> => {
  try {
    // Try to update in database
    const result = await query(
      'UPDATE jurusan SET kode = $1, nama = $2, deskripsi = $3, "ketuaJurusan" = $4, "tahunDibentuk" = $5, "jumlahKelas" = $6 WHERE id = $7 RETURNING *',
      [
        jurusan.kode,
        jurusan.nama,
        jurusan.deskripsi,
        jurusan.ketuaJurusan,
        jurusan.tahunDibentuk,
        jurusan.jumlahKelas,
        jurusan.id,
      ],
    );

    if (result && result.rows && result.rows.length > 0) {
      console.log("Jurusan updated successfully in database");
      return result.rows[0] as Jurusan;
    }

    // Fallback to mock data if database update fails
    console.log("Falling back to mock data for updating jurusan");
    const index = mockJurusanData.findIndex((j) => j.id === jurusan.id);
    if (index !== -1) {
      mockJurusanData[index] = jurusan;
      return jurusan;
    }
    throw new Error("Jurusan not found");
  } catch (error) {
    console.error("Error updating jurusan:", error);
    // Fallback to mock data
    const index = mockJurusanData.findIndex((j) => j.id === jurusan.id);
    if (index !== -1) {
      mockJurusanData[index] = jurusan;
      return jurusan;
    }
    throw new Error("Jurusan not found");
  }
};

// Function to delete jurusan
export const deleteJurusan = async (id: string): Promise<boolean> => {
  try {
    // Try to delete from database
    const result = await query(
      "DELETE FROM jurusan WHERE id = $1 RETURNING id",
      [id],
    );

    if (result && result.rows && result.rows.length > 0) {
      console.log("Jurusan deleted successfully from database");
      return true;
    }

    // Fallback to mock data if database delete fails
    console.log("Falling back to mock data for deleting jurusan");
    const index = mockJurusanData.findIndex((j) => j.id === id);
    if (index !== -1) {
      mockJurusanData.splice(index, 1);
      return true;
    }
    throw new Error("Jurusan not found");
  } catch (error) {
    console.error("Error deleting jurusan:", error);
    // Fallback to mock data
    const index = mockJurusanData.findIndex((j) => j.id === id);
    if (index !== -1) {
      mockJurusanData.splice(index, 1);
      return true;
    }
    throw new Error("Jurusan not found");
  }
};
