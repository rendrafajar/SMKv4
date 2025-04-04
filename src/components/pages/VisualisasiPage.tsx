import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ScheduleOverview from "@/components/dashboard/ScheduleOverview";
import { Calendar, Download, FileSpreadsheet, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const VisualisasiPage = () => {
  const [viewType, setViewType] = useState("class");
  const [selectedClass, setSelectedClass] = useState("X RPL 1");
  const [selectedTeacher, setSelectedTeacher] = useState("Semua Guru");
  const [selectedRoom, setSelectedRoom] = useState("Semua Ruangan");
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("excel");

  // Classes, teachers, and rooms for filters
  const classes = [
    "X RPL 1",
    "X RPL 2",
    "X TKJ 1",
    "X TKJ 2",
    "XI RPL 1",
    "XI RPL 2",
    "XI TKJ 1",
    "XI TKJ 2",
    "XII RPL 1",
    "XII RPL 2",
    "XII TKJ 1",
    "XII TKJ 2",
  ];
  const teachers = [
    "Semua Guru",
    "Budi Santoso",
    "Siti Aminah",
    "Ahmad Fauzi",
    "Dewi Lestari",
    "John Doe",
    "Hendra Wijaya",
    "Rini Susanti",
    "Rina Fitriani",
    "Ustad Hasan",
    "Budi Prakoso",
    "Siti Rahayu",
    "Agus Setiawan",
    "Maya Putri",
    "Bambang Sutrisno",
    "Andi Firmansyah",
  ];
  const rooms = [
    "Semua Ruangan",
    "R101",
    "R102",
    "R103",
    "R104",
    "R105",
    "R106",
    "R107",
    "R108",
    "R109",
    "Lab Komputer 1",
    "Lab Komputer 2",
    "Lab Jaringan",
    "Lab Multimedia",
    "Lapangan",
  ];

  const handleExport = () => {
    // Simulate export process
    setTimeout(() => {
      setIsExportDialogOpen(false);
      alert(`Jadwal berhasil diekspor ke format ${exportFormat.toUpperCase()}`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Visualisasi Jadwal
          </h2>
          <p className="text-muted-foreground">
            Lihat dan sesuaikan jadwal pelajaran
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Pilih Jadwal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Pilih Jadwal</DialogTitle>
                <DialogDescription>
                  Pilih jadwal yang ingin ditampilkan
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Select defaultValue="current">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jadwal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">
                      Jadwal Terkini (Aktif)
                    </SelectItem>
                    <SelectItem value="draft">Draft Jadwal Baru</SelectItem>
                    <SelectItem value="previous">
                      Jadwal Semester Lalu
                    </SelectItem>
                    <SelectItem value="simulation">Simulasi Jadwal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit">Tampilkan Jadwal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isExportDialogOpen}
            onOpenChange={setIsExportDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Jadwal</DialogTitle>
                <DialogDescription>
                  Pilih format export jadwal
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
                <Button onClick={handleExport}>Export Jadwal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jadwal Pelajaran</CardTitle>
          <CardDescription>
            Visualisasi jadwal dengan tampilan yang berbeda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="class" onValueChange={setViewType}>
            <TabsList className="mb-4">
              <TabsTrigger value="class">Per Kelas</TabsTrigger>
              <TabsTrigger value="teacher">Per Guru</TabsTrigger>
              <TabsTrigger value="room">Per Ruangan</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {viewType === "class" && (
                <div className="w-full sm:w-64">
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {viewType === "teacher" && (
                <div className="w-full sm:w-64">
                  <Select
                    value={selectedTeacher}
                    onValueChange={setSelectedTeacher}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Guru" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher} value={teacher}>
                          {teacher}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {viewType === "room" && (
                <div className="w-full sm:w-64">
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Ruangan" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room} value={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="mt-4">
              <ScheduleOverview />
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualisasiPage;
