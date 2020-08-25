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

function Header() {
    return (
        <Navbar fixed="top" bg="light" expand="lg" className="pr-4 pl-4">
            <Navbar.Brand href="/"> AGME Bookings</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Form inline>
                    <FormControl type="text" placeholder="Search Businesses" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
                <div>
                    <NavDropdown title="Username" id="basic-nav-dropdown" className="ml-4 mr-4">
                        <NavDropdown.Item href="#action/3.1">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />My Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Bookings</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/">
                            <FontAwesomeIcon icon={faTrash} className="mr-2" /> Log Out
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header