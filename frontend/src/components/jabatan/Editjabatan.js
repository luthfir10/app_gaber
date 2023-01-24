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

  const [alertshow, setAlertShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [notinfo, setNotinfo] = useState("warning");

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
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      await axios
        .patch(`${process.env.REACT_APP_API_URL}/jabatan/${kode}`, {
          nama: nama,
        })
        .then((res) => {
          notifSukses(res);
          setValidated(false);
        })
        .catch((error) => {
          notifError(error.response);
          setValidated(false);
        });
    }
  };

  const notifSukses = (e) => {
    setNotinfo("success");
    setValidation(e);
    setAlertShow(true);
    setTimeout(() => {
      setAlertShow(false);
      setValidation({});
      navigate("/masterjabatan");
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
              <Card.Title>Edit Jabatan</Card.Title>
              {alertshow && (
                <Alert
                  variant={notinfo}
                  onClose={() => setAlertShow(false)}
                  dismissible
                >
                  {validation.data.message}
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={updateJabatan}>
                <Form.Group className="mb-3">
                  <Form.Label>Kode Jabatan</Form.Label>
                  <Form.Control
                    value={kode}
                    type="text"
                    placeholder="Kode Jabatan"
                    disabled
                  />
                  <Form.Control.Feedback type="invalid">
                    Kode jabatan tidak boleh kosong.!
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    Nama jabatan tidak boleh kosong.!
                  </Form.Control.Feedback>
                </Form.Group>
                <Row className="col-md-5 mx-auto">
                  <Col>
                    <Link to="/masterjabatan">
                      <Button variant="primary">Batal</Button>
                    </Link>
                  </Col>
                  <Col>
                    <Button variant="primary" type="submit">
                      Update
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
export default Editjabatan;
