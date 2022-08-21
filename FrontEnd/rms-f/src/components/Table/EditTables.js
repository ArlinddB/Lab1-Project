import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";

function EditTables(props) {   

  const [ajdi] = useState(props.ajdi);



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const [numberOfChairs, setNumberOfChairs] = useState({});
  const [place, setPlace] = useState({});

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }

  useEffect(async () => {
    const response = await axios.get(
      `https://localhost:5001/api/Table/${ajdi}`, config
    );
    setNumberOfChairs(response.data.numberOfChairs);
    setPlace(response.data.place);

  }, []);

  const data = {
    numberOfChairs: numberOfChairs,
    place: place
  }

  const editTable = async () => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/Table/${ajdi}`, data, config );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      
      {place && (
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
                Edit Table
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row onSubmit={editTable}> 
                <Col>
                  <Form>
                  <Form.Group controlId="TableId">
                      <Form.Label>Role Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="tableId"
                        type="text"
                        placeholder="Table Id"
                    />
                    </Form.Group>

                    <Form.Group controlId="NumberOfChairs">
                      <Form.Label>Role Name</Form.Label>
                      <Form.Control
                        value={numberOfChairs}
                        onChange={(e) => setNumberOfChairs(e.target.value)}
                        name="numberOfChairs"
                        type="text"
                        placeholder="Number Of Chairs"
                        
                    />
                    </Form.Group>

                    <Form.Group controlId="Place">
                      <Form.Label>Place</Form.Label>
                      <Form.Control
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        name="place"
                        type="text"
                        placeholder="Place"
                        
                    />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Update Table
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

export default EditTables;
