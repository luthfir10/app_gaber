import React from "react";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getMe } from "../../features/authSlice";

import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Listkelurahan from "./Listkelurahan";

const Masterkelurahan = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { isError } = useSelector((state) => state.auth);

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Header>Master Kecamatan / Kelurahan</Card.Header>
            <Card.Body>
              <Link to="add">
                <Button variant="outline-primary">Tambah Baru</Button>
              </Link>
              <Listkelurahan />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Masterkelurahan;
