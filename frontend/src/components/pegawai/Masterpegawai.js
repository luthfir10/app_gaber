import React from "react";
import { Link } from "react-router-dom";

import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Listpegawai from "./Listpegawai";

const Masterpegawai = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Header>Master Pegawai</Card.Header>
            <Card.Body>
              <Link to="add">
                <Button variant="outline-primary">Tambah Baru</Button>
              </Link>
              <Listpegawai />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Masterpegawai;
