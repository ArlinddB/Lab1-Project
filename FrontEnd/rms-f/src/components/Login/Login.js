import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://localhost:5001/api/Authenticate/login/", {
        ...input,
      });
      localStorage.setItem("token", res.data.token);
      history.push("/dashboard");
      window.location.reload()
    } catch (err) {
      alert("Incorrect email/passsword");
    }
  };
  

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center loginContainer">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              type="submit"
              id="loginBtn"
              className="btn btn-primary btn-block loginBtn"
            >
              Login
            </Button>
          </Form>
        </Col>
        
      </div>
    </>
  );
};
export default Login;