import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Home, Clock, RefreshCw } from "lucide-react";
import { query } from "@/lib/db";
import DatabaseStatus from "@/components/DatabaseStatus";

interface StatCounts {
  guruCount: number;
  kelasCount: number;
  mataPelajaranCount: number;
  ruanganCount: number;
  isLoading: boolean;
  error: string | null;
}

const StatisticsCards = () => {
  const [stats, setStats] = useState<StatCounts>({
    guruCount: 0,
    kelasCount: 0,
    mataPelajaranCount: 0,
    ruanganCount: 0,
    isLoading: true,
    error: null,
  });

  const fetchStats = async () => {
    setStats((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // Fetch counts from database
      const guruResult = await query("SELECT COUNT(*) FROM guru");
      const kelasResult = await query("SELECT COUNT(*) FROM kelas");
      const mataPelajaranResult = await query(
        "SELECT COUNT(*) FROM mata_pelajaran",
      );
      const ruanganResult = await query("SELECT COUNT(*) FROM ruangan");

      setStats({
        guruCount: parseInt(guruResult.rows[0].count) || 0,
        kelasCount: parseInt(kelasResult.rows[0].count) || 0,
        mataPelajaranCount: parseInt(mataPelajaranResult.rows[0].count) || 0,
        ruanganCount: parseInt(ruanganResult.rows[0].count) || 0,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setStats((prev) => ({
        ...prev,
        isLoading: false,
        error: "Gagal memuat data statistik",
      }));

      // Fallback to dummy data if database is not available
      setStats((prev) => ({
        ...prev,
        guruCount: 45,
        kelasCount: 24,
        mataPelajaranCount: 68,
        ruanganCount: 18,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {stats.isLoading ? (
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.guruCount}</div>
              <p className="text-xs text-muted-foreground">
                Guru aktif mengajar
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {stats.isLoading ? (
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.kelasCount}</div>
              <p className="text-xs text-muted-foreground">Kelas aktif</p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Mata Pelajaran
          </CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {stats.isLoading ? (
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">
                {stats.mataPelajaranCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Mata pelajaran aktif
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Ruangan</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {stats.isLoading ? (
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold">{stats.ruanganCount}</div>
              <p className="text-xs text-muted-foreground">Ruangan tersedia</p>
            </>
          )}
        </CardContent>
      </Card>
      <DatabaseStatus />
    </div>
  );
};

export default StatisticsCards;
