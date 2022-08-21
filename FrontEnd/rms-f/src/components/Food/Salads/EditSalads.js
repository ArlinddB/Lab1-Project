import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

import axios from "axios";

function EditSalads(props) {
    
  const [ajdi] = useState(props.ajdi);

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

  useEffect( () => {
    axios.get(
      `https://localhost:5001/api/Salad/${ajdi}`, config)
      .then((response) => {
       setSaladName(response.data.saladName);
       setSaladPrice(response.data.saladPrice);
       setSaladDescription(response.data.saladDescription);
       setCategoryId(response.data.categoryId);
    });
  }, []);

  const data ={
    saladName: saladName,
    saladPrice: saladPrice,
    saladDescription: saladDescription,
    categoryId: categoryId
  };


  const editSalad = async () => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/Salad/${ajdi}`, data, config
      );
    } catch (error) {
      console.log(error.response);
    }
  };


  return (
    <>
      {saladName && (
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
                Edit Salad 
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={editSalad}>
                    <Form.Group>
                      <Form.Label>Salad Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="name"
                        type="text"
                        placeholder="Salad Id"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Salad Name</Form.Label>
                      <Form.Control
                        value={saladName}
                        onChange={(e) => setSaladName(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Salad Name"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Salad Description</Form.Label>
                      <Form.Control
                        value={saladDescription}
                        onChange={(e) => setSaladDescription(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Salad Description"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Salad Price</Form.Label>
                      <Form.Control
                        value={saladPrice}
                        onChange={(e) => setSaladPrice(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Salad Price"
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
                        Update Salad
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

export default EditSalads;
