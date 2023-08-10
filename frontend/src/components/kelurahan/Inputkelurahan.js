import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { getMe } from "../../features/authSlice";

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
  const [kode, setKode] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});

  // const dispatch = useDispatch();
  // const { isError } = useSelector((state) => state.auth);

  const [alertshow, setAlertShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [notinfo, setNotinfo] = useState("warning");

  const saveKelurahan = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/kelurahan`, {
          kode: kode,
          nama: nama,
          alamat: alamat,
        })
        .then((res) => {
          notifSukses(res);
          resetVariabel();
        })
        .catch((error) => {
          notifError(error.response);
          setValidated(false);
        });
    }
  };

  const resetVariabel = () => {
    setKode("");
    setNama("");
    setAlamat("");
    setValidated(false);
  };

  const notifSukses = (e) => {
    setNotinfo("success");
    setValidation(e);
    setAlertShow(true);
    setTimeout(() => {
      setAlertShow(false);
      setValidation({});
    }, 3000);
  };
  const notifError = (e) => {
    setNotinfo("danger");
    setValidation(e);
    setAlertShow(true);
    setTimeout(() => {
      setAlertShow(false);
      setValidation({});
    }, 3000);
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <Card.Title>Input Kelurahan</Card.Title>
              {alertshow && (
                <Alert
                  variant={notinfo}
                  onClose={() => setAlertShow(false)}
                  dismissible
                >
                  {validation.data.message}
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={saveKelurahan}>
                <Form.Group className="mb-3">
                  <Form.Label>Kode Kelurahan</Form.Label>
                  <Form.Control
                    value={kode}
                    onChange={(e) => setKode(e.target.value)}
                    type="text"
                    placeholder="Kode Kelurahan"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Kode tidak boleh kosong.!
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    Nama tidak boleh kosong.!
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    Alamat tidak boleh kosong.!
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="col-md-5 mx-auto">
                  <Col>
                    <Link to="/tpp/master/kelurahan">
                      <Button variant="primary">Batal</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button variant="primary" type="submit">
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Inputkelurahan;
