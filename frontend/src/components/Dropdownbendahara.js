import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCogs,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Dropdownbendahara = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div
        onClick={() => toggleDropdown(2)}
        className={`nav-link cursorpointer collapsed ${
          openDropdownIndex === 2 ? "active" : ""
        }`}
      >
        <div className="sb-nav-link-icon">
          <FontAwesomeIcon icon={faCogs} />
        </div>
        Proses
        <div
          className={`drop-sub-menu ${
            openDropdownIndex === 2 ? "active dropmens" : ""
          }`}
          aria-controls="collapseLayouts"
          aria-expanded={openDropdownIndex}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <Collapse in={openDropdownIndex === 2 ? true : false}>
        <div id="collapseLayouts">
          <nav className="sb-sidenav-menu-nested nav">
            <Link className="nav-link" to="proses/absen">
              Absen
            </Link>
            <Link className="nav-link" to="proses/kalkulasitpp">
              Besaran TPP
            </Link>
          </nav>
        </div>
      </Collapse>
      <div
        onClick={() => toggleDropdown(3)}
        className={`nav-link cursorpointer collapsed ${
          openDropdownIndex === 3 ? "active" : ""
        }`}
      >
        <div className="sb-nav-link-icon">
          <FontAwesomeIcon icon={faFilePdf} />
        </div>
        Report
        <div
          className={`drop-sub-menu ${
            openDropdownIndex === 3 ? "active dropmens" : ""
          }`}
          aria-controls="collapseLayouts"
          aria-expanded={openDropdownIndex}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
      <Collapse in={openDropdownIndex === 3 ? true : false}>
        <div id="collapseLayouts">
          <nav className="sb-sidenav-menu-nested nav">
            <Link className="nav-link" to="report/aksesuser">
              Report User
            </Link>
            <Link className="nav-link" to="report/kelurahan">
              Report Kec./Kel.
            </Link>
            <Link className="nav-link" to="report/jabatan">
              Report Jabtan
            </Link>
            <Link className="nav-link" to="report/pegawai">
              Report Pegawai
            </Link>
            <Link className="nav-link" to="report/absen">
              Report Absen
            </Link>
            <Link className="nav-link" to="report/kalkulasitpp">
              Report Besaran TPP
            </Link>
          </nav>
        </div>
      </Collapse>
    </>
  );
};

export default Dropdownbendahara;
