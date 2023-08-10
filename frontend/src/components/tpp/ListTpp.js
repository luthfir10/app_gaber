import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Table from "react-bootstrap/Table";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { NumericFormat } from "react-number-format";

const ListTpp = ({ DataTpp }) => {
  const [absenLengkapTpp, setAbsenLengkapTpp] = useState(DataTpp);
  const navigate = useNavigate();
  const [validation, setValidation] = useState({});

  const handleApiTpp = async (e) => {
    e.preventDefault();
    let newarraytpp = absenLengkapTpp.map(function (item) {
      item["gol"] = item.pegawai.gol;
      item["jabatan"] = item.pegawai.jabatan.nama;
      delete item.pegawai;
      return item;
    });

    await axios
      .post(`${process.env.REACT_APP_API_URL}/tpp`, {
        newarraytpp,
      })
      .then(() => {
        navigate("/tpp");
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  const changeJumTpp = (index) => (e) => {
    const myAbsenNext = [...absenLengkapTpp];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.saldo_tpp = e.value;
    setAbsenLengkapTpp(myAbsenNext);
  };

  const changeSos = (index) => (e) => {
    const myAbsenNext = [...absenLengkapTpp];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.iur_sos = e.value;
    setAbsenLengkapTpp(myAbsenNext);
  };

  const changePtLl = (index) => (e) => {
    const myAbsenNext = [...absenLengkapTpp];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.pemot_ll = e.value;
    setAbsenLengkapTpp(myAbsenNext);
  };

  const changeSkp = (index) => (e) => {
    const myAbsenNext = [...absenLengkapTpp];
    const databaru = myAbsenNext.find((a) => a.nip === index);
    databaru.nilskp = e.target.value;
    setAbsenLengkapTpp(myAbsenNext);
  };

  useEffect(() => {}, []);

  return (
    <Container className="mt-3" fluid>
      <Row>
        <Col md={12}>
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <Card.Title>Proses TPP</Card.Title>
              <Container className="mt-3" fluid>
                <Row>
                  <Col sm={12}>
                    <form onSubmit={handleApiTpp}>
                      <Row className="col-md-5 mx-auto">
                        <Col>
                          <Link to="/tpp/proses/absen">
                            <Button variant="primary">Cencel</Button>
                          </Link>
                        </Col>
                        <Col>
                          <Button variant="primary" type="submit">
                            Save
                          </Button>
                        </Col>
                      </Row>

                      <Table striped bordered hover responsive>
                        <thead align="center">
                          <tr>
                            <th>Nama</th>
                            <th>NIP</th>
                            <th>Jabatan</th>
                            <th>Golongan</th>
                            <th>Jumlah Tambahan Penghasilan Pegawai</th>
                            <th>Iuran Sosial</th>
                            <th>Pemotongan Lain Lain</th>
                            <th>Nilai SKP</th>
                          </tr>
                        </thead>
                        <tbody>
                          {absenLengkapTpp.map((datalistTpp, index) => (
                            <tr key={index}>
                              <td>{datalistTpp.pegawai.nama}</td>
                              <td>{datalistTpp.nip}</td>
                              <td>{datalistTpp.pegawai.jabatan.nama}</td>
                              <td>{datalistTpp.pegawai.gol}</td>
                              <td>
                                <NumericFormat
                                  className="form-control"
                                  decimalScale={0}
                                  decimalSeparator="."
                                  thousandSeparator={true}
                                  onValueChange={changeJumTpp(datalistTpp.nip)}
                                />
                              </td>
                              <td>
                                <NumericFormat
                                  className="form-control"
                                  decimalScale={0}
                                  decimalSeparator="."
                                  thousandSeparator={true}
                                  onValueChange={changeSos(datalistTpp.nip)}
                                />
                              </td>
                              <td>
                                <NumericFormat
                                  className="form-control"
                                  decimalScale={0}
                                  decimalSeparator="."
                                  thousandSeparator={true}
                                  onValueChange={changePtLl(datalistTpp.nip)}
                                />
                              </td>
                              <td>
                                <Form.Control
                                  name="skp"
                                  type="number"
                                  value={datalistTpp.nilskp}
                                  min={0}
                                  onChange={changeSkp(datalistTpp.nip)}
                                  placeholder="0"
                                />
                              </td>

                              {/* <td>
                                <Form.Control
                                  name="psj4"
                                  type="number"
                                  value={datajabatan.psj4}
                                  min={0}
                                  onChange={changePsj4(datajabatan.nip)}
                                  placeholder="0"
                                />
                              </td> */}
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
export default ListTpp;
