import React, { useState } from "react";
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
  const [jurusanList, setJurusanList] = useState<Jurusan[]>([
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
  ]);

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

  const handleAddJurusan = () => {
    const jurusan: Jurusan = {
      id: Date.now().toString(),
      ...newJurusan,
    };
    setJurusanList([...jurusanList, jurusan]);
    setIsAddDialogOpen(false);
    setNewJurusan({
      kode: "",
      nama: "",
      deskripsi: "",
      ketuaJurusan: "",
      tahunDibentuk: new Date().getFullYear(),
      jumlahKelas: 0,
    });
  };

  const handleEditJurusan = () => {
    if (!selectedJurusan) return;

    const updatedList = jurusanList.map((jurusan) =>
      jurusan.id === selectedJurusan.id ? selectedJurusan : jurusan,
    );

    setJurusanList(updatedList);
    setIsEditDialogOpen(false);
    setSelectedJurusan(null);
  };

  const handleDeleteJurusan = () => {
    if (!selectedJurusan) return;

    const updatedList = jurusanList.filter(
      (jurusan) => jurusan.id !== selectedJurusan.id,
    );

    setJurusanList(updatedList);
    setIsDeleteDialogOpen(false);
    setSelectedJurusan(null);
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
              {jurusanList.map((jurusan) => (
                <TableRow key={jurusan.id}>
                  <TableCell className="font-medium">{jurusan.kode}</TableCell>
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
              ))}
            </TableBody>
          </Table>
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
