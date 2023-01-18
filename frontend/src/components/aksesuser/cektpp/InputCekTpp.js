import React, { useState } from "react";
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

import GeneratPdf from "./GeneratPdf";

const InputCekTpp = () => {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [nip, setNip] = useState("");

  // const [tpppdf, setTpppdf] = useState(false);
  const [alertshow, setAlertShow] = useState(false);
  const [disaktif, setDisaktif] = useState(false);
  const [validation, setValidation] = useState({});

  const showTpp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/cektpp/${nip}&${bulan}&${tahun}`
      );
      GeneratPdf(response.data.result);
    } catch (error) {
      setValidation(error.response);
      setAlertShow(true);
    }
  };

  const resetVariabel = () => {
    setNip("");
    setTahun("");
  };

  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow-sm">
              <Card.Body>
                <Card.Title>TPP</Card.Title>
                <Container>
                  <Row>
                    <Col sm={10}>
                      {alertshow && (
                        <Alert
                          variant="danger"
                          onClose={() => setAlertShow(false)}
                          dismissible
                        >
                          {validation.data.message}
                        </Alert>
                      )}
                      <form>
                        <Form.Group className="mb-3">
                          <Form.Label>NIP</Form.Label>
                          <Form.Control
                            value={nip}
                            onChange={(e) => setNip(e.target.value)}
                            type="text"
                            placeholder="NIP Pegawai"
                            minLength="18"
                            maxLength="18"
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Bulan</Form.Label>
                          <Form.Select
                            onChange={(e) => setBulan(e.target.value)}
                            disabled={disaktif}
                            required
                          >
                            <option value="">Pilih Bulan</option>
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
                          <Form.Label>Tahun</Form.Label>
                          <Form.Control
                            type="text"
                            value={tahun}
                            onChange={(e) => setTahun(e.target.value)}
                            placeholder="Tahun"
                            minLength="4"
                            maxLength="4"
                            disabled={disaktif}
                            required
                          />
                        </Form.Group>

                        <Row className="col-md-5 mx-auto">
                          <Col>
                            <Button variant="primary" onClick={resetVariabel}>
                              Reset
                            </Button>
                          </Col>
                          <Col>
                            <Button variant="primary" onClick={showTpp}>
                              Cek
                            </Button>
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
      {/* {tpppdf ? (
        <Container className="mt-3">
          <Row>
            <Col md="{12}">
              <Card className="border-0 rounded shadow-sm">
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Container>
                    <Row>
                      <Col><GeneratPdf datatpp={datta} /></Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : null} */}
    </>
  );
};
export default InputCekTpp;
