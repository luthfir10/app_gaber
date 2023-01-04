import { useEffect, useState } from "react";
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

const Inputpegawai = () => {
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [tgl, setTgl] = useState("");
  const [kdKelurhan, setkdKelurhan] = useState("");
  const [kdJabatan, setkdJabatan] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});

  const [datakelurahans, setDatakelurahans] = useState([]);
  const [datajabatans, setDatajabatans] = useState([]);

  useEffect(() => {
    getPenempatan();
    getJabatan();
  }, []);

  const getPenempatan = async () => {
    const response = await axios.get(`http://localhost:5000/kelurahan`);
    setDatakelurahans(response.data.result);
  };

  const getJabatan = async () => {
    const response = await axios.get(`http://localhost:5000/jabatan`);
    setDatajabatans(response.data.result);
  };

  const savePegawai = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:5000/Pegawais`, {
        nip: nip,
        nama: nama,
        kode_kelurahan: kdKelurhan,
        kode_jabatan: kdJabatan,
        tgl: tgl,
        alamat: alamat,
      })
      .then(() => {
        navigate("/masterpegawai");
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
              <Card.Title>Input Pegawai</Card.Title>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              <form onSubmit={savePegawai}>
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
                  <Form.Label>Nama Pegawai</Form.Label>
                  <Form.Control
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    type="text"
                    placeholder="Nama Pegawai"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control
                    value={tgl}
                    onChange={(e) => setTgl(e.target.value)}
                    type="date"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Penempatan Kerja</Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => setkdKelurhan(e.target.value)}
                  >
                    <option value="">Pilih Penempatan</option>
                    {datakelurahans.map((datapenempatan) => (
                      <option
                        key={datapenempatan.id}
                        value={datapenempatan.kode}
                      >
                        {datapenempatan.nama}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Jabatan</Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => setkdJabatan(e.target.value)}
                  >
                    <option value="">Pilih Jabatan</option>
                    {datajabatans.map((datajabatan) => (
                      <option key={datajabatan.id} value={datajabatan.kode}>
                        {datajabatan.nama}
                      </option>
                    ))}
                  </Form.Select>
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
                    <Link to="/masterpegawai">
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
export default Inputpegawai;
