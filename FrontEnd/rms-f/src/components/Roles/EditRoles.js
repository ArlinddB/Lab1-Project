import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";

function EditRoles(props) {   

  const [ajdi] = useState(props.ajdi);



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const [roleName, setRoleName] = useState({});

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }


  useEffect(async () => {
    const response = await axios.get(
      `https://localhost:5001/api/Roles/${ajdi}`, config
    );
    setRoleName(response.data);
  }, []);

  console.log(roleName);

  const editRole = async () => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/Roles/${ajdi}`,
        {
          roleName
        }, config
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      
      {roleName && (
        <>
          <Button variant="primary" onClick={handleShow}>
            Edit
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Role
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row onSubmit={editRole}> 
                <Col>
                  <Form>
                  <Form.Group controlId="RoleId">
                      <Form.Label>Role Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="roleId"
                        type="text"
                        placeholder="Role Id"
                    />
                    </Form.Group>
                    <Form.Group controlId="RoleName">
                      <Form.Label>Role Name</Form.Label>
                      <Form.Control
                        value={roleName.roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        name="roleName"
                        type="text"
                        placeholder="Role Name"
                        
                    />
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Update Role
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
      )}
    </>
  );
}

export default EditRoles;
