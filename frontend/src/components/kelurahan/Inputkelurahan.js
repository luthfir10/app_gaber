import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

const Inputkelurahan = () => {
  const [kode, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});

  const saveKelurahan = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:5000/kelurahan`, {
        kode: kode,
        nama: nama,
        alamat: alamat,
      })
      .then(() => {
        navigate("/masterkelurahan");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <Card.Title>Input Kelurahan</Card.Title>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              <form onSubmit={saveKelurahan}>
                <Form.Group className="mb-3">
                  <Form.Label>Kode Kelurahan</Form.Label>
                  <Form.Control
                    value={kode}
                    onChange={(e) => setNip(e.target.value)}
                    type="text"
                    placeholder="Kode Kelurahan"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Kelurahan</Form.Label>
                  <Form.Control
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    type="text"
                    placeholder="Nama Kelurahan"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    type="text"
                    placeholder="Alamat Pegawai"
                    required
                  />
                </Form.Group>

                <Row className="col-md-5 mx-auto">
                  <Col>
                    <Link to="/masterkelurahan">
                      <Button variant="primary">Cencel</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button variant="primary" type="submit">
                      Save
                    </Button>
                  </Col>
                </Row>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Inputkelurahan;
