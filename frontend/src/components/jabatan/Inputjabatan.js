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

const Inputjabatan = () => {
  const [kode, setNip] = useState("");
  const [nama, setNama] = useState("");
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});

  const saveKelurahan = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:5000/jabatan`, {
        kode: kode,
        nama: nama,
      })
      .then(() => {
        navigate("/masterjabatan");
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
                  <Form.Label>Kode Jabatan</Form.Label>
                  <Form.Control
                    value={kode}
                    onChange={(e) => setNip(e.target.value)}
                    type="text"
                    placeholder="Kode Kelurahan"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Jabatan</Form.Label>
                  <Form.Control
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    type="text"
                    placeholder="Nama Kelurahan"
                    required
                  />
                </Form.Group>

                <Row className="col-md-5 mx-auto">
                  <Col>
                    <Link to="/masterjabatan">
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
export default Inputjabatan;
