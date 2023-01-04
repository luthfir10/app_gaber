import { useState } from "react";
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

import Listabsen from "./Listabsen";

const Masterabsen = () => {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [dataabsen, setDataabsen] = useState([]);
  const [tabelAbsen, setTabelAbsen] = useState(false);
  const navigate = useNavigate();

  const [validation, setValidation] = useState({});

  const showAbsen = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `http://localhost:5000/absen/${bulan}&${tahun}`
    );
    setDataabsen(response.data.result);
    console.log(response.data.result);
    console.log(bulan);
    console.log(tahun);
    setTabelAbsen(true);
  };
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow-sm">
              <Card.Body>
                <Card.Title>Absen</Card.Title>
                <Container>
                  <Row>
                    <Col sm={10}>
                      {validation.errors && (
                        <Alert variant="danger">
                          <ul class="mt-0 mb-0">
                            {validation.errors.map((error, index) => (
                              <li key={index}>{`${error.msg}`}</li>
                            ))}
                          </ul>
                        </Alert>
                      )}
                      <form onSubmit={showAbsen}>
                        <Form.Group className="mb-3">
                          <Form.Label>Bulan</Form.Label>
                          <Form.Select
                            onChange={(e) => setBulan(e.target.value)}
                            required
                          >
                            <option value="">Pilih Bulan</option>
                            <option value="01">Januari</option>
                            <option value="02">Februari</option>
                            <option value="03">Maret</option>
                            <option value="04">April</option>
                            <option value="05">Mei</option>
                            <option value="06">Juni</option>
                            <option value="07">Juli</option>
                            <option value="08">Agustus</option>
                            <option value="09">September</option>
                            <option value="10">Oktober</option>
                            <option value="11">November</option>
                            <option value="12">Desember</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Tahun</Form.Label>
                          <Form.Control
                            type="text"
                            value={tahun}
                            onChange={(e) => setTahun(e.target.value)}
                            placeholder="Tahun"
                            minLength="4"
                            maxLength="4"
                            required
                          />
                        </Form.Group>

                        <Row className="col-md-5 mx-auto">
                          <Col>
                            <Link to="/masterabsen">
                              <Button variant="primary">Check</Button>
                            </Link>
                          </Col>
                          <Col>
                            <Button variant="primary" type="submit">
                              Input Batu
                            </Button>
                          </Col>
                        </Row>
                      </form>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {tabelAbsen ? <Listabsen Dataabsen={dataabsen} /> : null}
    </>
  );
};
export default Masterabsen;
