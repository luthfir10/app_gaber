import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../../features/authSlice";
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

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
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
              class="rounded-t-5 rounded-tr-lg-0"
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
                <form onSubmit={Auth}>
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
                  {isError && <Alert variant="danger">{message}</Alert>}

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
                    {isLoading ? "Loading.." : "Login"}
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
