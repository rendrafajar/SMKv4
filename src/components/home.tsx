import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatisticsCards from "./dashboard/StatisticsCards";
import ScheduleOverview from "./dashboard/ScheduleOverview";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate("/database")}>
            <Database className="mr-2 h-4 w-4" />
            Database Integration
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Buat Jadwal Baru
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards />

      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-3">
          <TabsTrigger value="overview">Ringkasan Jadwal</TabsTrigger>
          <TabsTrigger value="classes">Jadwal Per Kelas</TabsTrigger>
          <TabsTrigger value="teachers">Jadwal Per Guru</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Jadwal Terkini</CardTitle>
              <CardDescription>
                Status jadwal dan informasi penting lainnya
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduleOverview />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="classes" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Per Kelas</CardTitle>
              <CardDescription>Lihat jadwal untuk setiap kelas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <p className="text-muted-foreground">
                  Pilih kelas untuk melihat jadwal
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="teachers" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Per Guru</CardTitle>
              <CardDescription>Lihat jadwal untuk setiap guru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <p className="text-muted-foreground">
                  Pilih guru untuk melihat jadwal
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
