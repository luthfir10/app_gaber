import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

import Dropdownmenu from "./atoms/DropdownMenu";
import useAuth from "../services/hooks/useAuth";
import useLogout from "../services/hooks/useLogout";
import Dropdownbendahara from "./Dropdownbendahara";
import Dropdowncamat from "./Dropdowncamat";

const MenuBar = ({ menuClickMobile }) => {
  const navigate = useNavigate();
  const logout = useLogout();

  const { auth } = useAuth();
  let dropDownMenu;

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  if (auth.roles[0] === "pranata komputer") {
    dropDownMenu = <Dropdownmenu menuClickMobiles={menuClickMobile} />;
  } else if (auth.roles[0] === "bendahara") {
    dropDownMenu = <Dropdownbendahara menuClickMobiles={menuClickMobile} />;
  } else if (auth.roles[0] === "camat") {
    dropDownMenu = <Dropdowncamat menuClickMobiles={menuClickMobile} />;
  }

  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Menu</div>
            <Link
              to="/tpp"
              className="nav-link collapsed"
              onClick={() => menuClickMobile()}
            >
              <div className="sb-nav-link-icon">
                <FontAwesomeIcon icon={faTachometerAlt} />
              </div>
              Dashboard
            </Link>
            <div className="sb-sidenav-menu-heading">Utility</div>
            {dropDownMenu}
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
export default MenuBar;
