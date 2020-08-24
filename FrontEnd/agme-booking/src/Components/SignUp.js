import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class SignUp extends React.Component {

    render() {
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
                    <Form.Group controlId="formSignupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formSignupPasswordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>
                <Button variant="light" onClick={() => this.props.setForm(0)}>Back</Button>{' '}
            </div>
        );
    }
}

export default SignUp