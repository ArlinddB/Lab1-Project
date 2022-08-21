import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function AddSalads() {
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [saladName, setSaladName] = useState();
    const [saladPrice, setSaladPrice] = useState();
    const [saladDescription, setSaladDescription] = useState();
    const [categoryId, setCategoryId] = useState();

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    
    const addSalad = async () => {
      try {
        const response = await axios.post("https://localhost:5001/api/Salad/", {
            saladName,
            saladPrice,
            saladDescription,
            categoryId,
          
        }, config);
      } catch (err) {
        alert(err);
      }
    };

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Add Salad
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Salad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addSalad}>
                <Form.Group controlId="SaladName">
                  <Form.Label>Salad Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="SaladName"
                    onChange={(e) => setSaladName(e.target.value)}
                    required
                    placeholder="Salad Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="SaladPrice">
                  <Form.Label>Salad Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="SaladPrice"
                    onChange={(e) => setSaladPrice(e.target.value)}
                    required
                    placeholder="Salad Price"
                  />
                </Form.Group>

                <Form.Group controlId="SaladDescription">
                  <Form.Label>Salad Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="SaladDescription"
                    onChange={(e) => setSaladDescription(e.target.value)}
                    required
                    placeholder="Salad Description"
                  />
                </Form.Group>

                <Form.Group controlId="categoryId">
                  <Form.Label>Category Id</Form.Label>
                  <Form.Control
                    type="text"
                    name="categoryId"
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    placeholder="Category Id"
                  />
                </Form.Group>

                

                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit">
                    Add Salad
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
export default AddSalads;
