import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddRoleModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'roles',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                
                r_name:event.target.r_name.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            console.log(result);
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
                            Add Role
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={12}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="r_name">
                                        <Form.Label>RoleName</Form.Label>
                                        <Form.Control type="text" name="r_name" required placeholder="RoleName" autoFocus/>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button variant="primary" type="submit">
                                            Add Role
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