import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="light" variant="light">
                <Nav className="me-auto">
                    <Nav.Link href="/" exact>Home</Nav.Link>
                    <Nav.Link href="roles">Roles</Nav.Link>
                    <Nav.Link href="employee">Employee</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}