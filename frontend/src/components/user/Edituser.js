import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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

const Edituser = () => {
  const { uuid } = useParams();
  const [namauser, setNamauser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});

  // const dispatch = useDispatch();
  // const { isError } = useSelector((state) => state.auth);

  const [alertshow, setAlertShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [notinfo, setNotinfo] = useState("warning");

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/${uuid}`
    );
    const data = await response.data.result;
    setNamauser(data.namauser);
    setUsername(data.username);
    setRole(data.role);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      await axios
        .patch(`${process.env.REACT_APP_API_URL}/users/${uuid}`, {
          namauser: namauser,
          username: username,
          password: password,
          confPassword: confPassword,
          role: role,
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
      navigate("/tpp/master/aksesuser");
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
              <Card.Title>Input User</Card.Title>
              {alertshow && (
                <Alert
                  variant={notinfo}
                  onClose={() => setAlertShow(false)}
                  dismissible
                >
                  {validation.data.message}
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={updateUser}>
                <Form.Group className="mb-3">
                  <Form.Label>Nama User</Form.Label>
                  <Form.Control
                    value={namauser}
                    onChange={(e) => setNamauser(e.target.value)}
                    type="text"
                    placeholder="Nama User"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Nama User tidak boleh kosong.!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="email"
                    placeholder="Username"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Username tidak boleh kosong.!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="************"
                        minLength={5}
                      />
                      <Form.Control.Feedback type="invalid">
                        Password tidak boleh kosong dan minimal 5 karakter.!
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
                      <Form.Control
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        type="password"
                        placeholder="************"
                        minLength={5}
                      />
                      <Form.Control.Feedback type="invalid">
                        Confirm Password tidak boleh kosong.!
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Akses</Form.Label>
                  <Form.Select
                    value={role}
                    required
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Pilih Akses</option>
                    <option value="camat">Camat</option>
                    <option value="pranata komputer">Pranata Komputer</option>
                    <option value="bendahara">Bendahara</option>
                    <option value="pegawai">Pegawai</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Pilih Akses.!
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="col-md-5 mx-auto">
                  <Col>
                    <Link to="/tpp/master/aksesuser">
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
export default Edituser;
