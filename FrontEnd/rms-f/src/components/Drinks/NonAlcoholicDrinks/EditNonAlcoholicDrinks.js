import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function EditNonAlcoholicDrinks(props) {
    
  const [ajdi] = useState(props.ajdi);

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

  useEffect( () => {
    axios.get(
      `https://localhost:5001/api/NonAlcoholicDrinks/${ajdi}`, config)
      .then((response) => {
        setDrinkName(response.data.drinkName);
        setDrinkPrice(response.data.drinkPrice);
        setDrinkDescription(response.data.drinkDescription);
       setCategoryId(response.data.categoryId);
    });
  }, []);

  const data ={
    drinkName: drinkName,
    drinkPrice: drinkPrice,
    drinkDescription: drinkDescription,
    categoryId: categoryId
  };


  const editDrink = async () => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/NonAlcoholicDrinks/${ajdi}`, data, config
      );
    } catch (error) {
      console.log(error.response);
    }
  };


  return (
    <>
      {drinkName && (
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
                Edit Drink 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editDrink}>
                    <Form.Group>
                      <Form.Label>Drink Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="name"
                        type="text"
                        placeholder="Drink Id"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Drink Name</Form.Label>
                      <Form.Control
                        value={drinkName}
                        onChange={(e) => setDrinkName(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Drink Name"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Drink Description</Form.Label>
                      <Form.Control
                        value={drinkDescription}
                        onChange={(e) => setDrinkDescription(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Drink Description"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Drink Price</Form.Label>
                      <Form.Control
                        value={drinkPrice}
                        onChange={(e) => setDrinkPrice(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Drink Price"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Category Id</Form.Label>
                      <Form.Control
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Category Id"
                      />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Update Drink
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

export default EditNonAlcoholicDrinks;
