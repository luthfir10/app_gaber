import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlice";

import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Listdatauser from "./Listdatauser";

const ReportUser = () => {
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
            <Card.Header>Report User</Card.Header>
            <Card.Body>
              <Link to="/masteruser/add">
                <Button variant="outline-primary">Generate PDF</Button>
              </Link>
              <Listdatauser />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ReportUser;
