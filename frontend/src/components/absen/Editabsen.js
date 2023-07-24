import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Table from "react-bootstrap/Table";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Editabsen = ({ Dataabsen }) => {
  const [absenLengkap, setAbsenLengkap] = useState(Dataabsen);
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});
  const [alertshow, setAlertShow] = useState(false);
  const [notinfo, setNotinfo] = useState("warning");

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

  const handleApiabsen = async (e) => {
    e.preventDefault();
    let newarrayabsn = absenLengkap.map(function (item) {
      delete item.pegawai.nip;
      return item;
    });

    await axios
      .patch(`${process.env.REACT_APP_API_URL}/absen`, {
        newarrayabsn,
      })
      .then((res) => {
        notifSukses(res);
      })
      .catch((error) => {
        notifError(error.response);
      });
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

  return (
    <Container className="mt-3" fluid>
      <Row>
        <Col md={12}>
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <Card.Title>Edit Absen</Card.Title>
              <Container fluid>
                <Row>
                  {alertshow && (
                    <Alert
                      variant={notinfo}
                      onClose={() => setAlertShow(false)}
                      dismissible
                    >
                      {validation.data.message}
                    </Alert>
                  )}
                  <Col sm={12}>
                    <form
                      className="d-flex flex-column my-5 col-sm-12 col-md-6 form-control"
                      onSubmit={handleApiabsen}
                    >
                      <Row className="col-md-5 mx-auto">
                        <Col>
                          <Link to="/dashboard">
                            <Button variant="primary">Batal</Button>
                          </Link>
                        </Col>
                        <Col>
                          <Button variant="primary" type="submit">
                            Update
                          </Button>
                        </Col>
                      </Row>

                      <Table striped bordered hover responsive>
                        <thead align="center">
                          <tr>
                            <th rowSpan="2">Nama</th>
                            <th rowSpan="2">NIP</th>
                            <th rowSpan="2">Tanpa Keterangan</th>
                            <th rowSpan="2" style={{ width: 70 }}>
                              Tidak Apel
                            </th>
                            <th rowSpan="2">Tidak Senam / Wirid</th>
                            <th colSpan="4">Terlambat datang (menit)</th>
                            <th colSpan="4">Pulang sebelum jam kantor</th>
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
                              <td>{datajabatan.pegawai.nama}</td>
                              <td>{datajabatan.nip}</td>
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
export default Editabsen;
