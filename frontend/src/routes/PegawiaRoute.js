import React from "react";
import { Route, Routes } from "react-router-dom";

import LoadingLazy from "../components/LoadingLazy";
import Dashboard from "../components/Dashboard";
import NotFound from "../components/NotFound";
import InputCekTpp from "../components/aksesuser/cektpp/InputCekTpp";

const LazyLayoutPegawai = React.lazy(() => import("../layout/LayoutPegawai"));

const PegawiaRoute = () => {
  return (
    <>
      <Routes>
        <Route
          element={
            <React.Suspense fallback={<LoadingLazy />}>
              <LazyLayoutPegawai />
            </React.Suspense>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="cektpp" element={<InputCekTpp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default PegawiaRoute;
