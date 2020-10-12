import React from 'react'
import Button from 'react-bootstrap/Button'


function HomepageControls({setForm}) {

    return (
        <div id="homepage-controls">
            <h1 className="text-light mb-4">
                <em>Revolutionize the way you book</em>
            </h1>
            <Button variant="primary" onClick={() => setForm(1)}>Log In</Button>{' '}
            <Button variant="success" onClick={() => setForm(2)}>Sign Up</Button>{' '}
            <Button variant="light" onClick={() => setForm(3)}>Register your business</Button>{' '}
        </div>
    );
}


export default HomepageControls