import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

const Inputpegawai = () => {
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [tgl, setTgl] = useState("");
  const [kdKelurhan, setkdKelurhan] = useState("");
  const [gol, setGol] = useState("");
  const [kdJabatan, setkdJabatan] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();
  const [validation, setValidation] = useState([]);

  const [datakelurahans, setDatakelurahans] = useState([]);
  const [datajabatans, setDatajabatans] = useState([]);

  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);

  const [alertshow, setAlertShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [notinfo, setNotinfo] = useState("warning");

  useEffect(() => {
    dispatch(getMe());
    getPenempatan();
    getJabatan();
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const getPenempatan = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/kelurahan`
    );
    setDatakelurahans(response.data.result);
  };

  const getJabatan = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/jabatan`
    );
    setDatajabatans(response.data.result);
  };

  const savePegawai = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/Pegawais`, {
          nip: nip,
          nama: nama,
          kode_kelurahan: kdKelurhan,
          gol: gol,
          kode_jabatan: kdJabatan,
          tgl: tgl,
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
    setNip("");
    setNama("");
    setTgl("");
    setkdKelurhan("");
    setGol("");
    setkdJabatan("");
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
              <Card.Title>Input Pegawai</Card.Title>
              {alertshow && (
                <Alert
                  variant={notinfo}
                  onClose={() => setAlertShow(false)}
                  dismissible
                >
                  {validation.data.message}
                </Alert>
              )}
              <Form noValidate validated={validated} onSubmit={savePegawai}>
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
                  <Form.Control.Feedback type="invalid">
                    Nip tidak boleh kosong.!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Pegawai</Form.Label>
                  <Form.Control
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    type="text"
                    placeholder="Nama Pegawai"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Nama tidak boleh kosong.!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control
                    value={tgl}
                    onChange={(e) => setTgl(e.target.value)}
                    type="date"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Tanggal lahir tidak boleh kosong.!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Penempatan Kerja</Form.Label>
                  <Form.Select
                    value={kdKelurhan}
                    required
                    onChange={(e) => setkdKelurhan(e.target.value)}
                  >
                    <option value="">Pilih Penempatan</option>
                    {datakelurahans.map((datapenempatan) => (
                      <option
                        key={datapenempatan.kode}
                        value={datapenempatan.kode}
                      >
                        {datapenempatan.nama}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Penempatan kerja tidak boleh kosong.!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Golongan Pegawai</Form.Label>
                  <Form.Control
                    value={gol}
                    maxLength="10"
                    onChange={(e) => setGol(e.target.value)}
                    type="text"
                    placeholder="Golongan Pegawai"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Golongan tidak boleh kosong.!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Jabatan</Form.Label>
                  <Form.Select
                    value={kdJabatan}
                    required
                    onChange={(e) => setkdJabatan(e.target.value)}
                  >
                    <option value="">Pilih Jabatan</option>
                    {datajabatans.map((datajabatan) => (
                      <option key={datajabatan.kode} value={datajabatan.kode}>
                        {datajabatan.nama}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Jabatan tidak boleh kosong.!
                  </Form.Control.Feedback>
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
                  <Form.Control.Feedback type="invalid">
                    Alamat tidak boleh kosong.!
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="col-md-5 mx-auto">
                  <Col>
                    <Link to="/masterpegawai">
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
export default Inputpegawai;
