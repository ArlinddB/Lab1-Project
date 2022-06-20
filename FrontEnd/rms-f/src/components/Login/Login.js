import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Redirect } from "react-router";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(false);


  const loginUser = async (e) => {
    e.preventDefault();

    const response = await fetch('https://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 
        'Accept':'application/json',
        'Content-Type':'application/json'
        },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    const content = await response.json();
    const txt = "Invalid credentials"

    if(content === txt){
      alert(content);
      setRedirect(false);
    }
    else{
      setRedirect(true);
    }
  };


  const data ={
    email: email,
    password: password
  }

  if(redirect){
    return <Redirect push to="/dashboard" />
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center loginContainer">
        <Col>
          <Form onSubmit={loginUser}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              id="loginBtn"
              className="btn btn-primary btn-block loginBtn"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </div>
    </>
  );
}
export default Login;
