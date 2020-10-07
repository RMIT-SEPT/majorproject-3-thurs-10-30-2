import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AuthService from '../../services/auth.service';


class SignUp extends React.Component {

    render() {
        function handleSignup() {
            console.log(document.getElementById("formSignupType").options[document.getElementById("formSignupType").selectedIndex].value)
            AuthService.register(
                document.getElementById("formSignupEmail").value,
                document.getElementById("formName").value,
                document.getElementById("formSignupPassword").value,
                document.getElementById("formSignupPasswordConfirmation").value,
                document.getElementById("formSignupType").options[document.getElementById("formSignupType").selectedIndex].value
                ).then(
                () => {
                    if (JSON.parse(localStorage.getItem('user')).accountType === "CUSTOMER") {
                        window.location.href = "/dashboard"
                    }
                    if (JSON.parse(localStorage.getItem('user')).accountType === "WORKER") {
                        window.location.href = "/worker"
                    }
                    if (JSON.parse(localStorage.getItem('user')).accountType === "ADMIN") {
                        window.location.href = "/admin"
                    }
                });
        }

        return (
            <div className="overlay-form">
                <h1 className="text-center">
                    Sign Up
                </h1>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" />
                    </Form.Group>
                    <Form.Group controlId="formSignupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Account Type</Form.Label>
                        <Form.Control as="select" id="formSignupType">
                            <option value="CUSTOMER">Customer</option>
                            <option value="WORKER">Worker</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formSignupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formSignupPasswordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={() => handleSignup()}>
                    Submit
                </Button>
                <Button variant="light" onClick={() => this.props.setForm(0)}>Back</Button>{' '}
            </div>
        );
    }
}

export default SignUp