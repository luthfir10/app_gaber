import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button, Container } from "react-bootstrap";

const Navigation = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  if (!user) {
    return (
      <>
        {/* {["lg"].map((expand) => (
          // <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          //   <Container fluid>
          //     <Navbar.Brand>
          //       <Link to="/" className="dropdown-item">
          //         SITPP
          //       </Link>
          //     </Navbar.Brand>
          //     <Navbar.Toggle
          //       aria-controls={`offcanvasNavbar-expand-${expand}`}
          //       onClick={handleShow}
          //     />
          //     <Navbar.Offcanvas
          //       id={`offcanvasNavbar-expand-${expand}`}
          //       aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          //       placement="end"
          //       show={show}
          //       onHide={handleClose}
          //     >
          //       <Offcanvas.Header closeButton>
          //         <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
          //           Menu
          //         </Offcanvas.Title>
          //       </Offcanvas.Header>
          //       <Offcanvas.Body>
          //         <Nav className="justify-content-end flex-grow-1 pe-3">
          //           <Link to="/" className="nav-link" onClick={handleClose}>
          //             Home
          //           </Link>
          //           <Link
          //             to="/cektpp"
          //             className="nav-link"
          //             onClick={handleClose}
          //           >
          //             Tpp
          //           </Link>
          //           <Link
          //             to="/login"
          //             className="nav-link"
          //             onClick={handleClose}
          //           >
          //             Login
          //           </Link>
          //         </Nav>
          //       </Offcanvas.Body>
          //     </Navbar.Offcanvas>
          //   </Container>
          // </Navbar>
          <></>
        ))} */}
      </>
    );
  } else if (user.role === "pranata komputer") {
    return (
      <>
        {["lg"].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Brand>
                <Link to="/dashboard" className="dropdown-item">
                  SITPP
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
                onClick={handleShow}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                show={show}
                onHide={handleClose}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu Pranata Komputer
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link
                      to="/dashboard"
                      className="nav-link"
                      onClick={handleClose}
                    >
                      Dashboard
                    </Link>
                    <NavDropdown
                      title="Master Data"
                      id="collasible-nav-dropdown"
                    >
                      <Link
                        to="/masteruser"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Akses User
                      </Link>
                      <Link
                        to="/masterkelurahan"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Master Kecamatan/Kelurahan
                      </Link>
                      <Link
                        to="/masterjabatan"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Master Jabatan
                      </Link>
                      <Link
                        to="/masterpegawai"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Master Pegawai
                      </Link>
                    </NavDropdown>
                    <NavDropdown title="Report" id="collasible-nav-dropdown">
                      <Link
                        to="/reportuser"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report User
                      </Link>
                      <Link
                        to="/reportkelurahan"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Kecamatan/Kelurahan
                      </Link>
                      <Link
                        to="/reportjabatan"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Jabatan
                      </Link>
                      <Link
                        to="/reportabsen"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Pegawai
                      </Link>
                      <Link
                        to="/ReportAbsen"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Absen
                      </Link>
                      <Link
                        to="/masterpegawai"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Besaran TPP
                      </Link>
                    </NavDropdown>
                    <Link
                      to="/reportabsen"
                      className="nav-link"
                      onClick={handleClose}
                    >
                      Absen
                    </Link>
                    <Link
                      to="/mastertpp"
                      className="nav-link"
                      onClick={handleClose}
                    >
                      Besaran TPP
                    </Link>
                    {isSuccess ? (
                      <Button variant="light" onClick={logout}>
                        Logout
                      </Button>
                    ) : null}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    );
  } else if (user.role === "bendahara") {
    return (
      <>
        {["lg"].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Brand>
                <Link to="/dashboard" className="dropdown-item">
                  SITPP
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
                onClick={handleShow}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                show={show}
                onHide={handleClose}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu Bendahara
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link
                      to="/dashboard"
                      className="nav-link"
                      onClick={handleClose}
                    >
                      Dashboard
                    </Link>
                    <NavDropdown title="Report" id="collasible-nav-dropdown">
                      <Link
                        to="/reportuser"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report User
                      </Link>
                      <Link
                        to="/reportkelurahan"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Kecamatan/Kelurahan
                      </Link>
                      <Link
                        to="/reportjabatan"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Jabatan
                      </Link>
                      <Link
                        to="/reportabsen"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Pegawai
                      </Link>
                      <Link
                        to="/ReportAbsen"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Absen
                      </Link>
                      <Link
                        to="/masterpegawai"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Besaran TPP
                      </Link>
                    </NavDropdown>
                    <Link
                      to="/masterabsen"
                      className="nav-link"
                      onClick={handleClose}
                    >
                      Absen
                    </Link>
                    <Link
                      to="/mastertpp"
                      className="nav-link"
                      onClick={handleClose}
                    >
                      Besaran TPP
                    </Link>
                    {isSuccess ? (
                      <Button variant="light" onClick={logout}>
                        Logout
                      </Button>
                    ) : null}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    );
  } else if (user.role === "camat") {
    return (
      <>
        {["lg"].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Brand>
                <Link to="/dashboard" className="dropdown-item">
                  SITPP
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
                onClick={handleShow}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                show={show}
                onHide={handleClose}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu Camat
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link
                      to="/dashboard"
                      className="nav-link"
                      onClick={handleClose}
                    >
                      Dashboard
                    </Link>
                    <NavDropdown title="Report" id="collasible-nav-dropdown">
                      <Link
                        to="/reportuser"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report User
                      </Link>
                      <Link
                        to="/reportkelurahan"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Kecamatan/Kelurahan
                      </Link>
                      <Link
                        to="/reportjabatan"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Jabatan
                      </Link>
                      <Link
                        to="/reportabsen"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Pegawai
                      </Link>
                      <Link
                        to="/ReportAbsen"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Absen
                      </Link>
                      <Link
                        to="/masterpegawai"
                        className="dropdown-item"
                        onClick={handleClose}
                      >
                        Report Besaran TPP
                      </Link>
                    </NavDropdown>
                    {isSuccess ? (
                      <Button variant="light" onClick={logout}>
                        Logout
                      </Button>
                    ) : null}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    );
  } else if (user.role === "pegawai") {
    return (
      <>
        {["lg"].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand} className="mb-3">
            <Container fluid>
              <Navbar.Brand>
                <Link to="/" className="dropdown-item">
                  SITPP
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
                onClick={handleShow}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                show={show}
                onHide={handleClose}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Link to="/" className="nav-link" onClick={handleClose}>
                      Home
                    </Link>
                    <Link
                      to="/cektpp"
                      className="nav-link"
                      onClick={handleClose}
                    >
                      Tpp
                    </Link>
                    {isSuccess ? (
                      <Button variant="light" onClick={logout}>
                        Logout
                      </Button>
                    ) : null}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    );
  }
};
export default Navigation;
