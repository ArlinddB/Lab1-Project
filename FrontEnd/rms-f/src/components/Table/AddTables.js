import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";



function AddTables() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [numberOfChairs, setNumberOfChairs] = useState();
  const [place, setPlace] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }


  const addTable = async () => {
    try {
      const response = await axios.post("https://localhost:5001/api/Table/", {
        numberOfChairs,
        place
      }, config);
    } catch (err) {
      alert("Something went wrong");
    }
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Table
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Add Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addTable}>

                <Form.Group>
                  <Form.Label>Number of Chairs</Form.Label>
                  <Form.Control
                    type="text"
                    name="numberOfChairs"
                    onChange={(e) => setNumberOfChairs(e.target.value)}
                    required
                    placeholder="Number of Chairs"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Place</Form.Label>
                  <Form.Control
                    type="text"
                    name="place"
                    onChange={(e) => setPlace(e.target.value)}
                    required
                    placeholder="Place"
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit" >
                    Add Table
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
export default AddTables;
