import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import Navigation from "./components/Navigation";

const LazyHome = React.lazy(() => import("./components/aksesuser/Home"));
const LazyDahsbord = React.lazy(() => import("./components/Dashboard"));
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

const LazyMasterTpp = React.lazy(() => import("./components/tpp/Mastertpp"));

const LazyLogin = React.lazy(() => import("./components/login/LoginForm"));

const LazyCekTpp = React.lazy(() =>
  import("./components/aksesuser/cektpp/InputCekTpp")
);

const LazyNotFound = React.lazy(() => import("./components/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <React.Suspense
        fallback={
          <Spinner animation="border" role="status" variant="success">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
      >
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/dashboard" element={<LazyDahsbord />} />
          <Route path="/masterpegawai" element={<LazyMasterpegawai />} />
          <Route path="/masterpegawai/add" element={<LazyInputpegawai />} />
          <Route
            path="/masterpegawai/edit/:nip"
            element={<LazyEditpegawai />}
          />

          <Route path="/masterkelurahan" element={<LazyMasterkelurahan />} />
          <Route path="/masterkelurahan/add" element={<LazyInputkelurahan />} />
          <Route
            path="/masterkelurahan/edit/:kode"
            element={<LazyEditkelurahan />}
          />

          <Route path="/masterjabatan" element={<LazyMasterjabatan />} />
          <Route path="/masterjabatan/add" element={<LazyInputjabatan />} />
          <Route
            path="/masterjabatan/edit/:kode"
            element={<LazyEditjabatan />}
          />

          <Route path="/masterabsen" element={<LazyMasterabsen />} />

          <Route path="/mastertpp" element={<LazyMasterTpp />} />

          <Route path="/login" element={<LazyLogin />} />

          <Route path="/cektpp" element={<LazyCekTpp />} />

          <Route path="*" element={<LazyNotFound />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
