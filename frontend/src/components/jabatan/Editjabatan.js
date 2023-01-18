import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/authSlice";
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

const Editjabatan = () => {
  const [nama, setNama] = useState("");
  const navigate = useNavigate();
  const { kode } = useParams();
  const [validation, setValidation] = useState({});

  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
    getJabatanById();
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const getJabatanById = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/jabatan/${kode}`
    );
    const data = await response.data.result;
    setNama(data.nama);
  };

  const updateJabatan = async (e) => {
    e.preventDefault();
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/jabatan/${kode}`, {
        nama: nama,
      })
      .then(() => {
        navigate("/masterjabatan");
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
              <Card.Title>Edit Jabatan</Card.Title>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.param} : ${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              <form onSubmit={updateJabatan}>
                <Form.Group className="mb-3">
                  <Form.Label>Kode Jabatan</Form.Label>
                  <Form.Control
                    value={kode}
                    type="text"
                    placeholder="Kode Jabatan"
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Jabatan</Form.Label>
                  <Form.Control
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    type="text"
                    placeholder="Nama Jabatan"
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
export default Editjabatan;
