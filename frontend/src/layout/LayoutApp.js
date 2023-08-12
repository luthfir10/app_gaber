import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import MenuBar from "../components/MenuBar";

const LayoutApp = () => {
  const [sidenavToggled, setSidenavToggled] = useState(false);

  let mobileMenuRef = useRef();

  useEffect(() => {
    let hendler = (e) => {
      if (mobileMenuRef.current.contains(e.target)) {
        setSidenavToggled(false);
      }
    };

    document.addEventListener("mousedown", hendler);
  });

  const togglemobile = () => {
    setSidenavToggled(!sidenavToggled);
  };

  const menuClickMobile = () => {
    setSidenavToggled(false);
  };

  return (
    <React.Fragment>
      <div
        className={`sb-nav-fixed ${sidenavToggled ? "sb-sidenav-toggled" : ""}`}
      >
        <Navigation toggleMobile={togglemobile} />
        <div id="layoutSidenav">
          <MenuBar menuClickMobile={menuClickMobile} />
          <div id="layoutSidenav_content" ref={mobileMenuRef}>
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

export default LayoutApp;
