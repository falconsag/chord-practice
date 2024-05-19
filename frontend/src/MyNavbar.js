import React from 'react';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

function MyNavbar({onNavigationClick}) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">Chord-practice</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => onNavigationClick('home')}>Home</Nav.Link>
                    <NavDropdown title="Personal excercises" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => onNavigationClick('personal-single-chords')} >Practice single chords</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;