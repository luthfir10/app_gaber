import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import MyPagination from "../assest/MyPagination";

import Table from "react-bootstrap/Table";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Listpegawai = () => {
  const [datapegawais, setDatapegawais] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  const [show, setShow] = useState(false);
  const [datadelete, setDatadelete] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setDatadelete(id);
  };

  useEffect(() => {
    fetchData();
  }, [page, keyword, limit]);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:5000/pegawais?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setDatapegawais(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalpage);
    setRows(response.data.totalRows);
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
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
    setKeyword(query);
  };

  const deletePegawai = async (nip) => {
    try {
      await axios.delete(`http://localhost:5000/pegawais/${nip}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
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
                    <th>Tanggal Lahir</th>
                    <th colSpan={2}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {datapegawais.map((datapegawai, index) => (
                    <tr key={datapegawai.nip}>
                      <td align="center">{index + 1}</td>
                      <td>{datapegawai.nip}</td>
                      <td>{datapegawai.nama}</td>
                      <td>{datapegawai.tgl}</td>
                      <td align="center">
                        <Link to={`/masterpegawai/edit/${datapegawai.nip}`}>
                          <Button variant="outline-warning">Edit</Button>
                        </Link>
                      </td>
                      <td align="center">
                        <Button
                          variant="outline-danger"
                          onClick={() => handleShow(datapegawai)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Alert variant="light">
                Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
              </Alert>

              <Alert variant="danger" show={false}>
                {msg}
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
            Close
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              deletePegawai(datadelete.nip);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Listpegawai;
