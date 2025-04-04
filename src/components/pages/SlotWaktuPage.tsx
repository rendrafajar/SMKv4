import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Save, Trash, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SlotWaktuPage = () => {
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, mulai: "07:00", selesai: "07:45", isBreak: false },
    { id: 2, mulai: "07:45", selesai: "08:30", isBreak: false },
    { id: 3, mulai: "08:30", selesai: "09:15", isBreak: false },
    { id: 4, mulai: "09:15", selesai: "10:00", isBreak: false },
    { id: 5, mulai: "10:00", selesai: "10:15", isBreak: true },
    { id: 6, mulai: "10:15", selesai: "11:00", isBreak: false },
    { id: 7, mulai: "11:00", selesai: "11:45", isBreak: false },
    { id: 8, mulai: "11:45", selesai: "12:30", isBreak: true },
    { id: 9, mulai: "12:30", selesai: "13:15", isBreak: false },
    { id: 10, mulai: "13:15", selesai: "14:00", isBreak: false },
  ]);

  const [newSlot, setNewSlot] = useState({
    mulai: "",
    selesai: "",
    isBreak: false,
  });

  const handleAddSlot = () => {
    if (newSlot.mulai && newSlot.selesai) {
      setTimeSlots([
        ...timeSlots,
        {
          id: timeSlots.length + 1,
          mulai: newSlot.mulai,
          selesai: newSlot.selesai,
          isBreak: newSlot.isBreak,
        },
      ]);
      setNewSlot({ mulai: "", selesai: "", isBreak: false });
    }
  };

  const handleDeleteSlot = (id: number) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  const handleToggleBreak = (id: number) => {
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === id ? { ...slot, isBreak: !slot.isBreak } : slot,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Manajemen Slot Waktu
          </h2>
          <p className="text-muted-foreground">
            Konfigurasi slot waktu dan jam istirahat
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Simpan Konfigurasi
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Slot Waktu</CardTitle>
            <CardDescription>
              Konfigurasi slot waktu untuk penjadwalan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Jam Mulai</TableHead>
                    <TableHead>Jam Selesai</TableHead>
                    <TableHead>Durasi</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeSlots.map((slot, index) => {
                    // Calculate duration in minutes
                    const startParts = slot.mulai.split(":");
                    const endParts = slot.selesai.split(":");
                    const startMinutes =
                      parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
                    const endMinutes =
                      parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
                    const durationMinutes = endMinutes - startMinutes;

                    return (
                      <TableRow key={slot.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{slot.mulai}</TableCell>
                        <TableCell>{slot.selesai}</TableCell>
                        <TableCell>{durationMinutes} menit</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`break-${slot.id}`}
                              checked={slot.isBreak}
                              onCheckedChange={() => handleToggleBreak(slot.id)}
                            />
                            <Label htmlFor={`break-${slot.id}`}>
                              {slot.isBreak ? "Istirahat" : "Pelajaran"}
                            </Label>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSlot(slot.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tambah Slot Waktu</CardTitle>
            <CardDescription>
              Tambahkan slot waktu baru ke dalam jadwal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Jam Mulai</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="start-time"
                      type="time"
                      value={newSlot.mulai}
                      onChange={(e) =>
                        setNewSlot({ ...newSlot, mulai: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">Jam Selesai</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="end-time"
                      type="time"
                      value={newSlot.selesai}
                      onChange={(e) =>
                        setNewSlot({ ...newSlot, selesai: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is-break"
                  checked={newSlot.isBreak}
                  onCheckedChange={(checked) =>
                    setNewSlot({ ...newSlot, isBreak: checked })
                  }
                />
                <Label htmlFor="is-break">
                  {newSlot.isBreak ? "Istirahat" : "Pelajaran"}
                </Label>
              </div>

              <Button
                onClick={handleAddSlot}
                disabled={!newSlot.mulai || !newSlot.selesai}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Slot Waktu
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Catatan</AlertTitle>
              <AlertDescription>
                Slot waktu akan diurutkan berdasarkan jam mulai secara otomatis.
                Pastikan tidak ada slot waktu yang tumpang tindih.
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Jadwal Harian</CardTitle>
          <CardDescription>
            Visualisasi slot waktu dalam satu hari
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            {timeSlots
              .sort(
                (a, b) =>
                  parseInt(a.mulai.replace(":", "")) -
                  parseInt(b.mulai.replace(":", "")),
              )
              .map((slot) => (
                <div
                  key={slot.id}
                  className={`p-3 rounded-md border ${slot.isBreak ? "bg-orange-50 border-orange-200" : "bg-blue-50 border-blue-200"}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>
                        {slot.mulai} - {slot.selesai}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={slot.isBreak ? "bg-orange-100" : "bg-blue-100"}
                    >
                      {slot.isBreak ? "Istirahat" : "Pelajaran"}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SlotWaktuPage;
