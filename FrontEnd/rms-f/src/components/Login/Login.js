import React, { Component } from "react";
import {Button, Col, Form} from 'react-bootstrap';

export class Login extends Component{
    render(){
        return(
            <>
                <div className="container d-flex justify-content-center align-items-center loginContainer">
                
                    <Col centered>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail" size="sm">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" id="email" placeholder="Enter email" required/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" id="password" placeholder="Password" required/>
                            </Form.Group>
                         
                            <Button type="submit" id="loginBtn" className="btn btn-primary btn-block loginBtn">
                                Submit
                            </Button>       
                        </Form>
                    </Col>
                
                </div>
            </>
        )
    }
}