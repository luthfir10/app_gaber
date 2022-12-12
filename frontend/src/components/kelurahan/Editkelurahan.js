import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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

const Editkelurahan = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();
  const { kode } = useParams();
  const [validation, setValidation] = useState({});

  useEffect(() => {
    getKelurahanById();
  }, []);

  const getKelurahanById = async () => {
    const response = await axios.get(`http://localhost:5000/kelurahan/${kode}`);
    const data = await response.data.result;
    setNama(data.nama);
    setAlamat(data.alamat);
  };

  const updateKelurahan = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:5000/kelurahan/${kode}`, {
        nama: nama,
        alamat: alamat,
      })
      .then(() => {
        navigate("/masterkelurahan");
      })
      .catch((error) => {
        setValidation(error.response.data.result);
      });
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <Card.Title>Edit Kelurahan</Card.Title>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.param} : ${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              <form onSubmit={updateKelurahan}>
                <Form.Group className="mb-3">
                  <Form.Label>Kode Kelurahan</Form.Label>
                  <Form.Control
                    value={kode}
                    type="text"
                    placeholder="NIP Kelurahan"
                    disabled
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
                    placeholder="Alamat Kelurahan"
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
                      Update
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
export default Editkelurahan;
