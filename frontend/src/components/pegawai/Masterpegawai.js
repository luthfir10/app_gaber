import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/authSlice";

import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Listpegawai from "./Listpegawai";

const Masterpegawai = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Header>Master Pegawai</Card.Header>
            <Card.Body>
              <Link to="/masterpegawai/add">
                <Button variant="outline-primary">Add New</Button>
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
