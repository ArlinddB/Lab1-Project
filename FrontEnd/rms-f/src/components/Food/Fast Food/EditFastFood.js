import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function EditFastFood(props) {
    
  const [ajdi] = useState(props.ajdi);

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

  useEffect( () => {
    axios.get(
      `https://localhost:5001/api/FastFood/${ajdi}`, config)
      .then((response) => {
       setFoodName(response.data.foodName);
       setFoodPrice(response.data.foodPrice);
       setFoodDescription(response.data.foodDescription);
       setCategoryId(response.data.categoryId);
    });
  }, []);

  const data ={
    foodName: foodName,
    foodPrice: foodPrice,
    foodDescription: foodDescription,
    categoryId: categoryId
  };


  const editFood = async () => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/FastFood/${ajdi}`, data, config
      );
    } catch (error) {
      console.log(error.response);
    }
  };


  return (
    <>
      {foodName && (
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
                Edit Food 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editFood}>
                    <Form.Group>
                      <Form.Label>Food Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="name"
                        type="text"
                        placeholder="Food Id"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Food Name</Form.Label>
                      <Form.Control
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Food Name"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Food Description</Form.Label>
                      <Form.Control
                        value={foodDescription}
                        onChange={(e) => setFoodDescription(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Food Description"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Food Price</Form.Label>
                      <Form.Control
                        value={foodPrice}
                        onChange={(e) => setFoodPrice(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Food Price"
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
                        Update Food
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

export default EditFastFood;
