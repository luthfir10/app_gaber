import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";

// import Masterpegawai from "./components/pegawai/Masterpegawai";
// import Inputpegawai from "./components/pegawai/Inputpegawai";
// import Editpegawai from "./components/pegawai/Editpegawai";

import Masterkelurahan from "./components/kelurahan/Masterkelurahan";
import Inputkelurahan from "./components/kelurahan/Inputkelurahan";
import Editkelurahan from "./components/kelurahan/Editkelurahan";

import Masterjabatan from "./components/jabatan/Masterjabatan";
import Inputjabatan from "./components/jabatan/Inputjabatan";
import Editjabatan from "./components/jabatan/Editjabatan";

import Masterabsen from "./components/absen/Masterabsen";

import NotFound from "./components/NotFound";

const LazyMasterpegawai = React.lazy(() =>
  import("./components/pegawai/Masterpegawai")
);
const LazyInputpegawai = React.lazy(() =>
  import("./components/pegawai/Inputpegawai")
);
const LazyEditpegawai = React.lazy(() =>
  import("./components/pegawai/Editpegawai")
);

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/masterpegawai"
          element={
            <React.Suspense fallback="Loading...">
              <LazyMasterpegawai />
            </React.Suspense>
          }
        />
        <Route
          path="/masterpegawai/add"
          element={
            <React.Suspense fallback="Loading...">
              <LazyInputpegawai />
            </React.Suspense>
          }
        />
        <Route
          path="/masterpegawai/edit/:nip"
          element={
            <React.Suspense fallback="Loading...">
              <LazyEditpegawai />
            </React.Suspense>
          }
        />

        <Route path="/masterkelurahan" element={<Masterkelurahan />} />
        <Route path="/masterkelurahan/add" element={<Inputkelurahan />} />
        <Route path="/masterkelurahan/edit/:kode" element={<Editkelurahan />} />

        <Route path="/masterjabatan" element={<Masterjabatan />} />
        <Route path="/masterjabatan/add" element={<Inputjabatan />} />
        <Route path="/masterjabatan/edit/:kode" element={<Editjabatan />} />

        <Route path="/masterabsen" element={<Masterabsen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
