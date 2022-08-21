import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";

function EditDrinkCategories(props) {   

  const [ajdi] = useState(props.ajdi);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const [categoryName, setCategoryName] = useState({});

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }


  useEffect(async () => {
    const response = await axios.get(
      `https://localhost:5001/api/DrinksCategory/${ajdi}`, config
    );
    setCategoryName(response.data);

  }, []);

  const editCategory = async () => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/DrinksCategory/${ajdi}`,
        {
          categoryName,
        }, config
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      
      {categoryName && (
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
                Add Category
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row onSubmit={editCategory}> 
                <Col>
                  <Form>
                  <Form.Group controlId="CategoryId">
                      <Form.Label>Category Id</Form.Label>
                      <Form.Control
                        value={ajdi}
                        disabled
                        name="name"
                        type="text"
                        placeholder="Category Id"
                    />
                    </Form.Group>
                    <Form.Group controlId="CategoryName">
                      <Form.Label>Category Name</Form.Label>
                      <Form.Control
                        value={categoryName.categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        name="name"
                        type="text"
                        placeholder="Category Name"
                    />
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Button
                        variant="primary"
                        type="submit"
                      >
                        Update Category
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

export default EditDrinkCategories;
