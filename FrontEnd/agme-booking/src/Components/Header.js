import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Header() {
    return (
        <Navbar fixed = "top" bg="light" expand="lg">
            <Navbar.Brand href="/"> AGME Bookings</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header