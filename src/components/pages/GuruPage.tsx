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
  Plus,
  Search,
  Filter,
  Download,
  Trash,
  Pencil,
  UserPlus,
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

const GuruPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("excel");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Mock data for teachers
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      nip: "198501152010011001",
      nama: "Budi Santoso",
      email: "budi.santoso@smkscheduler.com",
      mataPelajaran: "Matematika",
      status: "Aktif",
    },
    {
      id: 2,
      nip: "198607232011012002",
      nama: "Siti Aminah",
      email: "siti.aminah@smkscheduler.com",
      mataPelajaran: "Bahasa Indonesia",
      status: "Aktif",
    },
    {
      id: 3,
      nip: "199003102012011003",
      nama: "Ahmad Fauzi",
      email: "ahmad.fauzi@smkscheduler.com",
      mataPelajaran: "Pemrograman Dasar",
      status: "Aktif",
    },
    {
      id: 4,
      nip: "198812042013012004",
      nama: "Dewi Lestari",
      email: "dewi.lestari@smkscheduler.com",
      mataPelajaran: "Basis Data",
      status: "Aktif",
    },
    {
      id: 5,
      nip: "198205122009011005",
      nama: "John Doe",
      email: "john.doe@smkscheduler.com",
      mataPelajaran: "Bahasa Inggris",
      status: "Cuti",
    },
  ]);

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTeacher) {
      setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id));
      setIsDeleteDialogOpen(false);
      setSelectedTeacher(null);
      alert(`Guru ${selectedTeacher.nama} berhasil dihapus!`);
    }
  };

  const handleExport = () => {
    // Simulate export process
    setTimeout(() => {
      setIsExportDialogOpen(false);
      alert(
        `Data guru berhasil diekspor ke format ${exportFormat.toUpperCase()}`,
      );
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Guru</h2>
          <p className="text-muted-foreground">
            Kelola data guru dan preferensi mengajar
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Tambah Guru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Guru Baru</DialogTitle>
              <DialogDescription>
                Isi data guru baru untuk ditambahkan ke sistem
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nip" className="text-right">
                  NIP
                </Label>
                <Input
                  id="nip"
                  placeholder="198501152010011001"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nama" className="text-right">
                  Nama Lengkap
                </Label>
                <Input
                  id="nama"
                  placeholder="Nama lengkap"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bidang" className="text-right">
                  Bidang Keahlian
                </Label>
                <Input
                  id="bidang"
                  placeholder="Matematika"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="beban-min" className="text-right">
                  Beban Min
                </Label>
                <Input
                  id="beban-min"
                  type="number"
                  placeholder="12"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="beban-max" className="text-right">
                  Beban Max
                </Label>
                <Input
                  id="beban-max"
                  type="number"
                  placeholder="24"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  alert("Guru berhasil ditambahkan!");
                  setIsDialogOpen(false);
                }}
              >
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        {selectedTeacher && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Data Guru</DialogTitle>
                <DialogDescription>
                  Edit data guru yang sudah ada
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-nip" className="text-right">
                    NIP
                  </Label>
                  <Input
                    id="edit-nip"
                    defaultValue={selectedTeacher.nip}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-nama" className="text-right">
                    Nama Lengkap
                  </Label>
                  <Input
                    id="edit-nama"
                    defaultValue={selectedTeacher.nama}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    defaultValue={selectedTeacher.email}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-bidang" className="text-right">
                    Bidang Keahlian
                  </Label>
                  <Input
                    id="edit-bidang"
                    defaultValue={selectedTeacher.mataPelajaran}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    alert(
                      `Data guru ${selectedTeacher.nama} berhasil diperbarui!`,
                    );
                    setIsEditDialogOpen(false);
                    setSelectedTeacher(null);
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
          <CardTitle>Daftar Guru</CardTitle>
          <CardDescription>
            Total {teachers.length} guru terdaftar dalam sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari guru..."
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
                  <TableHead>NIP</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mata Pelajaran</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium">{teacher.nip}</TableCell>
                    <TableCell>{teacher.nama}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.mataPelajaran}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          teacher.status === "Aktif" ? "default" : "outline"
                        }
                        className={
                          teacher.status === "Aktif" ? "bg-green-500" : ""
                        }
                      >
                        {teacher.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(teacher)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(teacher)}
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
              Apakah Anda yakin ingin menghapus data guru{" "}
              {selectedTeacher?.nama}? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedTeacher(null)}>
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
            <DialogTitle>Export Data Guru</DialogTitle>
            <DialogDescription>Pilih format export data guru</DialogDescription>
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

export default GuruPage;
