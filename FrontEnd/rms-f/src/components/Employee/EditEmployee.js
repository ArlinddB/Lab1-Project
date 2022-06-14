import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";

function EditEmployee(props) {
  const [ajdi] = useState(props.ajdi);

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

  //   useEffect(async () => {
  //     const response = await axios.get(
  //       `https://localhost:5001/api/Employee/${ajdi}`
  //     );
  //     setE_name(response.data);
  //   }, []);

  const [employee, setEmployee] = useState({});


  useEffect( () => {
    axios.get(
      `https://localhost:5001/api/Employee/${ajdi}`)
      .then((response) => {
       // setE_id(response.data.e_id)
        setE_name(response.data.e_name);
        setE_username(response.data.e_username);
        setE_password(response.data.e_password);
        setE_phone(response.data.e_phone);
        setE_address(response.data.e_address);
        setDateOfJoining(response.data.dateOfJoining);
        setRoleId(response.data.roleId);
    });
  }, []);

  const data ={
    //e_id: e_id,
    e_name: e_name,
    e_username: e_username,
    e_password: e_password,
    e_phone: e_phone,
    e_address: e_address,
    dateOfJoining: dateOfJoining,
    roleId: roleId
  };


//   function editEmp() {
//       axios.put(`https://localhost:5001/api/Employee/${ajdi}`, data)
//   }

  const editEmp = async () => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/Employee/${ajdi}`, data
      );
    } catch (error) {
      console.log(error.response);
    }
  };


  return (
    <>
      {employee && (
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
                Add Category
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editEmp}>
                    <Form.Group>
                      <Form.Label>Employee Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="name"
                        type="text"
                        placeholder="Employee Id"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Employee Name</Form.Label>
                      <Form.Control
                        value={e_name}
                        onChange={(e) => setE_name(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Employee Name"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Employee Username</Form.Label>
                      <Form.Control
                        value={e_username}
                        onChange={(e) => setE_username(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Employee Username"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Employee Password</Form.Label>
                      <Form.Control
                        value={e_password}
                        onChange={(e) => setE_password(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Employee Password"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Employee Phone</Form.Label>
                      <Form.Control
                        value={e_phone}
                        onChange={(e) => setE_phone(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Employee Phone"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Employee Address</Form.Label>
                      <Form.Control
                        value={e_address}
                        onChange={(e) => setE_address(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Employee Address"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Date Of Joining</Form.Label>
                      <Form.Control
                        value={dateOfJoining}
                        onChange={(e) => setDateOfJoining(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Date Of Joining"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Role Id</Form.Label>
                      <Form.Control
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Category Name"
                      />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Update Category
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

export default EditEmployee;
