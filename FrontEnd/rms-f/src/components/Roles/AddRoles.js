import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";



function AddRoles() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [roleName, setRoleName] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }

  const addRole = async () => {

    try {
      const response = await axios.post("https://localhost:5001/api/Roles", {
        roleName,
      }, config);
    } catch (err) {
      alert("Something went wrong");
    }
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Role
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addRole}>
                <Form.Group controlId="RoleName">
                  <Form.Label>Role Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="roleName"
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                    placeholder="Role Name"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit" >
                    Add Role
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
export default AddRoles;
