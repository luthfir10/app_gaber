import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import MyPagination from "../../assest/MyPagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assest/styles/fontawesome";

import Table from "react-bootstrap/Table";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import SpinnerButton from "../atoms/SpinnerButton";

const Listpegawai = () => {
  const [isLoading, setisLoading] = useState(false);
  const [datapegawais, setDatapegawais] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");

  const [show, setShow] = useState(false);
  const [datadelete, setDatadelete] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setDatadelete(id);
  };

  const [alertshow, setAlertShow] = useState(false);
  const [notinfo, setNotinfo] = useState("warning");
  const [validation, setValidation] = useState({});

  useEffect(() => {
    fetchData();
  }, [page, keyword, limit]);

  const fetchData = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/pegawais?search_query=${keyword}&page=${page}&limit=${limit}`
      );
      setDatapegawais(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalpage);
      setRows(response.data.totalRows);
    } catch (error) {
    } finally {
      setisLoading(false);
    }
  };

  const clikLimit = (e) => {
    setLimit(e.target.value);
  };

  const changePage = useCallback((page) => {
    setPage(page);
  }, []);

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    if (rows === 0) {
      notifError({
        data: {
          message:
            "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!",
        },
      });
    } else {
      setValidation("");
    }
    setKeyword(query);
  };

  const deletePegawai = async (nip) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/pegawais/${nip}`)
      .then((res) => {
        fetchData();
        notifSukses(res);
      })
      .catch((error) => {
        notifError(error.response);
      });
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
              <Card.Title>List Data Pegawai</Card.Title>
              <Container>
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
                  <Col sm={10}>
                    <Form className="d-flex" onSubmit={searchData}>
                      <Form.Control
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      <Button type="submit" variant="outline-success">
                        Search
                      </Button>
                    </Form>
                  </Col>
                  <Col sm={2}>
                    <Form>
                      <Form.Group>
                        <Form.Select onChange={clikLimit}>
                          <option>Show Rows</option>
                          {(() => {
                            let pilihan = [];
                            for (let i = 1; i < 10; i++) {
                              let tot = i * 10;
                              pilihan.push(
                                <option key={tot} value={tot}>
                                  {tot}
                                </option>
                              );
                            }
                            return pilihan;
                          })()}
                        </Form.Select>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Container>

              <Table striped bordered hover responsive>
                <thead align="center">
                  <tr>
                    <th>#</th>
                    <th>NIP Pegawai</th>
                    <th>Nama Pegawai</th>
                    <th>Gol</th>
                    <th>Jabatan</th>
                    <th>Kelurahan</th>
                    <th>Tanggal Lahir</th>
                    <th colSpan={2}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading ? (
                    datapegawais.map((datapegawai, index) => (
                      <tr key={datapegawai.nip}>
                        <td align="center">{index + 1}</td>
                        <td>{datapegawai.nip}</td>
                        <td>{datapegawai.nama}</td>
                        <td>{datapegawai.gol}</td>
                        <td>{datapegawai.jabatan.nama}</td>
                        <td>{datapegawai.kelurahan.nama}</td>
                        <td>{datapegawai.tgl}</td>
                        <td align="center">
                          <Link to={`edit/${datapegawai.nip}`}>
                            <Button variant="outline-primary">
                              <FontAwesomeIcon
                                icon={["fa", "edit"]}
                                size="lg"
                              />
                            </Button>
                          </Link>
                        </td>
                        <td align="center">
                          <Button
                            variant="outline-danger"
                            onClick={() => handleShow(datapegawai)}
                          >
                            <FontAwesomeIcon
                              icon={["fa", "trash-alt"]}
                              size="lg"
                            />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <td colSpan={7}>
                      <SpinnerButton />
                    </td>
                  )}
                </tbody>
              </Table>
              <Alert variant="light">
                Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
              </Alert>
              {pages > 1 && (
                <MyPagination
                  total={pages}
                  current={page}
                  onChagepage={changePage}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Perhatian!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah anda yakin ingin melakukan penghapusan data
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>NIP</th>
                <th>: {datadelete.nip}</th>
              </tr>
              <tr>
                <th>Nama</th>
                <th>: {datadelete.nama}</th>
              </tr>
            </thead>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              deletePegawai(datadelete.nip);
              handleClose();
            }}
          >
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Listpegawai;
