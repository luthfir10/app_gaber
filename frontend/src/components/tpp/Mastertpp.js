import { useState } from "react";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getMe } from "../../features/authSlice";
import axios from "axios";

import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

import ListTpp from "./ListTpp";

const Mastertpp = () => {
  const [bulantpp, setBulantpp] = useState("");
  const [tahuntpp, setTahuntpp] = useState("");
  const [bulanabsen, setBulanabsen] = useState("");
  const [tahunabsen, setTahunabsen] = useState("");

  const [datatpp, setDatatpp] = useState([]);
  const [tabelAbsenTpp, setTabelAbsenTpp] = useState(false);

  const [alertshow, setAlertShow] = useState(false);

  const [validation, setValidation] = useState({});

  const gantiAbsenTpp = datatpp.map((i) => {
    i["bulan_tpp"] = bulantpp;
    i["tahun_tpp"] = tahuntpp;
    i["saldo_tpp"] = 0;
    i["iur_sos"] = 0;
    i["pemot_ll"] = 0;
    i["nilskp"] = 0;
    return i;
  });

  const showAbsen = async (e) => {
    e.preventDefault();
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/tpp/${bulantpp}&${tahuntpp}&${bulanabsen}&${tahunabsen}`
      )
      .then((res) => {
        setDatatpp(res.data.result);
        setTabelAbsenTpp(true);
      })
      .catch((error) => {
        setValidation(error.response);
        setAlertShow(true);
      });
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow-sm">
              <Card.Body>
                <Card.Title>
                  Input Proses Tambahan Penghasilan Pegawai
                </Card.Title>
                <Container>
                  <Row>
                    <Col sm={12}>
                      {alertshow && (
                        <Alert
                          variant="danger"
                          onClose={() => setAlertShow(false)}
                          dismissible
                        >
                          {validation.data.message}
                        </Alert>
                      )}
                      <form onSubmit={showAbsen}>
                        <Container>
                          <Row>
                            <Col>
                              <Form.Group className="mb-3">
                                <Form.Label>Bulan dan Tahun Absen</Form.Label>
                                <Form.Select
                                  onChange={(e) =>
                                    setBulanabsen(e.target.value)
                                  }
                                  required
                                >
                                  <option value="">Pilih Bulan Absen</option>
                                  <option value="1">Januari</option>
                                  <option value="2">Februari</option>
                                  <option value="3">Maret</option>
                                  <option value="4">April</option>
                                  <option value="5">Mei</option>
                                  <option value="6">Juni</option>
                                  <option value="7">Juli</option>
                                  <option value="8">Agustus</option>
                                  <option value="9">September</option>
                                  <option value="10">Oktober</option>
                                  <option value="11">November</option>
                                  <option value="12">Desember</option>
                                </Form.Select>
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label></Form.Label>
                                <Form.Control
                                  type="text"
                                  value={tahunabsen}
                                  onChange={(e) =>
                                    setTahunabsen(e.target.value)
                                  }
                                  placeholder="Tahun Absen"
                                  minLength="4"
                                  maxLength="4"
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group className="mb-3">
                                <Form.Label>
                                  Bulan dan Tahun Proses TPP
                                </Form.Label>
                                <Form.Select
                                  onChange={(e) => setBulantpp(e.target.value)}
                                  required
                                >
                                  <option value="">
                                    Pilih Bulan Pemrosesan TPP
                                  </option>
                                  <option value="1">Januari</option>
                                  <option value="2">Februari</option>
                                  <option value="3">Maret</option>
                                  <option value="4">April</option>
                                  <option value="5">Mei</option>
                                  <option value="6">Juni</option>
                                  <option value="7">Juli</option>
                                  <option value="8">Agustus</option>
                                  <option value="9">September</option>
                                  <option value="10">Oktober</option>
                                  <option value="11">November</option>
                                  <option value="12">Desember</option>
                                </Form.Select>
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label></Form.Label>
                                <Form.Control
                                  type="text"
                                  value={tahuntpp}
                                  onChange={(e) => setTahuntpp(e.target.value)}
                                  placeholder="Tahun Pemrosesan TPP"
                                  minLength="4"
                                  maxLength="4"
                                  required
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </Container>

                        <Row className="col-md-5 mx-auto">
                          <Col>
                            {tabelAbsenTpp ? (
                              <Link to="/tpp">
                                <Button variant="primary">Cencel</Button>
                              </Link>
                            ) : (
                              <Link to="/tpp/proses/absen">
                                <Button variant="primary">Check</Button>
                              </Link>
                            )}
                          </Col>
                          <Col>
                            {tabelAbsenTpp ? null : (
                              <Button variant="primary" type="submit">
                                Input
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </form>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {tabelAbsenTpp ? <ListTpp DataTpp={gantiAbsenTpp} /> : null}
    </>
  );
};
export default Mastertpp;
