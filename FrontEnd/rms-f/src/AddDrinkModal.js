import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddDrinkModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'drinks',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                
                drink_type:event.target.drink_type.value,
                drink_name:event.target.drink_name.value,           
                drink_price:event.target.drink_price.value
                
                
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
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Drink
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={12}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="drink_type">
                                        <Form.Label>Drink Type</Form.Label>
                                        <Form.Control type="text" name="drink_type" required placeholder="Drink Type" autoFocus/>
                                    </Form.Group>
                                    <Form.Group controlId="drink_name">
                                        <Form.Label>Drink Name</Form.Label>
                                        <Form.Control type="text" name="drink_name" required placeholder="Drink Name" />
                                    </Form.Group>
                                    <Form.Group controlId="drink_price">
                                        <Form.Label>Drink Price</Form.Label>
                                        <Form.Control type="text" name="drink_price" required placeholder="Drink Price" />
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
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}