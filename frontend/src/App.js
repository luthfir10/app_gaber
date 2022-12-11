import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import Masterpegawai from "./components/pegawai/Masterpegawai";
import Inputpegawai from "./components/pegawai/Inputpegawai";
import Editpegawai from "./components/pegawai/Editpegawai";

import Masterkelurahan from "./components/kelurahan/Masterkelurahan";
import Inputkelurahan from "./components/kelurahan/Inputkelurahan";
import Editkelurahan from "./components/kelurahan/Editkelurahan";

import Masterjabatan from "./components/jabatan/Masterjabatan";
import Inputjabatan from "./components/jabatan/Inputjabatan";
import Editjabatan from "./components/jabatan/Editjabatan";

import Masterabsen from "./components/absen/Masterabsen";

import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/masterpegawai" element={<Masterpegawai />} />
        <Route path="/masterpegawai/add" element={<Inputpegawai />} />
        <Route path="/masterpegawai/edit/:id" element={<Editpegawai />} />

        <Route path="/masterkelurahan" element={<Masterkelurahan />} />
        <Route path="/masterkelurahan/add" element={<Inputkelurahan />} />
        <Route path="/masterkelurahan/edit/:id" element={<Editkelurahan />} />

        <Route path="/masterjabatan" element={<Masterjabatan />} />
        <Route path="/masterjabatan/add" element={<Inputjabatan />} />
        <Route path="/masterjabatan/edit/:id" element={<Editjabatan />} />

        <Route path="/masterabsen" element={<Masterabsen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
