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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Save,
  Settings,
  Database,
  Bell,
  Mail,
  Shield,
  Palette,
  RefreshCw,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PengaturanPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pengaturan</h2>
          <p className="text-muted-foreground">
            Konfigurasi sistem penjadwalan
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Simpan Pengaturan
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            Umum
          </TabsTrigger>
          <TabsTrigger value="database">
            <Database className="mr-2 h-4 w-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Keamanan
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Tampilan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum</CardTitle>
              <CardDescription>
                Konfigurasi dasar sistem penjadwalan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="school-name">Nama Sekolah</Label>
                  <Input
                    id="school-name"
                    placeholder="SMK Negeri 1"
                    defaultValue="SMK Negeri 1 Contoh"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-address">Alamat Sekolah</Label>
                  <Input
                    id="school-address"
                    placeholder="Jl. Contoh No. 123"
                    defaultValue="Jl. Pendidikan No. 123, Kota Contoh"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-email">Email Sekolah</Label>
                  <Input
                    id="school-email"
                    type="email"
                    placeholder="info@smk.sch.id"
                    defaultValue="info@smkcontoh.sch.id"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school-phone">Telepon Sekolah</Label>
                  <Input
                    id="school-phone"
                    placeholder="021-1234567"
                    defaultValue="021-9876543"
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="academic-year">Tahun Ajaran</Label>
                <Select defaultValue="2023-2024">
                  <SelectTrigger id="academic-year">
                    <SelectValue placeholder="Pilih tahun ajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022-2023">2022/2023</SelectItem>
                    <SelectItem value="2023-2024">2023/2024</SelectItem>
                    <SelectItem value="2024-2025">2024/2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select defaultValue="ganjil">
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Pilih semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ganjil">Ganjil</SelectItem>
                    <SelectItem value="genap">Genap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Database</CardTitle>
              <CardDescription>Konfigurasi koneksi database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="db-host">Host Database</Label>
                  <Input
                    id="db-host"
                    placeholder="localhost"
                    defaultValue="103.235.153.148"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-port">Port Database</Label>
                  <Input id="db-port" placeholder="5432" defaultValue="5432" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-name">Nama Database</Label>
                  <Input
                    id="db-name"
                    placeholder="smkscheduler"
                    defaultValue="genelabv4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-user">Username Database</Label>
                  <Input
                    id="db-user"
                    placeholder="postgres"
                    defaultValue="postgres"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-password">Password Database</Label>
                  <Input
                    id="db-password"
                    type="password"
                    placeholder="••••••••"
                    defaultValue="••••••••"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Test Koneksi Database
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Konfigurasi notifikasi sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notifikasi Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Kirim notifikasi melalui email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Notifikasi Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Kirim notifikasi push ke browser
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="email-server">Server SMTP</Label>
                <Input
                  id="email-server"
                  placeholder="smtp.example.com"
                  defaultValue="smtp.gmail.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email-port">Port SMTP</Label>
                  <Input id="email-port" placeholder="587" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-security">Keamanan</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="email-security">
                      <SelectValue placeholder="Pilih jenis keamanan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-username">Username SMTP</Label>
                  <Input
                    id="email-username"
                    placeholder="username@example.com"
                    defaultValue="notifikasi@smkcontoh.sch.id"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-password">Password SMTP</Label>
                  <Input
                    id="email-password"
                    type="password"
                    placeholder="••••••••"
                    defaultValue="••••••••"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Kirim Email Test
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Keamanan</CardTitle>
              <CardDescription>Konfigurasi keamanan sistem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Timeout Sesi (menit)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  min="5"
                  max="120"
                  defaultValue="30"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="force-password-change">
                    Paksa Ubah Password Berkala
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Pengguna harus mengubah password setiap 90 hari
                  </p>
                </div>
                <Switch id="force-password-change" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor-auth">
                    Autentikasi Dua Faktor
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan autentikasi dua faktor untuk admin
                  </p>
                </div>
                <Switch id="two-factor-auth" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="password-policy">Kebijakan Password</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Pilih kebijakan password" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      Rendah (min. 6 karakter)
                    </SelectItem>
                    <SelectItem value="medium">
                      Sedang (min. 8 karakter, huruf dan angka)
                    </SelectItem>
                    <SelectItem value="high">
                      Tinggi (min. 10 karakter, huruf, angka, dan simbol)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Tampilan</CardTitle>
              <CardDescription>Konfigurasi tampilan aplikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Mode Gelap</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan tema gelap untuk aplikasi
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="primary-color">Warna Utama</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="primary-color">
                    <SelectValue placeholder="Pilih warna utama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Biru</SelectItem>
                    <SelectItem value="green">Hijau</SelectItem>
                    <SelectItem value="purple">Ungu</SelectItem>
                    <SelectItem value="red">Merah</SelectItem>
                    <SelectItem value="orange">Oranye</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size">Ukuran Font</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Pilih ukuran font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Kecil</SelectItem>
                    <SelectItem value="medium">Sedang</SelectItem>
                    <SelectItem value="large">Besar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="layout-density">Kepadatan Layout</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger id="layout-density">
                    <SelectValue placeholder="Pilih kepadatan layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Padat</SelectItem>
                    <SelectItem value="comfortable">Nyaman</SelectItem>
                    <SelectItem value="spacious">Longgar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PengaturanPage;
