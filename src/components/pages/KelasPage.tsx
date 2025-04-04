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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Plus,
  Search,
  Filter,
  Download,
  Trash,
  Pencil,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

const KelasPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("excel");
  const [selectedKelas, setSelectedKelas] = useState(null);

  // Mock data for classes
  const [classes, setClasses] = useState([
    {
      id: 1,
      nama: "X RPL 1",
      tingkat: 10,
      jurusan: "Rekayasa Perangkat Lunak",
      jumlahSiswa: 36,
      waliKelas: "Budi Santoso",
    },
    {
      id: 2,
      nama: "X RPL 2",
      tingkat: 10,
      jurusan: "Rekayasa Perangkat Lunak",
      jumlahSiswa: 35,
      waliKelas: "Siti Aminah",
    },
    {
      id: 3,
      nama: "X TKJ 1",
      tingkat: 10,
      jurusan: "Teknik Komputer dan Jaringan",
      jumlahSiswa: 36,
      waliKelas: "Ahmad Fauzi",
    },
    {
      id: 4,
      nama: "X TKJ 2",
      tingkat: 10,
      jurusan: "Teknik Komputer dan Jaringan",
      jumlahSiswa: 34,
      waliKelas: "Dewi Lestari",
    },
    {
      id: 5,
      nama: "XI RPL 1",
      tingkat: 11,
      jurusan: "Rekayasa Perangkat Lunak",
      jumlahSiswa: 32,
      waliKelas: "John Doe",
    },
    {
      id: 6,
      nama: "XI RPL 2",
      tingkat: 11,
      jurusan: "Rekayasa Perangkat Lunak",
      jumlahSiswa: 33,
      waliKelas: "Hendra Wijaya",
    },
  ]);

  const handleEdit = (kelas) => {
    setSelectedKelas(kelas);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (kelas) => {
    setSelectedKelas(kelas);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedKelas) {
      setClasses(classes.filter((k) => k.id !== selectedKelas.id));
      setIsDeleteDialogOpen(false);
      setSelectedKelas(null);
      alert(`Kelas ${selectedKelas.nama} berhasil dihapus!`);
    }
  };

  const handleExport = () => {
    // Simulate export process
    setTimeout(() => {
      setIsExportDialogOpen(false);
      alert(
        `Data kelas berhasil diekspor ke format ${exportFormat.toUpperCase()}`,
      );
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Kelas</h2>
          <p className="text-muted-foreground">
            Kelola data kelas dan informasi terkait
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Kelas
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Kelas Baru</DialogTitle>
              <DialogDescription>
                Isi data kelas baru untuk ditambahkan ke sistem
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nama-kelas" className="text-right">
                  Nama Kelas
                </Label>
                <Input
                  id="nama-kelas"
                  placeholder="X RPL 3"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tingkat" className="text-right">
                  Tingkat
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih tingkat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="11">11</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jurusan" className="text-right">
                  Jurusan
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih jurusan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RPL">
                      Rekayasa Perangkat Lunak
                    </SelectItem>
                    <SelectItem value="TKJ">
                      Teknik Komputer dan Jaringan
                    </SelectItem>
                    <SelectItem value="MM">Multimedia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jumlah-siswa" className="text-right">
                  Jumlah Siswa
                </Label>
                <Input
                  id="jumlah-siswa"
                  type="number"
                  placeholder="36"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  alert("Kelas berhasil ditambahkan!");
                  setIsDialogOpen(false);
                }}
              >
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        {selectedKelas && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Data Kelas</DialogTitle>
                <DialogDescription>
                  Edit data kelas yang sudah ada
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-nama-kelas" className="text-right">
                    Nama Kelas
                  </Label>
                  <Input
                    id="edit-nama-kelas"
                    defaultValue={selectedKelas.nama}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-tingkat" className="text-right">
                    Tingkat
                  </Label>
                  <Select defaultValue={selectedKelas.tingkat.toString()}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-jurusan" className="text-right">
                    Jurusan
                  </Label>
                  <Input
                    id="edit-jurusan"
                    defaultValue={selectedKelas.jurusan}
                    className="col-span-3"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-jumlah-siswa" className="text-right">
                    Jumlah Siswa
                  </Label>
                  <Input
                    id="edit-jumlah-siswa"
                    type="number"
                    defaultValue={selectedKelas.jumlahSiswa}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-wali-kelas" className="text-right">
                    Wali Kelas
                  </Label>
                  <Input
                    id="edit-wali-kelas"
                    defaultValue={selectedKelas.waliKelas}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    alert(
                      `Data kelas ${selectedKelas.nama} berhasil diperbarui!`,
                    );
                    setIsEditDialogOpen(false);
                    setSelectedKelas(null);
                  }}
                >
                  Simpan Perubahan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Kelas</CardTitle>
          <CardDescription>
            Total {classes.length} kelas terdaftar dalam sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari kelas..."
                className="pl-8 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExportDialogOpen(true)}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kelas</TableHead>
                  <TableHead>Tingkat</TableHead>
                  <TableHead>Jurusan</TableHead>
                  <TableHead>Jumlah Siswa</TableHead>
                  <TableHead>Wali Kelas</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((kelas) => (
                  <TableRow key={kelas.id}>
                    <TableCell className="font-medium">{kelas.nama}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{kelas.tingkat}</Badge>
                    </TableCell>
                    <TableCell>{kelas.jurusan}</TableCell>
                    <TableCell>{kelas.jumlahSiswa} siswa</TableCell>
                    <TableCell>{kelas.waliKelas}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(kelas)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(kelas)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus kelas {selectedKelas?.nama}?
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedKelas(null)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Data Kelas</DialogTitle>
            <DialogDescription>
              Pilih format export data kelas
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
  );
};

export default KelasPage;
