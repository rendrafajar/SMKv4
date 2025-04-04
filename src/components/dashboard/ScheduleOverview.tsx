import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ScheduleItem {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  color: string;
}

interface DaySchedule {
  [timeSlot: string]: ScheduleItem | null;
}

interface WeekSchedule {
  [day: string]: DaySchedule;
}

const ScheduleOverview = () => {
  const [viewType, setViewType] = useState("class");
  const [selectedClass, setSelectedClass] = useState("X RPL 1");
  const [selectedTeacher, setSelectedTeacher] = useState("Semua Guru");
  const [selectedRoom, setSelectedRoom] = useState("Semua Ruangan");

  // Mock data for schedule
  const timeSlots = [
    "07:00 - 07:45",
    "07:45 - 08:30",
    "08:30 - 09:15",
    "09:15 - 10:00",
    "10:15 - 11:00",
    "11:00 - 11:45",
    "12:30 - 13:15",
    "13:15 - 14:00",
  ];
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  // Mock schedule data
  const mockSchedule: WeekSchedule = {
    Senin: {
      "07:00 - 07:45": {
        id: "1",
        subject: "Matematika",
        teacher: "Budi Santoso",
        room: "R101",
        color: "bg-blue-100 border-blue-300",
      },
      "07:45 - 08:30": {
        id: "2",
        subject: "Matematika",
        teacher: "Budi Santoso",
        room: "R101",
        color: "bg-blue-100 border-blue-300",
      },
      "08:30 - 09:15": {
        id: "3",
        subject: "Bahasa Indonesia",
        teacher: "Siti Aminah",
        room: "R102",
        color: "bg-green-100 border-green-300",
      },
      "09:15 - 10:00": {
        id: "4",
        subject: "Bahasa Indonesia",
        teacher: "Siti Aminah",
        room: "R102",
        color: "bg-green-100 border-green-300",
      },
      "10:15 - 11:00": {
        id: "5",
        subject: "Pemrograman Dasar",
        teacher: "Ahmad Fauzi",
        room: "Lab Komputer 1",
        color: "bg-purple-100 border-purple-300",
      },
      "11:00 - 11:45": {
        id: "6",
        subject: "Pemrograman Dasar",
        teacher: "Ahmad Fauzi",
        room: "Lab Komputer 1",
        color: "bg-purple-100 border-purple-300",
      },
      "12:30 - 13:15": {
        id: "7",
        subject: "Basis Data",
        teacher: "Dewi Lestari",
        room: "Lab Komputer 2",
        color: "bg-yellow-100 border-yellow-300",
      },
      "13:15 - 14:00": {
        id: "8",
        subject: "Basis Data",
        teacher: "Dewi Lestari",
        room: "Lab Komputer 2",
        color: "bg-yellow-100 border-yellow-300",
      },
    },
    Selasa: {
      "07:00 - 07:45": {
        id: "9",
        subject: "Bahasa Inggris",
        teacher: "John Doe",
        room: "R103",
        color: "bg-red-100 border-red-300",
      },
      "07:45 - 08:30": {
        id: "10",
        subject: "Bahasa Inggris",
        teacher: "John Doe",
        room: "R103",
        color: "bg-red-100 border-red-300",
      },
      "08:30 - 09:15": {
        id: "11",
        subject: "Fisika",
        teacher: "Hendra Wijaya",
        room: "R104",
        color: "bg-indigo-100 border-indigo-300",
      },
      "09:15 - 10:00": {
        id: "12",
        subject: "Fisika",
        teacher: "Hendra Wijaya",
        room: "R104",
        color: "bg-indigo-100 border-indigo-300",
      },
      "10:15 - 11:00": {
        id: "13",
        subject: "Pemrograman Web",
        teacher: "Rini Susanti",
        room: "Lab Komputer 1",
        color: "bg-pink-100 border-pink-300",
      },
      "11:00 - 11:45": {
        id: "14",
        subject: "Pemrograman Web",
        teacher: "Rini Susanti",
        room: "Lab Komputer 1",
        color: "bg-pink-100 border-pink-300",
      },
      "12:30 - 13:15": {
        id: "15",
        subject: "Pemrograman Web",
        teacher: "Rini Susanti",
        room: "Lab Komputer 1",
        color: "bg-pink-100 border-pink-300",
      },
      "13:15 - 14:00": {
        id: "16",
        subject: "Pemrograman Web",
        teacher: "Rini Susanti",
        room: "Lab Komputer 1",
        color: "bg-pink-100 border-pink-300",
      },
    },
    Rabu: {
      "07:00 - 07:45": {
        id: "17",
        subject: "Kimia",
        teacher: "Rina Fitriani",
        room: "R105",
        color: "bg-orange-100 border-orange-300",
      },
      "07:45 - 08:30": {
        id: "18",
        subject: "Kimia",
        teacher: "Rina Fitriani",
        room: "R105",
        color: "bg-orange-100 border-orange-300",
      },
      "08:30 - 09:15": {
        id: "19",
        subject: "Pendidikan Agama",
        teacher: "Ustad Hasan",
        room: "R106",
        color: "bg-teal-100 border-teal-300",
      },
      "09:15 - 10:00": {
        id: "20",
        subject: "Pendidikan Agama",
        teacher: "Ustad Hasan",
        room: "R106",
        color: "bg-teal-100 border-teal-300",
      },
      "10:15 - 11:00": {
        id: "21",
        subject: "Jaringan Komputer",
        teacher: "Budi Prakoso",
        room: "Lab Jaringan",
        color: "bg-cyan-100 border-cyan-300",
      },
      "11:00 - 11:45": {
        id: "22",
        subject: "Jaringan Komputer",
        teacher: "Budi Prakoso",
        room: "Lab Jaringan",
        color: "bg-cyan-100 border-cyan-300",
      },
      "12:30 - 13:15": {
        id: "23",
        subject: "Jaringan Komputer",
        teacher: "Budi Prakoso",
        room: "Lab Jaringan",
        color: "bg-cyan-100 border-cyan-300",
      },
      "13:15 - 14:00": {
        id: "24",
        subject: "Jaringan Komputer",
        teacher: "Budi Prakoso",
        room: "Lab Jaringan",
        color: "bg-cyan-100 border-cyan-300",
      },
    },
    Kamis: {
      "07:00 - 07:45": {
        id: "25",
        subject: "Pendidikan Kewarganegaraan",
        teacher: "Siti Rahayu",
        room: "R107",
        color: "bg-lime-100 border-lime-300",
      },
      "07:45 - 08:30": {
        id: "26",
        subject: "Pendidikan Kewarganegaraan",
        teacher: "Siti Rahayu",
        room: "R107",
        color: "bg-lime-100 border-lime-300",
      },
      "08:30 - 09:15": {
        id: "27",
        subject: "Sejarah Indonesia",
        teacher: "Agus Setiawan",
        room: "R108",
        color: "bg-emerald-100 border-emerald-300",
      },
      "09:15 - 10:00": {
        id: "28",
        subject: "Sejarah Indonesia",
        teacher: "Agus Setiawan",
        room: "R108",
        color: "bg-emerald-100 border-emerald-300",
      },
      "10:15 - 11:00": {
        id: "29",
        subject: "Desain Grafis",
        teacher: "Maya Putri",
        room: "Lab Multimedia",
        color: "bg-rose-100 border-rose-300",
      },
      "11:00 - 11:45": {
        id: "30",
        subject: "Desain Grafis",
        teacher: "Maya Putri",
        room: "Lab Multimedia",
        color: "bg-rose-100 border-rose-300",
      },
      "12:30 - 13:15": {
        id: "31",
        subject: "Desain Grafis",
        teacher: "Maya Putri",
        room: "Lab Multimedia",
        color: "bg-rose-100 border-rose-300",
      },
      "13:15 - 14:00": {
        id: "32",
        subject: "Desain Grafis",
        teacher: "Maya Putri",
        room: "Lab Multimedia",
        color: "bg-rose-100 border-rose-300",
      },
    },
    Jumat: {
      "07:00 - 07:45": {
        id: "33",
        subject: "Olahraga",
        teacher: "Bambang Sutrisno",
        room: "Lapangan",
        color: "bg-sky-100 border-sky-300",
      },
      "07:45 - 08:30": {
        id: "34",
        subject: "Olahraga",
        teacher: "Bambang Sutrisno",
        room: "Lapangan",
        color: "bg-sky-100 border-sky-300",
      },
      "08:30 - 09:15": {
        id: "35",
        subject: "Olahraga",
        teacher: "Bambang Sutrisno",
        room: "Lapangan",
        color: "bg-sky-100 border-sky-300",
      },
      "09:15 - 10:00": {
        id: "36",
        subject: "Kewirausahaan",
        teacher: "Andi Firmansyah",
        room: "R109",
        color: "bg-fuchsia-100 border-fuchsia-300",
      },
      "10:15 - 11:00": {
        id: "37",
        subject: "Kewirausahaan",
        teacher: "Andi Firmansyah",
        room: "R109",
        color: "bg-fuchsia-100 border-fuchsia-300",
      },
      "11:00 - 11:45": null,
      "12:30 - 13:15": null,
      "13:15 - 14:00": null,
    },
  };

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

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-xl font-bold">Jadwal Pelajaran</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Regenerasi</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Excel</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              <span>PDF</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span>Simpan</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Tabs defaultValue="class" onValueChange={setViewType}>
            <TabsList className="mb-4">
              <TabsTrigger value="class">Per Kelas</TabsTrigger>
              <TabsTrigger value="teacher">Per Guru</TabsTrigger>
              <TabsTrigger value="room">Per Ruangan</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <TabsContent value="class" className="m-0 w-full sm:w-64">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
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
              </TabsContent>

              <TabsContent value="teacher" className="m-0 w-full sm:w-64">
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
              </TabsContent>

              <TabsContent value="room" className="m-0 w-full sm:w-64">
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
              </TabsContent>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>
            </div>
          </Tabs>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] bg-muted">Jam</TableHead>
                {days.map((day) => (
                  <TableHead key={day} className="bg-muted text-center">
                    <div className="flex flex-col items-center">
                      <span>{day}</span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeSlots.map((timeSlot) => (
                <TableRow key={timeSlot}>
                  <TableCell className="font-medium bg-muted">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{timeSlot}</span>
                    </div>
                  </TableCell>
                  {days.map((day) => {
                    const scheduleItem = mockSchedule[day][timeSlot];
                    return (
                      <TableCell key={`${day}-${timeSlot}`} className="p-1">
                        {scheduleItem ? (
                          <div
                            className={`p-2 rounded-md border ${scheduleItem.color} h-full cursor-pointer hover:shadow-md transition-shadow`}
                            draggable="true"
                          >
                            <div className="font-medium text-sm">
                              {scheduleItem.subject}
                            </div>
                            <div className="text-xs flex justify-between">
                              <span>{scheduleItem.teacher}</span>
                              <Badge variant="outline" className="text-xs">
                                {scheduleItem.room}
                              </Badge>
                            </div>
                          </div>
                        ) : (
                          <div className="h-16 w-full border border-dashed border-gray-200 rounded-md flex items-center justify-center text-gray-400 text-xs">
                            Kosong
                          </div>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Tahun Ajaran 2023/2024 - Semester Genap</span>
          </div>
          <div>
            <span>Terakhir diperbarui: 15 Juni 2023, 14:30</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleOverview;
