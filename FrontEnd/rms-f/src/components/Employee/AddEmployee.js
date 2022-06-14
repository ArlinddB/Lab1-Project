import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function AddEmployee() {
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [e_name, setE_name] = useState();
    const [e_username, setE_username] = useState();
    const [e_password, setE_password] = useState();
    const [e_phone, setE_phone] = useState();
    const [e_address, setE_address] = useState();
    const [dateOfJoining, setDateOfJoining] = useState();
    const [roleId, setRoleId] = useState();


    const addEmp = async () => {
      try {
        const response = await axios.post("https://localhost:5001/api/employee/", {
          e_name,
          e_username,
          e_password,
          e_phone,
          e_address,
          dateOfJoining,
          roleId,
        });
      } catch (err) {
        alert(err);
      }
    };

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Add Employee
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addEmp}>
                <Form.Group controlId="EmpName">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmpName"
                    onChange={(e) => setE_name(e.target.value)}
                    required
                    placeholder="Employee Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="EmpUsername">
                  <Form.Label>Employee Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmpUsername"
                    onChange={(e) => setE_username(e.target.value)}
                    required
                    placeholder="Employee Username"
                  />
                </Form.Group>

                <Form.Group controlId="EmpPassword">
                  <Form.Label>Employee Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmpPassword"
                    onChange={(e) => setE_password(e.target.value)}
                    required
                    placeholder="Employee Password"
                  />
                </Form.Group>

                <Form.Group controlId="EmpPhone">
                  <Form.Label>Employee Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmpPhone"
                    onChange={(e) => setE_phone(e.target.value)}
                    required
                    placeholder="Employee Phone"
                  />
                </Form.Group>

                <Form.Group controlId="EmpAddress">
                  <Form.Label>Employee Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmpAddress"
                    onChange={(e) => setE_address(e.target.value)}
                    required
                    placeholder="Employee Address"
                  />
                </Form.Group>

                <Form.Group controlId="EmpDoj">
                  <Form.Label>Date of joining</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmpDoj"
                    onChange={(e) => setDateOfJoining(e.target.value)}
                    required
                    placeholder="Date of joining"
                  />
                </Form.Group>

                <Form.Group controlId="EmpRoleId">
                  <Form.Label>Role Id</Form.Label>
                  <Form.Control
                    type="text"
                    name="EmpRoleId"
                    onChange={(e) => setRoleId(e.target.value)}
                    required
                    placeholder="Role Id"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Employee
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 
      </>
  );
}
export default AddEmployee;
