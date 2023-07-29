import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import MyPagination from "../../../assest/MyPagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assest/styles/fontawesome";

import Table from "react-bootstrap/Table";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Listdatakelurahan = () => {
  const [datausers, setDatausers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");

  const [alertshow, setAlertShow] = useState(false);
  const [notinfo, setNotinfo] = useState("warning");
  const [validation, setValidation] = useState({});

  useEffect(() => {
    fetchData();
  }, [page, keyword, limit]);

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/kelurahan?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setDatausers(response.data.result);
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
              <Card.Title>Report Data Kecamatan/Kelurahan</Card.Title>
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
                    <th>Kode</th>
                    <th>Nama</th>
                    <th>Alamat</th>
                  </tr>
                </thead>
                <tbody>
                  {datausers.map((datauser, index) => (
                    <tr key={datauser.kode}>
                      <td align="center">{index + 1}</td>
                      <td>{datauser.kode}</td>
                      <td>{datauser.nama}</td>
                      <td>{datauser.alamat}</td>
                    </tr>
                  ))}
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
    </Container>
  );
};
export default Listdatakelurahan;
