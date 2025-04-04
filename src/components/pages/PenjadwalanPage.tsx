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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Pause,
  RotateCcw,
  Save,
  Settings,
  BarChart,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PenjadwalanPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generation, setGeneration] = useState(0);
  const [fitness, setFitness] = useState(0);
  const [conflicts, setConflicts] = useState(10);

  // Genetic algorithm parameters
  const [params, setParams] = useState({
    populationSize: 100,
    maxGenerations: 1000,
    crossoverRate: 0.8,
    mutationRate: 0.1,
    elitismCount: 5,
    tournamentSize: 5,
  });

  // Constraint weights
  const [weights, setWeights] = useState({
    teacherConflict: 10,
    roomConflict: 10,
    classConflict: 10,
    teacherPreference: 5,
    roomSuitability: 3,
  });

  const handleStartAlgorithm = () => {
    setIsRunning(true);
    setProgress(0);
    setGeneration(0);
    setFitness(0);
    setConflicts(10);

    // Simulate algorithm progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        const newProgress = prev + Math.random() * 5;
        setGeneration(Math.floor((newProgress / 100) * params.maxGenerations));
        setFitness(Math.min(0.95, 0.5 + newProgress / 200));
        setConflicts(Math.max(0, 10 - Math.floor(newProgress / 10)));
        return newProgress;
      });
    }, 500);
  };

  const handleStopAlgorithm = () => {
    setIsRunning(false);
  };

  const handleResetAlgorithm = () => {
    setIsRunning(false);
    setProgress(0);
    setGeneration(0);
    setFitness(0);
    setConflicts(10);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Penjadwalan</h2>
          <p className="text-muted-foreground">
            Buat jadwal otomatis dengan algoritma genetika
          </p>
        </div>
        <div className="flex gap-2">
          {!isRunning ? (
            <Button onClick={handleStartAlgorithm}>
              <Play className="mr-2 h-4 w-4" />
              Mulai Algoritma
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleStopAlgorithm}>
              <Pause className="mr-2 h-4 w-4" />
              Hentikan
            </Button>
          )}
          <Button variant="outline" onClick={handleResetAlgorithm}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            variant="outline"
            disabled={progress < 100}
            onClick={() => {
              if (progress >= 100) {
                alert("Jadwal berhasil disimpan!");
              }
            }}
          >
            <Save className="mr-2 h-4 w-4" />
            Simpan Jadwal
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Status Algoritma</CardTitle>
            <CardDescription>
              Progres dan hasil algoritma genetika
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Progres</Label>
                <span className="text-sm">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">
                    Generasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{generation}</div>
                  <p className="text-xs text-muted-foreground">
                    dari {params.maxGenerations} generasi
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">
                    Fitness Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(fitness * 100).toFixed(2)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Semakin tinggi semakin baik
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">
                    Konflik Tersisa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{conflicts}</div>
                  <p className="text-xs text-muted-foreground">
                    Konflik yang belum teratasi
                  </p>
                </CardContent>
              </Card>
            </div>

            {progress === 100 && (
              <Alert className="bg-green-50 border-green-200">
                <AlertCircle className="h-4 w-4 text-green-600" />
                <AlertTitle>Algoritma Selesai</AlertTitle>
                <AlertDescription>
                  Jadwal berhasil dibuat dengan {conflicts} konflik tersisa.
                  Silahkan simpan jadwal atau lakukan penyesuaian manual.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full text-sm text-muted-foreground">
              <span>Waktu berjalan: {isRunning ? "00:02:34" : "00:00:00"}</span>
              <span>
                Terakhir dijalankan:{" "}
                {isRunning ? "Sedang berjalan" : "Tidak ada"}
              </span>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Konfigurasi</CardTitle>
            <CardDescription>Pengaturan algoritma genetika</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="parameters">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="parameters">
                  <Settings className="mr-2 h-4 w-4" />
                  Parameter
                </TabsTrigger>
                <TabsTrigger value="weights">
                  <BarChart className="mr-2 h-4 w-4" />
                  Bobot
                </TabsTrigger>
              </TabsList>

              <TabsContent value="parameters" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="populationSize">
                    Ukuran Populasi: {params.populationSize}
                  </Label>
                  <Slider
                    id="populationSize"
                    min={50}
                    max={500}
                    step={10}
                    value={[params.populationSize]}
                    onValueChange={(value) =>
                      setParams({ ...params, populationSize: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxGenerations">
                    Maksimum Generasi: {params.maxGenerations}
                  </Label>
                  <Slider
                    id="maxGenerations"
                    min={100}
                    max={5000}
                    step={100}
                    value={[params.maxGenerations]}
                    onValueChange={(value) =>
                      setParams({ ...params, maxGenerations: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crossoverRate">
                    Crossover Rate: {params.crossoverRate}
                  </Label>
                  <Slider
                    id="crossoverRate"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={[params.crossoverRate]}
                    onValueChange={(value) =>
                      setParams({ ...params, crossoverRate: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mutationRate">
                    Mutation Rate: {params.mutationRate}
                  </Label>
                  <Slider
                    id="mutationRate"
                    min={0.01}
                    max={0.5}
                    step={0.01}
                    value={[params.mutationRate]}
                    onValueChange={(value) =>
                      setParams({ ...params, mutationRate: value[0] })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="weights" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="teacherConflict">
                    Konflik Guru: {weights.teacherConflict}
                  </Label>
                  <Slider
                    id="teacherConflict"
                    min={1}
                    max={20}
                    step={1}
                    value={[weights.teacherConflict]}
                    onValueChange={(value) =>
                      setWeights({ ...weights, teacherConflict: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roomConflict">
                    Konflik Ruangan: {weights.roomConflict}
                  </Label>
                  <Slider
                    id="roomConflict"
                    min={1}
                    max={20}
                    step={1}
                    value={[weights.roomConflict]}
                    onValueChange={(value) =>
                      setWeights({ ...weights, roomConflict: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="classConflict">
                    Konflik Kelas: {weights.classConflict}
                  </Label>
                  <Slider
                    id="classConflict"
                    min={1}
                    max={20}
                    step={1}
                    value={[weights.classConflict]}
                    onValueChange={(value) =>
                      setWeights({ ...weights, classConflict: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacherPreference">
                    Preferensi Guru: {weights.teacherPreference}
                  </Label>
                  <Slider
                    id="teacherPreference"
                    min={1}
                    max={10}
                    step={1}
                    value={[weights.teacherPreference]}
                    onValueChange={(value) =>
                      setWeights({ ...weights, teacherPreference: value[0] })
                    }
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                if (progress >= 100) {
                  window.location.href = "/visualisasi";
                } else {
                  alert(
                    "Jadwal belum selesai dibuat. Silakan jalankan algoritma terlebih dahulu.",
                  );
                }
              }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Lihat Jadwal Hasil
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PenjadwalanPage;
