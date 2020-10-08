import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import BusinessForm from '../Dashboard/Admin/Business/BusinessForm'
import axios from 'axios'
import authService from '../../services/auth.service'


function Register({ setForm }) {
    const [busFormIndex, setBusForm] = useState(0);

    const busForms = [
        <div className="overlay-form">
            <h1 className="text-center">
                First, create an admin account
            </h1>
            <Form>
                <Form.Group controlId="adminName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" />
                </Form.Group>
                <Form.Group controlId="adminEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="adminPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="adminPasswordConfirmation">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form>
            <Button variant="primary" type="submit" onClick={() => saveUser()}>
                Next
                </Button>
            <Button variant="light" onClick={() => setForm(0)}>Back</Button>{' '}
        </div>,
        <div className="overlay-form">
            <BusinessForm setBusForm={setBusForm} saveBusiness={saveBusiness} />
        </div>
    ]

    function saveUser() {
        var fname = document.getElementById("adminName").value;
        var email = document.getElementById("adminEmail").value;
        var password = document.getElementById("adminPassword").value;
        var passwordConfirm = document.getElementById("adminPasswordConfirmation").value;

        if (authService.register(email, fname, password, passwordConfirm, "ADMIN") !== null) {
            setBusForm(1)
        }
    }

    function saveBusiness(name, hours) {
        if (name !== "" && hours.length > 0) {
            if (JSON.parse(localStorage.user) !== null) {
                axios({
                    method: "POST",
                    url: 'http://localhost:8080/api/Business',
                    headers: {
                        "Authorization": localStorage.token
                    },
                    data: {
                        "business": {
                            "name": name
                        },
                        "businessHours": hours
                    }
                }).then(function (response) {
                    window.location.href = "/admin"
                });
                return true;
            }
        }
        return false;
    }

    return (
        <div>
            {busForms[busFormIndex]}
        </div>
    );

}

export default Register