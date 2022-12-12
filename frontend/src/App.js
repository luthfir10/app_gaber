import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";

// import Masterpegawai from "./components/pegawai/Masterpegawai";
// import Inputpegawai from "./components/pegawai/Inputpegawai";
// import Editpegawai from "./components/pegawai/Editpegawai";

// import Masterkelurahan from "./components/kelurahan/Masterkelurahan";
// import Inputkelurahan from "./components/kelurahan/Inputkelurahan";
// import Editkelurahan from "./components/kelurahan/Editkelurahan";

// import Masterjabatan from "./components/jabatan/Masterjabatan";
// import Inputjabatan from "./components/jabatan/Inputjabatan";
// import Editjabatan from "./components/jabatan/Editjabatan";

// import Masterabsen from "./components/absen/Masterabsen";

// import NotFound from "./components/NotFound";

const LazyMasterpegawai = React.lazy(() =>
  import("./components/pegawai/Masterpegawai")
);
const LazyInputpegawai = React.lazy(() =>
  import("./components/pegawai/Inputpegawai")
);
const LazyEditpegawai = React.lazy(() =>
  import("./components/pegawai/Editpegawai")
);

const LazyMasterkelurahan = React.lazy(() =>
  import("./components/kelurahan/Masterkelurahan")
);
const LazyInputkelurahan = React.lazy(() =>
  import("./components/kelurahan/Inputkelurahan")
);
const LazyEditkelurahan = React.lazy(() =>
  import("./components/kelurahan/Editkelurahan")
);

const LazyMasterjabatan = React.lazy(() =>
  import("./components/jabatan/Masterjabatan")
);
const LazyInputjabatan = React.lazy(() =>
  import("./components/jabatan/Inputjabatan")
);
const LazyEditjabatan = React.lazy(() =>
  import("./components/jabatan/Editjabatan")
);

const LazyMasterabsen = React.lazy(() =>
  import("./components/absen/Masterabsen")
);

const LazyNotFound = React.lazy(() => import("./components/NotFound"));

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

        <Route
          path="/masterkelurahan"
          element={
            <React.Suspense fallback="Loading...">
              <LazyMasterkelurahan />
            </React.Suspense>
          }
        />
        <Route
          path="/masterkelurahan/add"
          element={
            <React.Suspense fallback="Loading...">
              <LazyInputkelurahan />
            </React.Suspense>
          }
        />
        <Route
          path="/masterkelurahan/edit/:kode"
          element={
            <React.Suspense fallback="Loading...">
              <LazyEditkelurahan />
            </React.Suspense>
          }
        />

        <Route
          path="/masterjabatan"
          element={
            <React.Suspense fallback="Loading...">
              <LazyMasterjabatan />
            </React.Suspense>
          }
        />
        <Route
          path="/masterjabatan/add"
          element={
            <React.Suspense fallback="Loading...">
              <LazyInputjabatan />
            </React.Suspense>
          }
        />
        <Route
          path="/masterjabatan/edit/:kode"
          element={
            <React.Suspense fallback="Loading...">
              <LazyEditjabatan />
            </React.Suspense>
          }
        />

        <Route
          path="/masterabsen"
          element={
            <React.Suspense fallback="Loading...">
              <LazyMasterabsen />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback="Loading...">
              <LazyNotFound />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
