import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faTrash
} from '@fortawesome/free-solid-svg-icons'
import {
    Navbar,
    Form,
    FormControl,
    Button,
    NavDropdown
} from 'react-bootstrap'
import AuthService from '../services/auth.service';

function Header() {
    return (
        <Navbar fixed="top" bg="dark" expand="lg" className="pr-4 pl-4">
            <Navbar.Brand href="/" className="text-light"> AGME Bookings</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <div className="text-light mr-4">
                    <Button onClick={() => AuthService.logout()}>
                        <FontAwesomeIcon icon={faTrash} className="mr-2" /> Log Out
                    </Button>
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header