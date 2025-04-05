import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import DashboardLayout from "./components/layout/DashboardLayout";
import Home from "./components/home";
import DatabaseIntegration from "./components/storyboards/DatabaseIntegration";
import GuruPage from "./components/pages/GuruPage";
import KelasPage from "./components/pages/KelasPage";
import RuanganPage from "./components/pages/RuanganPage";
import KurikulumPage from "./components/pages/KurikulumPage";
import SlotWaktuPage from "./components/pages/SlotWaktuPage";
import PenjadwalanPage from "./components/pages/PenjadwalanPage";
import VisualisasiPage from "./components/pages/VisualisasiPage";
import LaporanPage from "./components/pages/LaporanPage";
import PenggunaPage from "./components/pages/PenggunaPage";
import PengaturanPage from "./components/pages/PengaturanPage";
import JurusanPage from "./components/pages/JurusanPage";

function AppRoutes() {
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />
        <Route
          path="/database"
          element={
            <DashboardLayout title="Database Integration">
              <DatabaseIntegration />
            </DashboardLayout>
          }
        />
        <Route
          path="/guru"
          element={
            <DashboardLayout title="Manajemen Guru">
              <GuruPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/kelas"
          element={
            <DashboardLayout title="Manajemen Kelas">
              <KelasPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/ruangan"
          element={
            <DashboardLayout title="Manajemen Ruangan">
              <RuanganPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/kurikulum"
          element={
            <DashboardLayout title="Manajemen Kurikulum">
              <KurikulumPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/jurusan"
          element={
            <DashboardLayout title="Manajemen Jurusan">
              <JurusanPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/slot-waktu"
          element={
            <DashboardLayout title="Manajemen Slot Waktu">
              <SlotWaktuPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/penjadwalan"
          element={
            <DashboardLayout title="Penjadwalan">
              <PenjadwalanPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/visualisasi"
          element={
            <DashboardLayout title="Visualisasi Jadwal">
              <VisualisasiPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/laporan"
          element={
            <DashboardLayout title="Laporan">
              <LaporanPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/pengguna"
          element={
            <DashboardLayout title="Manajemen Pengguna">
              <PenggunaPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/pengaturan"
          element={
            <DashboardLayout title="Pengaturan">
              <PengaturanPage />
            </DashboardLayout>
          }
        />
      </Routes>
      {tempoRoutes}
    </>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
