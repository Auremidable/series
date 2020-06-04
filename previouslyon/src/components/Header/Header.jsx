import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { MdPersonalVideo } from "react-icons/md";


import './header.style.css';


const Header = (props) => {
    return ( 
        <Navbar collapseOnSelect expand="lg" bg="dark"  variant="dark">
            <Navbar.Brand href="/">
                <MdPersonalVideo size={40} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">      
                {props.displayLinks()}
                <Nav className="ml-auto">
                    {props.isLoggeIn()}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
} 
export default Header;