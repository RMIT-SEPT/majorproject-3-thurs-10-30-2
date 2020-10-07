import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AuthService from '../../services/auth.service';

class Login extends React.Component {

    render() {

        function handleLogin() {
          AuthService.login(document.getElementById("formLoginEmail"), document.getElementById("formLoginPassword")).then(
            () => {
                console.log(AuthService.getCurrentUser())
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
                <Button variant="primary" type="submit" onClick={() => handleLogin()}>
                    Submit
                </Button>
                <Button variant="light" onClick={() => this.props.setForm(0)}>Back</Button>{' '}
            </div>
        );
    }
}

export default Login