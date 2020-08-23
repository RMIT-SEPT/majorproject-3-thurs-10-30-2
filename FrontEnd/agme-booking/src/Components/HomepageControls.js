import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { render } from 'react-dom'

class HomepageControls extends React.Component {
    constructor(props) {
        super(props);
        };
        
    render() {
        return(
            <div id="homepage-controls">
                <h1 className="text-light mb-4">
                    <em>Revolutionize the way you book</em>
                </h1>
                <Button variant="primary" onClick={() => this.props.setForm(1)}>Log In</Button>{' '}
                <Button variant="success" onClick={() => this.props.setForm(2)}>Sign Up</Button>{' '}
                <Button variant="light" onClick={() => this.props.setForm(3)}>Register your business</Button>{' '}
            </div>
        );
    }
}

export default HomepageControls