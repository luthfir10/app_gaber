import React from "react";
import { Route, Routes } from "react-router-dom";

import LoadingLazy from "../components/LoadingLazy";
import Dashboard from "../components/Dashboard";
import NotFound from "../components/NotFound";
import Masteruser from "../components/user/Masteruser";
import Masterkelurahan from "../components/kelurahan/Masterkelurahan";
import Inputuser from "../components/user/Inputuser";
import Edituser from "../components/user/Edituser";
import Inputkelurahan from "../components/kelurahan/Inputkelurahan";
import Editkelurahan from "../components/kelurahan/Editkelurahan";
import Masterjabatan from "../components/jabatan/Masterjabatan";
import Inputjabatan from "../components/jabatan/Inputjabatan";
import Editjabatan from "../components/jabatan/Editjabatan";
import Masterpegawai from "../components/pegawai/Masterpegawai";
import Inputpegawai from "../components/pegawai/Inputpegawai";
import Editpegawai from "../components/pegawai/Editpegawai";
import Masterabsen from "../components/absen/Masterabsen";
import Mastertpp from "../components/tpp/Mastertpp";
import ReportUser from "../components/report/reportuser/reportUser";
import ReportKelurahan from "../components/report/reportkecamatan/reportkecamatan";
import ReportJabatan from "../components/report/reportjabatan/ReportJabatan";
import ReportPegawai from "../components/report/reportpegawai/ReportPegawai";
import ReportAbsen from "../components/report/reportabsen/ReportAbsen";
import ReportTpp from "../components/report/reporttpp/ReportTpp";
// import Home from "../components/aksesuser/Home";

const LazyLayoutApp = React.lazy(() => import("../layout/LayoutApp"));

const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route
          element={
            <React.Suspense fallback={<LoadingLazy />}>
              <LazyLayoutApp />
            </React.Suspense>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="master">
            <Route path="aksesuser">
              <Route index element={<Masteruser />} />
              <Route path="add" element={<Inputuser />} />
              <Route path="edit/:uuid" element={<Edituser />} />
            </Route>
            <Route path="kelurahan">
              <Route index element={<Masterkelurahan />} />
              <Route path="add" element={<Inputkelurahan />} />
              <Route path="edit/:kode" element={<Editkelurahan />} />
            </Route>
            <Route path="jabatan">
              <Route index element={<Masterjabatan />} />
              <Route path="add" element={<Inputjabatan />} />
              <Route path="edit/:kode" element={<Editjabatan />} />
            </Route>
            <Route path="pegawai">
              <Route index element={<Masterpegawai />} />
              <Route path="add" element={<Inputpegawai />} />
              <Route path="edit/:nip" element={<Editpegawai />} />
            </Route>
          </Route>
          <Route path="proses">
            <Route path="absen" element={<Masterabsen />} />
            <Route path="kalkulasitpp" element={<Mastertpp />} />
          </Route>
          <Route path="report">
            <Route path="aksesuser" element={<ReportUser />} />
            <Route path="kelurahan" element={<ReportKelurahan />} />
            <Route path="jabatan" element={<ReportJabatan />} />
            <Route path="pegawai" element={<ReportPegawai />} />
            <Route path="absen" element={<ReportAbsen />} />
            <Route path="kalkulasitpp" element={<ReportTpp />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoute;
