import React, { useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import Listdatapegawai from "./Listdatapegawai";
import pdfPegawai from "./pdfPegawai";

const ReportPegawai = () => {
  const [validation, setValidation] = useState({});
  const [alertshow, setAlertShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [notinfo, setNotinfo] = useState("warning");

  const generetPdf = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/pegawais`
      );
      pdfPegawai(response.data.result);
      setValidated(false);
    } catch (error) {
      notifError(error.response);
    }
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
            <Card.Header>Report Pegawai</Card.Header>
            <Card.Body>
              {alertshow && (
                <Alert
                  variant={notinfo}
                  onClose={() => setAlertShow(false)}
                  dismissible
                >
                  {validation.data.message}
                </Alert>
              )}
              <Button onClick={generetPdf} variant="outline-primary">
                Generate PDF
              </Button>
              <Listdatapegawai />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ReportPegawai;
