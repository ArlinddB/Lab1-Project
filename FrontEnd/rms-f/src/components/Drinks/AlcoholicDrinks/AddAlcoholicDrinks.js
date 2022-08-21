import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function AddAlcoholicDrinks() {
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [drinkName, setDrinkName] = useState();
    const [drinkPrice, setDrinkPrice] = useState();
    const [drinkDescription, setDrinkDescription] = useState();
    const [categoryId, setCategoryId] = useState();

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    
    const addDrink = async () => {
      try {
        const response = await axios.post("https://localhost:5001/api/AlcoholicDrinks/", {
            drinkName,
            drinkPrice,
            drinkDescription,
            categoryId,
          
        }, config);
      } catch (err) {
        alert(err);
      }
    };

    return (
      <>
      <Button variant="primary" onClick={handleShow}>
        Add Drink
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Drink
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form onSubmit={addDrink}>
                <Form.Group controlId="DrinkName">
                  <Form.Label>Drink Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="DrinkName"
                    onChange={(e) => setDrinkName(e.target.value)}
                    required
                    placeholder="Drink Name"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group controlId="DrinkPrice">
                  <Form.Label>Drink Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="DrinkPrice"
                    onChange={(e) => setDrinkPrice(e.target.value)}
                    required
                    placeholder="Drink Price"
                  />
                </Form.Group>

                <Form.Group controlId="DrinkDescription">
                  <Form.Label>Drink Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="DrinkDescription"
                    onChange={(e) => setDrinkDescription(e.target.value)}
                    required
                    placeholder="Drink Description"
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
                    Add Drink
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
export default AddAlcoholicDrinks;
