import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";



function AddReservation() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [clientName, setClientName] = useState({});
  const [dateAndTime, setDateAndTime] = useState({});
  const [clientContact, setClientContact] = useState({});
  const [tableId, setTableId] = useState({});


  const addReservation = async () => {
    try {
      const response = await axios.post("https://localhost:5001/api/Reservation/", {
        clientName,
        dateAndTime,
        clientContact,
        tableId
      });
    } catch (err) {
      alert("Something went wrong");
    }
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Reservation
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Add Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addReservation}>

                    <Form.Group>
                      <Form.Label>Client Name</Form.Label>
                      <Form.Control
                        onChange={(e) => setClientName(e.target.value)}
                        name="clientName"
                        type="text"
                        placeholder="Client Name"
                        
                    />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Date And Time</Form.Label>
                      <Form.Control
                        onChange={(e) => setDateAndTime(e.target.value)}
                        name="dateAndTime"
                        type="text"
                        placeholder="Date And Time"
                        
                    />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Client Contact</Form.Label>
                      <Form.Control
                        onChange={(e) => setClientContact(e.target.value)}
                        name="clientContact"
                        type="text"
                        placeholder="Client Contact"
                        
                    />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Table Id</Form.Label>
                      <Form.Control
                        onChange={(e) => setTableId(e.target.value)}
                        name="tableId"
                        type="text"
                        placeholder="Table Id"
                        
                    />
                    </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit" >
                    Add Reservation
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
export default AddReservation;
