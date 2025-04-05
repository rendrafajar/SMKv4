import React, { useState, useEffect } from "react";
import {
  getAllJurusan,
  addJurusan,
  updateJurusan,
  deleteJurusan,
} from "@/models/jurusan";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Filter,
  Download,
  Trash,
  Pencil,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Jurusan {
  id: string;
  kode: string;
  nama: string;
  deskripsi: string;
  ketuaJurusan: string;
  tahunDibentuk: number;
  jumlahKelas: number;
}

const JurusanPage = () => {
  const [jurusanList, setJurusanList] = useState<Jurusan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch jurusan data from database
  useEffect(() => {
    const fetchJurusan = async () => {
      try {
        setIsLoading(true);
        const data = await getAllJurusan();
        setJurusanList(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching jurusan data:", err);
        setError("Gagal memuat data jurusan");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJurusan();
  }, []);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("excel");

  const [selectedJurusan, setSelectedJurusan] = useState<Jurusan | null>(null);

  const [newJurusan, setNewJurusan] = useState<Omit<Jurusan, "id">>({
    kode: "",
    nama: "",
    deskripsi: "",
    ketuaJurusan: "",
    tahunDibentuk: new Date().getFullYear(),
    jumlahKelas: 0,
  });

  const handleAddJurusan = async () => {
    try {
      const addedJurusan = await addJurusan(newJurusan);
      setJurusanList([...jurusanList, addedJurusan]);
      setIsAddDialogOpen(false);
      setNewJurusan({
        kode: "",
        nama: "",
        deskripsi: "",
        ketuaJurusan: "",
        tahunDibentuk: new Date().getFullYear(),
        jumlahKelas: 0,
      });
    } catch (err) {
      console.error("Error adding jurusan:", err);
      alert("Gagal menambahkan jurusan. Silakan coba lagi.");
    }
  };

  const handleEditJurusan = async () => {
    if (!selectedJurusan) return;

    try {
      const updatedJurusan = await updateJurusan(selectedJurusan);

      const updatedList = jurusanList.map((jurusan) =>
        jurusan.id === updatedJurusan.id ? updatedJurusan : jurusan,
      );

      setJurusanList(updatedList);
      setIsEditDialogOpen(false);
      setSelectedJurusan(null);
    } catch (err) {
      console.error("Error updating jurusan:", err);
      alert("Gagal memperbarui jurusan. Silakan coba lagi.");
    }
  };

  const handleDeleteJurusan = async () => {
    if (!selectedJurusan) return;

    try {
      const success = await deleteJurusan(selectedJurusan.id);

      if (success) {
        const updatedList = jurusanList.filter(
          (jurusan) => jurusan.id !== selectedJurusan.id,
        );

        setJurusanList(updatedList);
        setIsDeleteDialogOpen(false);
        setSelectedJurusan(null);
      } else {
        throw new Error("Failed to delete jurusan");
      }
    } catch (err) {
      console.error("Error deleting jurusan:", err);
      alert("Gagal menghapus jurusan. Silakan coba lagi.");
    }
  };

  const handleExport = () => {
    // Simulate export process
    setTimeout(() => {
      setIsExportDialogOpen(false);
      alert(
        `Data jurusan berhasil diekspor ke format ${exportFormat.toUpperCase()}`,
      );
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Manajemen Jurusan
          </h2>
          <p className="text-muted-foreground">
            Kelola data jurusan yang ada di sekolah
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Jurusan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Jurusan Baru</DialogTitle>
                <DialogDescription>
                  Masukkan informasi jurusan baru di bawah ini
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kode" className="text-right">
                    Kode
                  </Label>
                  <Input
                    id="kode"
                    value={newJurusan.kode}
                    onChange={(e) =>
                      setNewJurusan({ ...newJurusan, kode: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nama" className="text-right">
                    Nama
                  </Label>
                  <Input
                    id="nama"
                    value={newJurusan.nama}
                    onChange={(e) =>
                      setNewJurusan({ ...newJurusan, nama: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deskripsi" className="text-right">
                    Deskripsi
                  </Label>
                  <Textarea
                    id="deskripsi"
                    value={newJurusan.deskripsi}
                    onChange={(e) =>
                      setNewJurusan({
                        ...newJurusan,
                        deskripsi: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ketuaJurusan" className="text-right">
                    Ketua Jurusan
                  </Label>
                  <Input
                    id="ketuaJurusan"
                    value={newJurusan.ketuaJurusan}
                    onChange={(e) =>
                      setNewJurusan({
                        ...newJurusan,
                        ketuaJurusan: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tahunDibentuk" className="text-right">
                    Tahun Dibentuk
                  </Label>
                  <Input
                    id="tahunDibentuk"
                    type="number"
                    value={newJurusan.tahunDibentuk}
                    onChange={(e) =>
                      setNewJurusan({
                        ...newJurusan,
                        tahunDibentuk: parseInt(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="jumlahKelas" className="text-right">
                    Jumlah Kelas
                  </Label>
                  <Input
                    id="jumlahKelas"
                    type="number"
                    value={newJurusan.jumlahKelas}
                    onChange={(e) =>
                      setNewJurusan({
                        ...newJurusan,
                        jumlahKelas: parseInt(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddJurusan}>Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isExportDialogOpen}
            onOpenChange={setIsExportDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Data Jurusan</DialogTitle>
                <DialogDescription>
                  Pilih format export data jurusan
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={exportFormat === "excel" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setExportFormat("excel")}
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Excel (.xlsx)
                  </Button>
                  <Button
                    variant={exportFormat === "pdf" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setExportFormat("pdf")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    PDF (.pdf)
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleExport}>Export Data</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Jurusan</CardTitle>
          <CardDescription>
            Daftar jurusan yang tersedia di sekolah
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari jurusan..."
                className="pl-8 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <p>Memuat data jurusan...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8 text-destructive">
              <p>{error}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama Jurusan</TableHead>
                  <TableHead>Ketua Jurusan</TableHead>
                  <TableHead>Tahun Dibentuk</TableHead>
                  <TableHead>Jumlah Kelas</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jurusanList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Tidak ada data jurusan
                    </TableCell>
                  </TableRow>
                ) : (
                  jurusanList.map((jurusan) => (
                    <TableRow key={jurusan.id}>
                      <TableCell className="font-medium">
                        {jurusan.kode}
                      </TableCell>
                      <TableCell>{jurusan.nama}</TableCell>
                      <TableCell>{jurusan.ketuaJurusan}</TableCell>
                      <TableCell>{jurusan.tahunDibentuk}</TableCell>
                      <TableCell>{jurusan.jumlahKelas}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedJurusan(jurusan);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedJurusan(jurusan);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Jurusan</DialogTitle>
            <DialogDescription>
              Edit informasi jurusan di bawah ini
            </DialogDescription>
          </DialogHeader>
          {selectedJurusan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-kode" className="text-right">
                  Kode
                </Label>
                <Input
                  id="edit-kode"
                  value={selectedJurusan.kode}
                  onChange={(e) =>
                    setSelectedJurusan({
                      ...selectedJurusan,
                      kode: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-nama" className="text-right">
                  Nama
                </Label>
                <Input
                  id="edit-nama"
                  value={selectedJurusan.nama}
                  onChange={(e) =>
                    setSelectedJurusan({
                      ...selectedJurusan,
                      nama: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-deskripsi" className="text-right">
                  Deskripsi
                </Label>
                <Textarea
                  id="edit-deskripsi"
                  value={selectedJurusan.deskripsi}
                  onChange={(e) =>
                    setSelectedJurusan({
                      ...selectedJurusan,
                      deskripsi: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-ketuaJurusan" className="text-right">
                  Ketua Jurusan
                </Label>
                <Input
                  id="edit-ketuaJurusan"
                  value={selectedJurusan.ketuaJurusan}
                  onChange={(e) =>
                    setSelectedJurusan({
                      ...selectedJurusan,
                      ketuaJurusan: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-tahunDibentuk" className="text-right">
                  Tahun Dibentuk
                </Label>
                <Input
                  id="edit-tahunDibentuk"
                  type="number"
                  value={selectedJurusan.tahunDibentuk}
                  onChange={(e) =>
                    setSelectedJurusan({
                      ...selectedJurusan,
                      tahunDibentuk: parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-jumlahKelas" className="text-right">
                  Jumlah Kelas
                </Label>
                <Input
                  id="edit-jumlahKelas"
                  type="number"
                  value={selectedJurusan.jumlahKelas}
                  onChange={(e) =>
                    setSelectedJurusan({
                      ...selectedJurusan,
                      jumlahKelas: parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditJurusan}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Jurusan</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus jurusan {selectedJurusan?.nama}?
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedJurusan(null)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteJurusan}
              className="bg-destructive hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default JurusanPage;
