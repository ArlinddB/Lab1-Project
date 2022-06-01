import React,{Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';


export class Navigation extends Component{

    render(){
        return(
            <Navbar id="sidebarMenu"
            className="collapse d-lg-block sidebar collapse bg-white">
                <Nav className="me-auto">
                    <Nav.Link href="/" exact>Home</Nav.Link>
                    <Nav.Link href="roles">Roles</Nav.Link>
                    <Nav.Link href="employee">Employee</Nav.Link>
                    <Nav.Link href="food">Food</Nav.Link>
                    <Nav.Link href="drinks">Drinks</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}