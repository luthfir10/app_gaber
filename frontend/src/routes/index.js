import React from "react";
import { Route, Routes } from "react-router-dom";

import PersistLogin from "../services/PersistLogin";

import Noaccess from "../components/Noaccess";
import NotFound from "../components/NotFound";
import LoadingLazy from "../components/LoadingLazy";
import ProtectedRoute from "./ProtectedRoute";
import AppRoute from "./AppRoute";
import PegawiaRoute from "./PegawiaRoute";

const LazyPageLogin = React.lazy(() => import("../components/login/LoginForm"));

const Routers = () => {
  return (
    <Routes>
      {/* Publick Routes */}
      <Route
        path="/"
        element={
          <React.Suspense fallback={<LoadingLazy />}>
            <LazyPageLogin />
          </React.Suspense>
        }
      />

      {/* Private Routes */}
      <Route element={<PersistLogin />}>
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["pranata komputer", "bendahara", "camat"]}
            />
          }
        >
          <Route path="/tpp/*" element={<AppRoute />}></Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["pegawai"]} />}>
          <Route path="/app/*" element={<PegawiaRoute />}></Route>
        </Route>
      </Route>

      {/* Notfound Routes */}
      <Route path="unauthorized" element={<Noaccess />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
