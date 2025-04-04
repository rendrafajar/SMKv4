import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatabaseStatus from "@/components/DatabaseStatus";
import DatabaseSetup from "@/components/dashboard/DatabaseSetup";
import StatisticsCards from "@/components/dashboard/StatisticsCards";

const DatabaseIntegration = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Integrasi Database PostgreSQL</h1>
      <p className="text-muted-foreground">
        Sistem Penjadwalan SMK terintegrasi dengan PostgreSQL untuk penyimpanan
        dan pengelolaan data.
      </p>

      <Tabs defaultValue="status" className="w-full">
        <TabsList>
          <TabsTrigger value="status">Status Koneksi</TabsTrigger>
          <TabsTrigger value="setup">Setup Database</TabsTrigger>
          <TabsTrigger value="statistics">Statistik</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Status Koneksi Database</CardTitle>
              <CardDescription>
                Informasi koneksi ke database PostgreSQL
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Konfigurasi Database
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="grid grid-cols-3 text-sm">
                        <span className="font-medium">Host:</span>
                        <span className="col-span-2">103.235.153.148</span>
                      </div>
                      <div className="grid grid-cols-3 text-sm">
                        <span className="font-medium">Database:</span>
                        <span className="col-span-2">genelabv4</span>
                      </div>
                      <div className="grid grid-cols-3 text-sm">
                        <span className="font-medium">Username:</span>
                        <span className="col-span-2">postgres</span>
                      </div>
                      <div className="grid grid-cols-3 text-sm">
                        <span className="font-medium">Port:</span>
                        <span className="col-span-2">5432</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <DatabaseStatus />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup" className="space-y-4 mt-4">
          <DatabaseSetup />
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Database</CardTitle>
              <CardDescription>
                Informasi jumlah data dalam database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StatisticsCards />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseIntegration;
