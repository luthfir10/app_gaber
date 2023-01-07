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

const Editpegawai = () => {
  const [nama, setNama] = useState("");
  const [tgl, setTgl] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kodeJabatan, setkodeJabatan] = useState("");
  const [gol, setGol] = useState("");
  const [namaJabatan, setnamaJabatan] = useState("");
  const [kodeKelurahan, setkodeKelurahan] = useState("");
  const [namaKelurahan, setnamaKelurahan] = useState("");
  const navigate = useNavigate();
  const { nip } = useParams();
  const [validation, setValidation] = useState({});

  const [datakelurahans, setDatakelurahans] = useState([]);
  const [datajabatans, setDatajabatans] = useState([]);

  useEffect(() => {
    getPegawaiById();
    getPenempatan();
    getJabatan();
  }, []);

  const getPegawaiById = async () => {
    const response = await axios.get(`http://localhost:5000/pegawais/${nip}`);
    const data = await response.data.result;
    console.log(nip);
    setNama(data.nama);
    setTgl(data.tgl);
    setAlamat(data.alamat);
    setkodeJabatan(data.kode_jabatan);
    setnamaJabatan(data.jabatan.nama);
    setkodeKelurahan(data.kode_kelurahan);
    setnamaKelurahan(data.kelurahan.nama);
  };

  const getPenempatan = async () => {
    const response = await axios.get(`http://localhost:5000/kelurahan`);
    setDatakelurahans(response.data.result);
  };

  const getJabatan = async () => {
    const response = await axios.get(`http://localhost:5000/jabatan`);
    setDatajabatans(response.data.result);
  };

  const updatePegawai = async (e) => {
    e.preventDefault();
    await axios
      .patch(`http://localhost:5000/pegawais/${nip}`, {
        nama: nama,
        tgl: tgl,
        kode_kelurahan: kodeKelurahan,
        gol: gol,
        kode_jabatan: kodeJabatan,
        alamat: alamat,
      })
      .then(() => {
        navigate("/masterpegawai");
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
              <Card.Title>Edit Pegawai</Card.Title>
              {validation.errors && (
                <Alert variant="danger">
                  <ul class="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.param} : ${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}
              <form onSubmit={updatePegawai}>
                <Form.Group className="mb-3">
                  <Form.Label>NIP</Form.Label>
                  <Form.Control
                    value={nip}
                    type="text"
                    placeholder="NIP Pegawai"
                    minLength="18"
                    maxLength="18"
                    disabled
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
                  <Form.Label>Jabatan</Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => setkodeJabatan(e.target.value)}
                  >
                    <option value={kodeJabatan}>{namaJabatan}</option>
                    {datajabatans.map((datajabatan) => (
                      <option key={datajabatan.kode} value={datajabatan.kode}>
                        {datajabatan.nama}
                      </option>
                    ))}
                  </Form.Select>
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
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Penempatan Kerja</Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => setkodeKelurahan(e.target.value)}
                  >
                    <option value={kodeKelurahan}>{namaKelurahan}</option>
                    {datakelurahans.map((datapenempatan) => (
                      <option
                        key={datapenempatan.kode}
                        value={datapenempatan.kode}
                      >
                        {datapenempatan.nama}
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
export default Editpegawai;
