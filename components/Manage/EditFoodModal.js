import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditFoodModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch("https://localhost:5001/api/food",{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                food_id:event.target.food_id.value,
                food_type:event.target.food_type.value,
                food_name:event.target.food_name.value,
                food_price:event.target.food_price.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert("Failed");
        })
    }

    render(){
        return(
            <div className="container">
                <Modal {...this.props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Food
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={12}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="food_id">
                                        <Form.Label>Food Id</Form.Label>
                                        <Form.Control type="text" name="food_id" disabled defaultValue={this.props.foodid}/>
                                    </Form.Group>

                                    <Form.Group controlId="food_type">
                                        <Form.Label>Food Type</Form.Label>
                                        <Form.Control type="text" name="food_type" required autoFocus defaultValue={this.props.foodtype}/>
                                        
                                    </Form.Group>

                                    <Form.Group controlId="food_name">
                                        <Form.Label>Food Name</Form.Label>
                                        <Form.Control type="text" name="food_name" required defaultValue={this.props.foodname}/>
                                    </Form.Group>

                                    <Form.Group controlId="food_price">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" name="food_price" required defaultValue={this.props.foodprice}/>
                                        
                                    </Form.Group>

                                    <Form.Group className="mt-3">
                                        <Button variant="primary" type="submit">
                                            Update Food
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}