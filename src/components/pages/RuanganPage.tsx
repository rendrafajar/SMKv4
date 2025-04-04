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
  Home,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const RuanganPage = () => {
  // State for dialogs
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [exportFormat, setExportFormat] = useState("excel");

  // Mock data for rooms
  const [rooms, setRooms] = useState([
    {
      id: 1,
      nama: "R101",
      kapasitas: 40,
      jenis: "Kelas Reguler",
      fasilitas: ["Proyektor", "AC", "Papan Tulis"],
      status: "Tersedia",
    },
    {
      id: 2,
      nama: "R102",
      kapasitas: 40,
      jenis: "Kelas Reguler",
      fasilitas: ["Proyektor", "AC", "Papan Tulis"],
      status: "Tersedia",
    },
    {
      id: 3,
      nama: "R103",
      kapasitas: 40,
      jenis: "Kelas Reguler",
      fasilitas: ["Proyektor", "AC", "Papan Tulis"],
      status: "Tersedia",
    },
    {
      id: 4,
      nama: "Lab Komputer 1",
      kapasitas: 36,
      jenis: "Laboratorium",
      fasilitas: ["Komputer", "Proyektor", "AC", "Papan Tulis"],
      status: "Tersedia",
    },
    {
      id: 5,
      nama: "Lab Komputer 2",
      kapasitas: 36,
      jenis: "Laboratorium",
      fasilitas: ["Komputer", "Proyektor", "AC", "Papan Tulis"],
      status: "Tersedia",
    },
    {
      id: 6,
      nama: "Lab Jaringan",
      kapasitas: 30,
      jenis: "Laboratorium",
      fasilitas: ["Perangkat Jaringan", "Komputer", "Proyektor", "AC"],
      status: "Dalam Perbaikan",
    },
    {
      id: 7,
      nama: "Lab Multimedia",
      kapasitas: 30,
      jenis: "Laboratorium",
      fasilitas: ["Komputer Grafis", "Proyektor", "AC", "Papan Tulis"],
      status: "Tersedia",
    },
    {
      id: 8,
      nama: "Lapangan",
      kapasitas: 100,
      jenis: "Olahraga",
      fasilitas: ["Lapangan Basket", "Lapangan Voli"],
      status: "Tersedia",
    },
  ]);

  // Handle edit room
  const handleEdit = (room) => {
    setSelectedRoom(room);
    setIsEditDialogOpen(true);
  };

  // Handle delete room
  const handleDelete = (room) => {
    setSelectedRoom(room);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete room
  const confirmDelete = () => {
    if (selectedRoom) {
      setRooms(rooms.filter((r) => r.id !== selectedRoom.id));
      setIsDeleteDialogOpen(false);
      setSelectedRoom(null);
    }
  };

  // Handle export
  const handleExport = () => {
    setIsExportDialogOpen(true);
  };

  // Export data based on selected format
  const exportData = () => {
    // In a real application, this would generate and download a file
    // For now, we'll just show an alert
    alert(
      `Data ruangan berhasil diekspor dalam format ${exportFormat === "excel" ? "Excel" : "PDF"}!`,
    );
    setIsExportDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Manajemen Ruangan
          </h2>
          <p className="text-muted-foreground">
            Kelola data ruangan dan fasilitas
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Home className="mr-2 h-4 w-4" />
              Tambah Ruangan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Ruangan Baru</DialogTitle>
              <DialogDescription>
                Isi data ruangan baru untuk ditambahkan ke sistem
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nama" className="text-right">
                  Nama Ruangan
                </Label>
                <Input id="nama" placeholder="R110" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="kapasitas" className="text-right">
                  Kapasitas
                </Label>
                <Input
                  id="kapasitas"
                  type="number"
                  placeholder="40"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jenis" className="text-right">
                  Jenis
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih jenis ruangan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kelas">Kelas Reguler</SelectItem>
                    <SelectItem value="lab">Laboratorium</SelectItem>
                    <SelectItem value="olahraga">Olahraga</SelectItem>
                    <SelectItem value="aula">Aula</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fasilitas" className="text-right">
                  Fasilitas
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fasilitas-proyektor" />
                    <label
                      htmlFor="fasilitas-proyektor"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Proyektor
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fasilitas-ac" />
                    <label
                      htmlFor="fasilitas-ac"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      AC
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fasilitas-komputer" />
                    <label
                      htmlFor="fasilitas-komputer"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Komputer
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fasilitas-papan" />
                    <label
                      htmlFor="fasilitas-papan"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Papan Tulis
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => {
                  alert("Ruangan berhasil ditambahkan!");
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
          <CardTitle>Daftar Ruangan</CardTitle>
          <CardDescription>
            Total {rooms.length} ruangan terdaftar dalam sistem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari ruangan..."
                className="pl-8 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Ruangan</TableHead>
                  <TableHead>Kapasitas</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Fasilitas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.nama}</TableCell>
                    <TableCell>{room.kapasitas} orang</TableCell>
                    <TableCell>{room.jenis}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {room.fasilitas.map((fasilitas, index) => (
                          <Badge key={index} variant="outline">
                            {fasilitas}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          room.status === "Tersedia" ? "default" : "outline"
                        }
                        className={
                          room.status === "Tersedia"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }
                      >
                        {room.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(room)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(room)}
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

      {/* Edit Room Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ruangan</DialogTitle>
            <DialogDescription>
              Edit data ruangan yang sudah ada
            </DialogDescription>
          </DialogHeader>
          {selectedRoom && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-nama" className="text-right">
                  Nama Ruangan
                </Label>
                <Input
                  id="edit-nama"
                  defaultValue={selectedRoom.nama}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-kapasitas" className="text-right">
                  Kapasitas
                </Label>
                <Input
                  id="edit-kapasitas"
                  type="number"
                  defaultValue={selectedRoom.kapasitas}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-jenis" className="text-right">
                  Jenis
                </Label>
                <Select
                  defaultValue={
                    selectedRoom.jenis === "Kelas Reguler"
                      ? "kelas"
                      : selectedRoom.jenis === "Laboratorium"
                        ? "lab"
                        : selectedRoom.jenis === "Olahraga"
                          ? "olahraga"
                          : "aula"
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih jenis ruangan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kelas">Kelas Reguler</SelectItem>
                    <SelectItem value="lab">Laboratorium</SelectItem>
                    <SelectItem value="olahraga">Olahraga</SelectItem>
                    <SelectItem value="aula">Aula</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-fasilitas" className="text-right">
                  Fasilitas
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-fasilitas-proyektor"
                      defaultChecked={selectedRoom.fasilitas.includes(
                        "Proyektor",
                      )}
                    />
                    <label
                      htmlFor="edit-fasilitas-proyektor"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Proyektor
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-fasilitas-ac"
                      defaultChecked={selectedRoom.fasilitas.includes("AC")}
                    />
                    <label
                      htmlFor="edit-fasilitas-ac"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      AC
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-fasilitas-komputer"
                      defaultChecked={selectedRoom.fasilitas.includes(
                        "Komputer",
                      )}
                    />
                    <label
                      htmlFor="edit-fasilitas-komputer"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Komputer
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-fasilitas-papan"
                      defaultChecked={selectedRoom.fasilitas.includes(
                        "Papan Tulis",
                      )}
                    />
                    <label
                      htmlFor="edit-fasilitas-papan"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Papan Tulis
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select
                  defaultValue={
                    selectedRoom.status === "Tersedia"
                      ? "tersedia"
                      : "perbaikan"
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih status ruangan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tersedia">Tersedia</SelectItem>
                    <SelectItem value="perbaikan">Dalam Perbaikan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                alert("Ruangan berhasil diperbarui!");
                setIsEditDialogOpen(false);
              }}
            >
              Simpan Perubahan
            </Button>
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
            <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus ruangan{" "}
              {selectedRoom ? `"${selectedRoom.nama}"` : ""}? Tindakan ini tidak
              dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
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
            <DialogTitle>Ekspor Data Ruangan</DialogTitle>
            <DialogDescription>
              Pilih format file untuk mengekspor data ruangan
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="format-excel"
                  checked={exportFormat === "excel"}
                  onCheckedChange={() => setExportFormat("excel")}
                />
                <label
                  htmlFor="format-excel"
                  className="text-sm font-medium leading-none flex items-center gap-2"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  Excel (.xlsx)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="format-pdf"
                  checked={exportFormat === "pdf"}
                  onCheckedChange={() => setExportFormat("pdf")}
                />
                <label
                  htmlFor="format-pdf"
                  className="text-sm font-medium leading-none flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  PDF (.pdf)
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={exportData}>
              Ekspor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RuanganPage;
