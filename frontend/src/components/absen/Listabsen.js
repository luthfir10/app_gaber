import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assest/fontawesome";

import Table from "react-bootstrap/Table";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Listabsen = ({ Dataabsen }) => {
  const [absenLengkap, setAbsenLengkap] = useState(Dataabsen);
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});

  const handleApiabsen = async (e) => {
    e.preventDefault();
    let newarrayabsn = absenLengkap.map(function (item) {
      delete item.nama;
      return item;
    });

    await axios
      .post(`http://localhost:5000/absen`, {
        newarrayabsn,
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  const changeJumTpp = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.jum_tpp = e.target.value;
    setAbsenLengkap(myAbsenNext);
    console.log(absenLengkap);
  };

  const changeTk = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.tk = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changeTa = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.ta = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changeTms = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.tms = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changeTd1 = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.td1 = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changeTd2 = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.td2 = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changeTd3 = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.td3 = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changeTd4 = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.td4 = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changePsj1 = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.psj1 = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changePsj2 = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.psj2 = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changePsj3 = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.psj3 = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changePsj4 = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.psj4 = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  const changeClt = (index) => (e) => {
    const myAbsenNext = [...absenLengkap];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.clt = e.target.value;
    setAbsenLengkap(myAbsenNext);
  };

  useEffect(() => {}, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={12}>
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <Card.Title>Input Absen</Card.Title>
              <Container>
                <Row>
                  <Col sm={12}>
                    <form onSubmit={handleApiabsen}>
                      <Col>
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
                      </Col>
                      <Table striped bordered hover responsive>
                        <thead align="center">
                          <tr>
                            <th rowSpan="2">Nama</th>
                            <th rowSpan="2">NIP</th>
                            <th rowSpan="2" style={{ width: 150 }}>
                              Jumlah Tambahan Penghasilan Pegawai
                            </th>
                            <th rowSpan="2">Tanpa Keterangan</th>
                            <th rowSpan="2" style={{ width: 70 }}>
                              Tidak Apel
                            </th>
                            <th rowSpan="2">Tidak Senam / Wirid</th>
                            <th colSpan="4">Terlambat datang (menit)</th>
                            <th colSpan="4">Pulang sebelum jam kantor</th>
                            <th rowSpan="2">Cuti lebih dari 3 minggu</th>
                          </tr>
                          <tr>
                            <th style={{ width: 70 }}>1 s/d 30</th>
                            <th style={{ width: 70 }}>31 s/d 60</th>
                            <th style={{ width: 70 }}>61 s/d 90</th>
                            <th style={{ width: 70 }}>91 s/d tidak absen</th>
                            <th style={{ width: 70 }}>1 s/d 30</th>
                            <th style={{ width: 70 }}>31 s/d 60</th>
                            <th style={{ width: 70 }}>61 s/d 90</th>
                            <th style={{ width: 70 }}>91 s/d tidak absen</th>
                          </tr>
                        </thead>
                        <tbody>
                          {absenLengkap.map((datajabatan, index) => (
                            <tr key={index} style={{ fontSize: 13 }}>
                              <td>{datajabatan.nama}</td>
                              <td>{datajabatan.nip}</td>
                              <td>
                                <Form.Control
                                  name="jum_tpp"
                                  type="number"
                                  value={datajabatan.jum_tpp}
                                  min={0}
                                  onChange={changeJumTpp(datajabatan.nip)}
                                  placeholder="0"
                                  required
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="tk"
                                  type="number"
                                  value={datajabatan.tk}
                                  min={0}
                                  onChange={changeTk(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="ta"
                                  type="number"
                                  value={datajabatan.ta}
                                  min={0}
                                  onChange={changeTa(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="tms"
                                  type="number"
                                  value={datajabatan.tms}
                                  min={0}
                                  onChange={changeTms(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="td1"
                                  type="number"
                                  value={datajabatan.td1}
                                  min={0}
                                  onChange={changeTd1(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="td2"
                                  type="number"
                                  value={datajabatan.td2}
                                  min={0}
                                  onChange={changeTd2(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="td3"
                                  type="number"
                                  value={datajabatan.td3}
                                  min={0}
                                  onChange={changeTd3(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="td4"
                                  type="number"
                                  value={datajabatan.td4}
                                  min={0}
                                  onChange={changeTd4(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="psj1"
                                  type="number"
                                  value={datajabatan.psj1}
                                  min={0}
                                  onChange={changePsj1(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="psj2"
                                  type="number"
                                  value={datajabatan.psj2}
                                  min={0}
                                  onChange={changePsj2(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="psj3"
                                  type="number"
                                  value={datajabatan.psj3}
                                  min={0}
                                  onChange={changePsj3(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="psj4"
                                  type="number"
                                  value={datajabatan.psj4}
                                  min={0}
                                  onChange={changePsj4(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="clt"
                                  type="number"
                                  value={datajabatan.clt}
                                  min={0}
                                  onChange={changeClt(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </form>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Listabsen;
