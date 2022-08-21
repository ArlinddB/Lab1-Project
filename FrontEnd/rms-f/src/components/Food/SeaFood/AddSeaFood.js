import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function AddSeaFood() {
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [foodName, setFoodName] = useState();
    const [foodPrice, setFoodPrice] = useState();
    const [foodDescription, setFoodDescription] = useState();
    const [categoryId, setCategoryId] = useState();

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    
    const addFood = async () => {
      try {
        const response = await axios.post("https://localhost:5001/api/SeaFood/", {
            foodName,
            foodPrice,
            foodDescription,
            categoryId,
          
        }, config);
      } catch (err) {
        alert(err);
      }
    };

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Add Food
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Food
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addFood}>
                <Form.Group controlId="FoodName">
                  <Form.Label>Food Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="FoodName"
                    onChange={(e) => setFoodName(e.target.value)}
                    required
                    placeholder="Food Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="FoodPrice">
                  <Form.Label>Food Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="FoodPrice"
                    onChange={(e) => setFoodPrice(e.target.value)}
                    required
                    placeholder="Food Price"
                  />
                </Form.Group>

                <Form.Group controlId="FoodDescription">
                  <Form.Label>Food Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="FoodDescription"
                    onChange={(e) => setFoodDescription(e.target.value)}
                    required
                    placeholder="Food Description"
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
                    Add Food
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
export default AddSeaFood;
