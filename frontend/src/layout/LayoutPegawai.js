import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import MenuPegawai from "../components/MenuPegawai";

const LayoutPegawai = () => {
  const [sidenavToggled, setSidenavToggled] = useState(false);

  const togglemobile = () => {
    setSidenavToggled(!sidenavToggled);
  };

  return (
    <React.Fragment>
      <div
        className={`sb-nav-fixed ${sidenavToggled ? "sb-sidenav-toggled" : ""}`}
      >
        <Navigation toggleMobile={togglemobile} />
        <div id="layoutSidenav">
          <MenuPegawai />
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LayoutPegawai;
