import React from "react";
import { Link } from "react-router-dom";

import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Listuser from "./Listuser";

const Masteruser = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Header>Master User</Card.Header>
            <Card.Body>
              <Link to="add">
                <Button variant="outline-primary">Tambah Baru</Button>
              </Link>
              <Listuser />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Masteruser;
