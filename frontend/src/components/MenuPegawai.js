import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSignOutAlt,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import useLogout from "../services/hooks/useLogout";

const MenuPegawai = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Menu</div>
            <Link to="/app" className="nav-link collapsed">
              <div className="sb-nav-link-icon">
                <FontAwesomeIcon icon={faTachometerAlt} />
              </div>
              Home
            </Link>
            <div className="sb-sidenav-menu-heading">Utility</div>
            <Link to="cektpp" className="nav-link collapsed">
              <div className="sb-nav-link-icon">
                <FontAwesomeIcon icon={faSearch} />
              </div>
              Cek TPP
            </Link>
            <div className="sb-sidenav-menu-heading">User</div>
            <Button variant="link" className="nav-link" onClick={signOut}>
              <div className="sb-nav-link-icon">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </div>
              Logout
            </Button>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Aplikasi Tambahan Penghasilan Pegawai</div>
        </div>
      </nav>
    </div>
  );
};
export default MenuPegawai;
