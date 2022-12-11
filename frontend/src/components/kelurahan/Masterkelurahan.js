import { Link } from "react-router-dom";

import { Card, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Listkelurahan from "./Listkelurahan";

const Masterkelurahan = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col md="{12}">
          <Card className="border-0 rounded shadow-sm">
            <Card.Header>Master Kecamatan / Kelurahan</Card.Header>
            <Card.Body>
              <Link to="/masterkelurahan/add">
                <Button variant="outline-primary">Add New</Button>
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
