import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class Login extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="overlay-form">
                <h1 className="text-center">
                    Log In
                </h1>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
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

export default Login