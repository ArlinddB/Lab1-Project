import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";
import set from "lodash.set";

function EditReservation(props) {   

  const [ajdi] = useState(props.ajdi);



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const [clientName, setClientName] = useState({});
  const [dateAndTime, setDateAndTime] = useState({});
  const [clientContact, setClientContact] = useState({});
  const [tableId, setTableId] = useState({});




  useEffect(async () => {
    const response = await axios.get(
      `https://localhost:5001/api/Reservation/${ajdi}`
    );
    setClientName(response.data.clientName);
    setDateAndTime(response.data.dateAndTime);
    setClientContact(response.data.clientContact);
    setTableId(response.data.tableId);

  }, []);

  const data = {
    clientName: clientName,
    dateAndTime: dateAndTime,
    clientContact: clientContact,
    tableId: tableId
  }

  const editReservation = async () => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/Reservation/${ajdi}`, data );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      
      {clientName && (
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
                Edit Reservation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row onSubmit={editReservation}> 
                <Col>
                  <Form>
                  <Form.Group>
                      <Form.Label>Reservation Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="reservationId"
                        type="text"
                        placeholder="Reservation Id"
                    />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Client Name</Form.Label>
                      <Form.Control
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        name="clientName"
                        type="text"
                        placeholder="Client Name"
                        
                    />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Date And Time</Form.Label>
                      <Form.Control
                        value={dateAndTime}
                        onChange={(e) => setDateAndTime(e.target.value)}
                        name="dateAndTime"
                        type="text"
                        placeholder="Date And Time"
                        
                    />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Client Contact</Form.Label>
                      <Form.Control
                        value={clientContact}
                        onChange={(e) => setClientContact(e.target.value)}
                        name="clientContact"
                        type="text"
                        placeholder="Client Contact"
                        
                    />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Table Id</Form.Label>
                      <Form.Control
                        value={tableId}
                        onChange={(e) => setTableId(e.target.value)}
                        name="tableId"
                        type="text"
                        placeholder="Table Id"
                        
                    />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Update Reservation
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

export default EditReservation;
