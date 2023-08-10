import logo from "../assest/images/logo_padang.png";
import Navbar from "react-bootstrap/Navbar";
import SettingAkun from "./atoms/SettingAkun";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = ({ toggleMobile }) => {
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          expand={expand}
          className="sb-topnav navbar navbar-expand navbar-dark bg-dark"
        >
          {/* <!-- Navbar Brand--> */}
          <div className="navbar-brand ps-3">
            <img
              src={logo}
              alt="side login"
              style={{
                maxWidth: "15%",
                paddingRight: "10px",
              }}
            />
            SITPP
          </div>
          {/* <!-- Sidebar Toggle--> */}
          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            onClick={() => toggleMobile()}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* <!-- Navbar Search--> */}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></form>
          {/* <!-- Navbar--> */}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <SettingAkun />
          </ul>
        </Navbar>
      ))}
    </>
  );
};
export default Navigation;
