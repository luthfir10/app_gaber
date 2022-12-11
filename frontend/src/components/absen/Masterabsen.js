import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Masterabsen = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              <Card.Title>Master Absen</Card.Title>
              <Link to="/addpegawai">
                <Button variant="outline-primary">Add New</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Masterabsen;
