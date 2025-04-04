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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  BarChart,
  PieChart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LaporanPage = () => {
  const [reportType, setReportType] = useState("class");
  const [selectedClass, setSelectedClass] = useState("X RPL 1");
  const [selectedTeacher, setSelectedTeacher] = useState("Budi Santoso");
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState("current");

  // Classes and teachers for filters
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

  // Mock data for teacher workload
  const teacherWorkload = [
    { name: "Budi Santoso", subject: "Matematika", hours: 24, classes: 6 },
    { name: "Siti Aminah", subject: "Bahasa Indonesia", hours: 20, classes: 5 },
    {
      name: "Ahmad Fauzi",
      subject: "Pemrograman Dasar",
      hours: 16,
      classes: 4,
    },
    { name: "Dewi Lestari", subject: "Basis Data", hours: 16, classes: 4 },
    { name: "John Doe", subject: "Bahasa Inggris", hours: 24, classes: 6 },
    { name: "Hendra Wijaya", subject: "Fisika", hours: 18, classes: 6 },
    { name: "Rini Susanti", subject: "Pemrograman Web", hours: 24, classes: 4 },
    { name: "Rina Fitriani", subject: "Kimia", hours: 12, classes: 4 },
    { name: "Ustad Hasan", subject: "Pendidikan Agama", hours: 12, classes: 6 },
    {
      name: "Budi Prakoso",
      subject: "Jaringan Komputer",
      hours: 24,
      classes: 4,
    },
  ];

  // Mock data for room usage
  const roomUsage = [
    { name: "R101", hours: 30, usage: "75%" },
    { name: "R102", hours: 32, usage: "80%" },
    { name: "R103", hours: 28, usage: "70%" },
    { name: "R104", hours: 32, usage: "80%" },
    { name: "R105", hours: 24, usage: "60%" },
    { name: "Lab Komputer 1", hours: 36, usage: "90%" },
    { name: "Lab Komputer 2", hours: 32, usage: "80%" },
    { name: "Lab Jaringan", hours: 24, usage: "60%" },
    { name: "Lab Multimedia", hours: 16, usage: "40%" },
    { name: "Lapangan", hours: 12, usage: "30%" },
  ];

  const handleExportExcel = () => {
    alert(`Laporan ${
      reportType === "class"
        ? "Jadwal Kelas"
        : reportType === "teacher"
          ? "Jadwal Guru"
          : reportType === "workload"
            ? "Beban Mengajar"
            : "Penggunaan Ruangan"
    } 
      berhasil diekspor ke format Excel`);
  };

  const handleExportPDF = () => {
    alert(`Laporan ${
      reportType === "class"
        ? "Jadwal Kelas"
        : reportType === "teacher"
          ? "Jadwal Guru"
          : reportType === "workload"
            ? "Beban Mengajar"
            : "Penggunaan Ruangan"
    } 
      berhasil diekspor ke format PDF`);
  };

  const handlePrint = () => {
    alert(`Menyiapkan dokumen untuk dicetak...`);
    setTimeout(() => {
      alert(
        `Dokumen siap dicetak. Silakan periksa dialog cetak di browser Anda.`,
      );
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Laporan</h2>
          <p className="text-muted-foreground">
            Laporan jadwal dan statistik penjadwalan
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCalendarDialogOpen(true)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Pilih Jadwal
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Cetak
          </Button>
        </div>
      </div>

      <Tabs defaultValue="class" onValueChange={setReportType}>
        <TabsList className="mb-4">
          <TabsTrigger value="class">Jadwal Per Kelas</TabsTrigger>
          <TabsTrigger value="teacher">Jadwal Per Guru</TabsTrigger>
          <TabsTrigger value="workload">Beban Mengajar</TabsTrigger>
          <TabsTrigger value="room">Penggunaan Ruangan</TabsTrigger>
        </TabsList>

        <TabsContent value="class" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Jadwal Kelas</CardTitle>
                  <CardDescription>
                    Laporan jadwal pelajaran per kelas
                  </CardDescription>
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
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
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Jam</TableHead>
                      <TableHead>Senin</TableHead>
                      <TableHead>Selasa</TableHead>
                      <TableHead>Rabu</TableHead>
                      <TableHead>Kamis</TableHead>
                      <TableHead>Jumat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        07:00 - 07:45
                      </TableCell>
                      <TableCell>Matematika</TableCell>
                      <TableCell>Bahasa Inggris</TableCell>
                      <TableCell>Kimia</TableCell>
                      <TableCell>PKN</TableCell>
                      <TableCell>Olahraga</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        07:45 - 08:30
                      </TableCell>
                      <TableCell>Matematika</TableCell>
                      <TableCell>Bahasa Inggris</TableCell>
                      <TableCell>Kimia</TableCell>
                      <TableCell>PKN</TableCell>
                      <TableCell>Olahraga</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        08:30 - 09:15
                      </TableCell>
                      <TableCell>Bahasa Indonesia</TableCell>
                      <TableCell>Fisika</TableCell>
                      <TableCell>Pendidikan Agama</TableCell>
                      <TableCell>Sejarah Indonesia</TableCell>
                      <TableCell>Olahraga</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        09:15 - 10:00
                      </TableCell>
                      <TableCell>Bahasa Indonesia</TableCell>
                      <TableCell>Fisika</TableCell>
                      <TableCell>Pendidikan Agama</TableCell>
                      <TableCell>Sejarah Indonesia</TableCell>
                      <TableCell>Kewirausahaan</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teacher" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Jadwal Guru</CardTitle>
                  <CardDescription>
                    Laporan jadwal mengajar per guru
                  </CardDescription>
                </div>
                <Select
                  value={selectedTeacher}
                  onValueChange={setSelectedTeacher}
                >
                  <SelectTrigger className="w-[180px]">
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
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Jam</TableHead>
                      <TableHead>Senin</TableHead>
                      <TableHead>Selasa</TableHead>
                      <TableHead>Rabu</TableHead>
                      <TableHead>Kamis</TableHead>
                      <TableHead>Jumat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        07:00 - 07:45
                      </TableCell>
                      <TableCell>X RPL 1 (Matematika)</TableCell>
                      <TableCell>X TKJ 1 (Matematika)</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>XI RPL 1 (Matematika)</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        07:45 - 08:30
                      </TableCell>
                      <TableCell>X RPL 1 (Matematika)</TableCell>
                      <TableCell>X TKJ 1 (Matematika)</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>XI RPL 1 (Matematika)</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        08:30 - 09:15
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>X TKJ 2 (Matematika)</TableCell>
                      <TableCell>XI RPL 2 (Matematika)</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        09:15 - 10:00
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>X TKJ 2 (Matematika)</TableCell>
                      <TableCell>XI RPL 2 (Matematika)</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Beban Mengajar Guru</CardTitle>
              <CardDescription>
                Laporan jumlah jam mengajar per guru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Guru</TableHead>
                      <TableHead>Mata Pelajaran</TableHead>
                      <TableHead>Jumlah Jam</TableHead>
                      <TableHead>Jumlah Kelas</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teacherWorkload.map((teacher) => (
                      <TableRow key={teacher.name}>
                        <TableCell className="font-medium">
                          {teacher.name}
                        </TableCell>
                        <TableCell>{teacher.subject}</TableCell>
                        <TableCell>{teacher.hours} jam</TableCell>
                        <TableCell>{teacher.classes} kelas</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              teacher.hours <= 24 ? "default" : "outline"
                            }
                            className={
                              teacher.hours <= 24
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }
                          >
                            {teacher.hours <= 24 ? "Normal" : "Kelebihan"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="room" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Penggunaan Ruangan</CardTitle>
              <CardDescription>
                Laporan penggunaan ruangan per minggu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Ruangan</TableHead>
                      <TableHead>Jam Terpakai</TableHead>
                      <TableHead>Persentase Penggunaan</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roomUsage.map((room) => (
                      <TableRow key={room.name}>
                        <TableCell className="font-medium">
                          {room.name}
                        </TableCell>
                        <TableCell>{room.hours} jam</TableCell>
                        <TableCell>{room.usage}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              parseInt(room.usage) > 70 ? "default" : "outline"
                            }
                            className={
                              parseInt(room.usage) > 70 ? "bg-green-500" : ""
                            }
                          >
                            {parseInt(room.usage) > 70
                              ? "Optimal"
                              : "Kurang Optimal"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Calendar Dialog */}
      <Dialog
        open={isCalendarDialogOpen}
        onOpenChange={setIsCalendarDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pilih Jadwal</DialogTitle>
            <DialogDescription>
              Pilih jadwal yang ingin ditampilkan dalam laporan
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select
              value={selectedSchedule}
              onValueChange={setSelectedSchedule}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jadwal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Jadwal Terkini (Aktif)</SelectItem>
                <SelectItem value="draft">Draft Jadwal Baru</SelectItem>
                <SelectItem value="previous">Jadwal Semester Lalu</SelectItem>
                <SelectItem value="simulation">Simulasi Jadwal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                alert(
                  `Jadwal ${
                    selectedSchedule === "current"
                      ? "Terkini"
                      : selectedSchedule === "draft"
                        ? "Draft"
                        : selectedSchedule === "previous"
                          ? "Semester Lalu"
                          : "Simulasi"
                  } berhasil dipilih`,
                );
                setIsCalendarDialogOpen(false);
              }}
            >
              Tampilkan Jadwal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LaporanPage;
