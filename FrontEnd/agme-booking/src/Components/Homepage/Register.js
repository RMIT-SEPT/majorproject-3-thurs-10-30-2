import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import BusinessForm from '../Dashboard/Admin/Business/BusinessForm'
import { useTransition, animated } from 'react-spring'


function Register() {
    const [busFormIndex, setForm] = useState(0);
    var user = {}

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
                        <Form.Control type="text" placeholder="Enter full name" value="John Doe"/>
                    </Form.Group>
                    <Form.Group controlId="adminEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value="john.doe@gmail.com"/>
                    </Form.Group>
                    <Form.Group controlId="adminPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value="abc123"/>
                    </Form.Group>
                    <Form.Group controlId="adminPasswordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" placeholder="Password" value="abc123"/>
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
                <BusinessForm setForm={setForm}/>
            </div>
        </animated.div >
    ]

    function saveUser(){
        user.name = document.getElementById("adminName").value;
        user.email = document.getElementById("adminEmail").value;
        user.password = document.getElementById("adminPassword").value;
        setForm(1)
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