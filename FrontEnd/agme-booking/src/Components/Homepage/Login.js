import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import jwt_decode from "jwt-decode";

class Login extends React.Component {

    render() {

        function login() {
            axios({
                method: "POST",
                url: 'http://localhost:3000/api/users/login',
                headers: {},
                data: {
                    "username": document.getElementById("formLoginEmail").value,
                    "password": document.getElementById("formLoginEmail").value
                }
            }).then(function (response) {
                if (response.status === 201) {
                    var data = jwt_decode(response.token.split(" ")[1])
                    console.log(data)
                }
                console.log(response);
            });
        }


        return (
            <div className="overlay-form">
                <h1 className="text-center">
                    Log In
                </h1>
                <Form>
                    <Form.Group controlId="formLoginEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                    </Form.Group>

                    <Form.Group controlId="formLoginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group controlId="formRememberCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={() => login()}>
                    Submit
                </Button>
                <Button variant="light" onClick={() => this.props.setForm(0)}>Back</Button>{' '}
            </div>
        );
    }
}

export default Login