import { supabase } from "@/lib/db";

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
    const { data, error } = await supabase.from("jurusan").select("*");

    if (error) {
      console.error("Error fetching jurusan:", error);
      return mockJurusanData; // Fallback to mock data
    }

    return data as Jurusan[];
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
    const { data, error } = await supabase
      .from("jurusan")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching jurusan by id:", error);
      return mockJurusanData.find((j) => j.id === id); // Fallback to mock data
    }

    return data as Jurusan;
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
    const { data, error } = await supabase
      .from("jurusan")
      .insert([jurusan])
      .select()
      .single();

    if (error) {
      console.error("Error adding jurusan:", error);
      // Fallback to mock data
      const newJurusan = { id: Date.now().toString(), ...jurusan };
      mockJurusanData.push(newJurusan);
      return newJurusan;
    }

    return data as Jurusan;
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
    const { data, error } = await supabase
      .from("jurusan")
      .update(jurusan)
      .eq("id", jurusan.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating jurusan:", error);
      // Fallback to mock data
      const index = mockJurusanData.findIndex((j) => j.id === jurusan.id);
      if (index !== -1) {
        mockJurusanData[index] = jurusan;
        return jurusan;
      }
      throw new Error("Jurusan not found");
    }

    return data as Jurusan;
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
    const { error } = await supabase.from("jurusan").delete().eq("id", id);

    if (error) {
      console.error("Error deleting jurusan:", error);
      // Fallback to mock data
      const index = mockJurusanData.findIndex((j) => j.id === id);
      if (index !== -1) {
        mockJurusanData.splice(index, 1);
        return true;
      }
      throw new Error("Jurusan not found");
    }

    return true;
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
