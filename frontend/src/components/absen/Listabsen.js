import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assest/fontawesome";

import Table from "react-bootstrap/Table";
import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Listabsen = ({ Dataabsen }) => {
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
                        {Dataabsen.map((datajabatan, index) => (
                          <tr key={datajabatan.nip} style={{ fontSize: 13 }}>
                            <td>{datajabatan.nama}</td>
                            <td>{datajabatan.nip}</td>
                            <td>
                              <Form.Control
                                type="number"
                                min={0}
                                placeholder="TPP"
                              />
                            </td>
                            <td>
                              <Form.Control type="number" placeholder="" />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                            <td>
                              <Form.Control
                                size="sm"
                                type="number"
                                placeholder=""
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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
