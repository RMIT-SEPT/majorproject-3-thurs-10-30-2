import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import BusinessForm from '../Dashboard/Admin/Business/BusinessForm'
import { useTransition, animated } from 'react-spring'
import axios from 'axios'
import authService from '../../services/auth.service'


function Register() {
    const [busFormIndex, setForm] = useState(0);

    const transitions = useTransition(busFormIndex, p => p, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-50%)' },
    })

    const busForms = [
        ({ style }) =>
            <animated.div style={{ ...style }}>
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
                    <Button variant="light" onClick={() => window.location.href = '/'}>Back</Button>{' '}
                </div>
            </animated.div >,
        ({ style }) =>
            <animated.div style={{ ...style }}>
                <div className="overlay-form">
                    <BusinessForm setForm={setForm} saveBusiness={saveBusiness} />
                </div>
            </animated.div >
    ]

    function saveUser() {
        var fname = document.getElementById("adminName").value;
        var email = document.getElementById("adminEmail").value;
        var password = document.getElementById("adminPassword").value;
        var passwordConfirm = document.getElementById("adminPasswordConfirmation").value;
        
        if (authService.register(email, fname, password, passwordConfirm, "ADMIN") !== null) {
            setForm(1)
        }
    }

    function saveBusiness(name, hours) {
        if (name !== "" && hours.length > 0) {
            if (JSON.parse(localStorage.user) !== null) {
                axios({
                    method: "POST",
                    url: 'http://localhost:8080/api/Business',
                    headers: {
                        "Authorization": localStorage.token},
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
            {transitions.map(({ item, props, key }) => {
                const Form = busForms[item]
                return <Form key={key} style={props} />
            }
            )}
            <h1 className="text-center">
                First, create an admin account
                </h1>
        </div>
    );

}

export default Register