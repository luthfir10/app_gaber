import { useState } from "react";

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

const Navigation = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                  Menu Admin
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to="/" className="nav-link" onClick={handleClose}>
                    Dashboard
                  </Link>
                  <NavDropdown title="Master Data" id="collasible-nav-dropdown">
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
                  <Link
                    to="/masterabsen"
                    className="nav-link"
                    onClick={handleClose}
                  >
                    Pemotongan Kehadiran
                  </Link>
                  <Link to="/" className="nav-link" onClick={handleClose}>
                    Report
                  </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};
export default Navigation;
