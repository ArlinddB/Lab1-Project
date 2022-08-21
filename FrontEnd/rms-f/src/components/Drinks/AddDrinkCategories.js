import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";



function AddDrinkCategories() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryName, setCategoryName] = useState();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }

  const addCategory = async () => {
    try {
      const response = await axios.post("https://localhost:5001/api/DrinksCategory", {
        categoryName,
      }, config);
    } catch (err) {
      alert("Something went wrong");
    }
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addCategory}>
                <Form.Group controlId="CategoryName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="CategoryName"
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                    placeholder="Category Name"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Button variant="primary" type="submit" >
                    Add Category
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
export default AddDrinkCategories;
