import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={roles:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'roles')
        .then(response=>response.json())
        .then(data=>{
            this.setState({roles:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                
                e_name:event.target.e_name.value,
                e_username:event.target.e_username.value,
                e_password:event.target.e_password.value,
                e_phone:event.target.e_phone.value,
                e_address:event.target.e_address.value,
                DateOfJoining:event.target.DateOfJoining.value,
                e_roleID:event.target.e_roleID.value

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return (
            <div className="container">

                <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Row>
                            <Col sm={12}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="e_id">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" name="e_id" required 
                                        placeholder="Id" disabled defaultValue={this.props.empid}/>
                                    </Form.Group>

                                    <Form.Group controlId="e_name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="e_name" required 
                                        placeholder="EmployeeName" disabled defaultValue={this.props.empname}/>
                                    </Form.Group>

                                    <Form.Group controlId="e_username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" name="e_username" required 
                                        placeholder="EmployeeUsername" defaultValue={this.props.empusername}/>
                                    </Form.Group>

                                    <Form.Group controlId="e_password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="text" name="e_password" required 
                                        placeholder="Password" defaultValue={this.props.emppassword}/>
                                    </Form.Group>

                                    <Form.Group controlId="e_phone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" name="e_phone" required 
                                        placeholder="EmployeePhone" defaultValue={this.props.empphone}/>
                                    </Form.Group>

                                    <Form.Group controlId="e_address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="e_address" required 
                                        placeholder="EmployeeAddress" defaultValue={this.props.empaddress}/>
                                    </Form.Group>

                                    <Form.Group controlId="DateOfJoining">
                                        <Form.Label>DateOfJoining</Form.Label>
                                        <Form.Control 
                                        type="date"
                                        name="DateOfJoining"
                                        required
                                        placeholder="DateOfJoining"
                                        defaultValue={this.props.doj}
                                        /> 
                                    </Form.Group>

                                    <Form.Group controlId="e_roleID">
                                        <Form.Label>RoleID</Form.Label>
                                        <Form.Control type="text" name="e_roleID" required 
                                        placeholder="EmployeeRoleID" defaultValue={this.props.emproleid}/>
                                    </Form.Group>

                                    <Form.Group className="mt-3">
                                        <Button variant="primary" type="submit">
                                            Update Employee
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