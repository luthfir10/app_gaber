import { useState, useEffect } from "react";
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

import Listabsen from "./Listabsen";
import Editabsen from "./Editabsen";

const Masterabsen = () => {
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [dataabsen, setDataabsen] = useState([]);
  const [tabelAbsen, setTabelAbsen] = useState(false);
  const [Dataedit, setDataedit] = useState([]);
  const [tabelEdit, setTabelEdit] = useState(false);
  const [disaktif, setDisaktif] = useState(false);
  const navigate = useNavigate();

  const [validation, setValidation] = useState({});
  const [alertshow, setAlertShow] = useState(false);
  const [notinfo, setNotinfo] = useState("warning");

  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const gantiAbsen = dataabsen.map((i) => {
    i["bulan"] = bulan;
    i["tahun"] = tahun;
    i["tk"] = 0;
    i["ta"] = 0;
    i["tms"] = 0;
    i["td1"] = 0;
    i["td2"] = 0;
    i["td3"] = 0;
    i["td4"] = 0;
    i["psj1"] = 0;
    i["psj2"] = 0;
    i["psj3"] = 0;
    i["psj4"] = 0;
    return i;
  });

  const showAbsen = async (e) => {
    e.preventDefault();
    await axios
      .get(`${process.env.REACT_APP_API_URL}/absen/${bulan}&${tahun}`)
      .then((res) => {
        setDataabsen(res.data.result);
        setTabelEdit(false);
        setTabelAbsen(true);
        setDisaktif(true);
      })
      .catch((error) => {
        notifError(error.response);
      });
  };

  const EditAbsen = async () => {
    if (bulan === "" || tahun === "") {
      notifError({
        data: {
          message: "Harap Mengisi Bulan dan tahun",
        },
      });
    } else {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/absen/edit/${bulan}&${tahun}`)
        .then((res) => {
          setDataedit(res.data.result);
          console.log(res.data.result);
          setTabelAbsen(false);
          setTabelEdit(true);
        })
        .catch((error) => {
          notifError(error.response);
        });
    }
  };

  const handeleHapus = async () => {
    if (bulan === "" || tahun === "") {
      notifError({
        data: {
          message: "Harap Mengisi Bulan dan tahun",
        },
      });
    } else {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/absen/${bulan}&${tahun}`)
        .then((res) => {
          notifSukses(res);
        })
        .catch((error) => {
          notifError(error.response);
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
      navigate("/dashboard");
    }, 3000);
  };
  const notifError = (e) => {
    setNotinfo("danger");
    setValidation(e);
    setAlertShow(true);
    setTimeout(() => {
      setAlertShow(false);
      setValidation({});
    }, 4000);
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
                      {alertshow && (
                        <Alert
                          variant={notinfo}
                          onClose={() => setAlertShow(false)}
                          dismissible
                        >
                          {validation.data.message}
                        </Alert>
                      )}
                      <form onSubmit={showAbsen}>
                        <Form.Group className="mb-3">
                          <Form.Label>Bulan</Form.Label>
                          <Form.Select
                            value={bulan}
                            onChange={(e) => setBulan(e.target.value)}
                            required
                          >
                            <option value="">Pilih Bulan</option>
                            <option value="1">Januari</option>
                            <option value="2">Februari</option>
                            <option value="3">Maret</option>
                            <option value="4">April</option>
                            <option value="5">Mei</option>
                            <option value="6">Juni</option>
                            <option value="7">Juli</option>
                            <option value="8">Agustus</option>
                            <option value="9">September</option>
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

                        <Row>
                          <Col>
                            <Link to="/masterabsen">
                              <Button variant="primary" onClick={EditAbsen}>
                                Edit
                              </Button>
                            </Link>
                          </Col>
                          <Col>
                            <Button variant="primary" type="submit">
                              Input
                            </Button>
                          </Col>
                          <Col>
                            <Button variant="primary" onClick={handeleHapus}>
                              Hapus
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
      {tabelAbsen ? <Listabsen Dataabsen={gantiAbsen} /> : null}
      {tabelEdit ? <Editabsen Dataabsen={Dataedit} /> : null}
    </>
  );
};
export default Masterabsen;
