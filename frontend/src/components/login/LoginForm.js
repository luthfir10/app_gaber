import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import useAuth from "../../services/hooks/useAuth";

import bg_Login from "../../assest/images/data-science.png";
import back_login from "../../assest/images/back_login.png";
import logo from "../../assest/images/logo_padang.png";

import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import SpinnerButton from "../atoms/SpinnerButton";

const LoginForm = () => {
  const [isLoading, setisLoading] = useState(false);
  const { setAuth } = useAuth();
  const [msg, setMsg] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [notinfo, setNotinfo] = useState("warning");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/tpp";
  const frompegawai = location.state?.from?.pathname || "/app";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          username: username,
          password: password,
        }
      );
      const accessToken = response?.data?.uuid;
      const roles = [response?.data?.role];
      const user = response.data.username;
      const name = response.data.namauser;
      setAuth({ user, name, roles, accessToken });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (
        response.data.role === "pranata komputer" ||
        response.data.role === "bendahara" ||
        response.data.role === "camat"
      ) {
        navigate(from, { replace: true });
      } else if (response.data.role === "pegawai") {
        navigate(frompegawai, { replace: true });
      }
    } catch (error) {
      if (!error.response) {
        allertPop("Server No Response");
      } else {
        allertPop(error.response.data.message);
      }
    } finally {
      setisLoading(false);
    }
  };

  const allertPop = (e) => {
    setMsg(e);
    setAlertShow(true);
    setTimeout(() => {
      setAlertShow(false);
    }, 3500);
  };

  return (
    <Container className="my-8">
      <Card
        className="bg-transparent"
        style={{
          borderRadius: "1rem",
          border: "none",
        }}
      >
        <Row className="g-0 d-flex">
          <Col md="8">
            <img
              src={bg_Login}
              alt="side login"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
              style={{
                maxWidth: "100%",
                borderRadius: "1rem",
              }}
            />
          </Col>
          <Col md="4">
            <Card
              className="h-100"
              style={{
                borderRadius: "1rem",
                backgroundImage: `url(${back_login})`,
              }}
            >
              <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <Card
                    className="bg-transparent align-items-center"
                    style={{ border: "none" }}
                  >
                    <img
                      src={logo}
                      alt="side login"
                      style={{
                        maxWidth: "20%",
                      }}
                    />
                  </Card>
                  <h2 className="mb-2 p-3 text-center">Login SITPP</h2>
                  {alertShow && (
                    <Alert
                      variant={notinfo}
                      onClose={() => setAlertShow(false)}
                      dismissible
                    >
                      {msg}
                    </Alert>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Email address"
                      size="lg"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      size="lg"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="mx-2 px-5"
                    color="white"
                    size="lg"
                  >
                    {isLoading ? <SpinnerButton /> : "Login"}
                  </Button>

                  <div className="d-flex flex-row mt-3 mb-5"></div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default LoginForm;
