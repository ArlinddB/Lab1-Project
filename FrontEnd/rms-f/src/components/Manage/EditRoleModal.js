import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditRoleModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch("https://localhost:5001/api/roles",{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                r_id:event.target.r_id.value,
                r_name:event.target.r_name.value
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
                            Edit Role
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={12}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="r_id">
                                        <Form.Label>RoleId</Form.Label>
                                        <Form.Control type="text" name="r_id" disabled defaultValue={this.props.roleid}/>
                                    </Form.Group>

                                    <Form.Group controlId="r_name">
                                        <Form.Label>RoleName</Form.Label>
                                        <Form.Control type="text" name="r_name" required placeholder="RoleName" autoFocus defaultValue={this.props.rolename}/>
                                        
                                    </Form.Group>

                                    <Form.Group className="mt-3">
                                        <Button variant="primary" type="submit">
                                            Update Role
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