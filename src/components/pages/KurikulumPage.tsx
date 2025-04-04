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
  BookOpen,
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const KurikulumPage = () => {
  // State for dialogs
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("excel");
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Mock data for subjects
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      kode: "MAT-X",
      nama: "Matematika",
      tingkat: [10, 11, 12],
      jurusan: ["Semua Jurusan"],
      jamPerMinggu: 4,
      status: "Aktif",
    },
    {
      id: 2,
      kode: "BIN-X",
      nama: "Bahasa Indonesia",
      tingkat: [10, 11, 12],
      jurusan: ["Semua Jurusan"],
      jamPerMinggu: 4,
      status: "Aktif",
    },
    {
      id: 3,
      kode: "BIG-X",
      nama: "Bahasa Inggris",
      tingkat: [10, 11, 12],
      jurusan: ["Semua Jurusan"],
      jamPerMinggu: 4,
      status: "Aktif",
    },
    {
      id: 4,
      kode: "FIS-X",
      nama: "Fisika",
      tingkat: [10, 11, 12],
      jurusan: ["Semua Jurusan"],
      jamPerMinggu: 3,
      status: "Aktif",
    },
    {
      id: 5,
      kode: "KIM-X",
      nama: "Kimia",
      tingkat: [10, 11, 12],
      jurusan: ["Semua Jurusan"],
      jamPerMinggu: 3,
      status: "Aktif",
    },
    {
      id: 6,
      kode: "PD-RPL",
      nama: "Pemrograman Dasar",
      tingkat: [10],
      jurusan: ["Rekayasa Perangkat Lunak"],
      jamPerMinggu: 4,
      status: "Aktif",
    },
    {
      id: 7,
      kode: "BD-RPL",
      nama: "Basis Data",
      tingkat: [10, 11],
      jurusan: ["Rekayasa Perangkat Lunak"],
      jamPerMinggu: 4,
      status: "Aktif",
    },
    {
      id: 8,
      kode: "PW-RPL",
      nama: "Pemrograman Web",
      tingkat: [10, 11, 12],
      jurusan: ["Rekayasa Perangkat Lunak"],
      jamPerMinggu: 6,
      status: "Aktif",
    },
    {
      id: 9,
      kode: "JK-TKJ",
      nama: "Jaringan Komputer",
      tingkat: [10, 11, 12],
      jurusan: ["Teknik Komputer dan Jaringan"],
      jamPerMinggu: 6,
      status: "Aktif",
    },
    {
      id: 10,
      kode: "DG-MM",
      nama: "Desain Grafis",
      tingkat: [10, 11],
      jurusan: ["Multimedia", "Rekayasa Perangkat Lunak"],
      jamPerMinggu: 4,
      status: "Aktif",
    },
  ]);

  // Handle edit button click
  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setIsEditDialogOpen(true);
  };

  // Handle delete button click
  const handleDelete = (subject) => {
    setSelectedSubject(subject);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (selectedSubject) {
      setSubjects(subjects.filter((s) => s.id !== selectedSubject.id));
      setIsDeleteDialogOpen(false);
      setSelectedSubject(null);
      alert(`Mata pelajaran ${selectedSubject.nama} berhasil dihapus!`);
    }
  };

  // Handle export
  const handleExport = () => {
    // Simulate export process
    setTimeout(() => {
      setIsExportDialogOpen(false);
      alert(
        `Data mata pelajaran berhasil diekspor ke format ${exportFormat.toUpperCase()}`,
      );
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Manajemen Kurikulum
          </h2>
          <p className="text-muted-foreground">
            Kelola mata pelajaran dan alokasi waktu
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Tambah Mata Pelajaran
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Mata Pelajaran Baru</DialogTitle>
              <DialogDescription>
                Isi data mata pelajaran baru untuk ditambahkan ke sistem
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="kode" className="text-right">
                  Kode
                </Label>
                <Input id="kode" placeholder="MAT-10" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nama" className="text-right">
                  Nama
                </Label>
                <Input
                  id="nama"
                  placeholder="Matematika"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tingkat" className="text-right">
                  Tingkat
                </Label>
                <div className="col-span-3 flex gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tingkat-10" />
                    <label
                      htmlFor="tingkat-10"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      10
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tingkat-11" />
                    <label
                      htmlFor="tingkat-11"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      11
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tingkat-12" />
                    <label
                      htmlFor="tingkat-12"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      12
                    </label>
                  </div>
                </div>
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
                    <SelectItem value="umum">Semua Jurusan</SelectItem>
                    <SelectItem value="rpl">
                      Rekayasa Perangkat Lunak
                    </SelectItem>
                    <SelectItem value="tkj">
                      Teknik Komputer dan Jaringan
                    </SelectItem>
                    <SelectItem value="mm">Multimedia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jam" className="text-right">
                  Jam/Minggu
                </Label>
                <Input
                  id="jam"
                  type="number"
                  placeholder="4"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  alert("Mata pelajaran berhasil ditambahkan!");
                  setIsAddDialogOpen(false);
                }}
              >
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Mata Pelajaran</CardTitle>
          <CardDescription>
            Total {subjects.length} mata pelajaran terdaftar dalam sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari mata pelajaran..."
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
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama Mata Pelajaran</TableHead>
                  <TableHead>Tingkat</TableHead>
                  <TableHead>Jurusan</TableHead>
                  <TableHead>Jam/Minggu</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-medium">
                      {subject.kode}
                    </TableCell>
                    <TableCell>{subject.nama}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {subject.tingkat.map((level, index) => (
                          <Badge key={index} variant="outline">
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {subject.jurusan.map((jurusan, index) => (
                          <Badge key={index} variant="outline">
                            {jurusan}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{subject.jamPerMinggu} jam</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          subject.status === "Aktif" ? "default" : "outline"
                        }
                        className={
                          subject.status === "Aktif" ? "bg-green-500" : ""
                        }
                      >
                        {subject.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(subject)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(subject)}
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

      {/* Edit Dialog */}
      {selectedSubject && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Mata Pelajaran</DialogTitle>
              <DialogDescription>
                Edit data mata pelajaran yang sudah ada
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-kode" className="text-right">
                  Kode
                </Label>
                <Input
                  id="edit-kode"
                  defaultValue={selectedSubject.kode}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-nama" className="text-right">
                  Nama
                </Label>
                <Input
                  id="edit-nama"
                  defaultValue={selectedSubject.nama}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-jam" className="text-right">
                  Jam/Minggu
                </Label>
                <Input
                  id="edit-jam"
                  type="number"
                  defaultValue={selectedSubject.jamPerMinggu}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  alert(
                    `Mata pelajaran ${selectedSubject.nama} berhasil diperbarui!`,
                  );
                  setIsEditDialogOpen(false);
                  setSelectedSubject(null);
                }}
              >
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus mata pelajaran{" "}
              {selectedSubject?.nama}? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedSubject(null)}>
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
            <DialogTitle>Export Data Mata Pelajaran</DialogTitle>
            <DialogDescription>
              Pilih format export data mata pelajaran
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

export default KurikulumPage;
