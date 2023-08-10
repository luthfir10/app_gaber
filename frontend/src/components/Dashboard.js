import React from "react";
import moment from "moment";
import { Card, Container, Row, Col } from "react-bootstrap";
import useAuth from "../services/hooks/useAuth";

const Dashboard = () => {
  const { auth } = useAuth();

  const dateTime = new Date();
  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Header>Dashboard</Card.Header>
            <Card.Body>
              <h1>Selamat datang.. {auth ? auth.name : ""}</h1>
              <p>Anda mengakses Roles {auth ? auth.roles : ""}</p>
              <p>{moment(dateTime).format("ll")}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;
