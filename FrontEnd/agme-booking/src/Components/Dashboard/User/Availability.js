import React, { useState } from 'react'
import {
    Card
} from 'react-bootstrap'

function Availability() {
    return (
        <div id="availability-cards">
            <Card>
                <Card.Body>Service</Card.Body>
                <Card.Body>9:00AM - 10:00AM</Card.Body>
                <Card.Body>Employee</Card.Body>
            </Card>
            <Card>
                <Card.Body>Service</Card.Body>
                <Card.Body>11:00AM - 12:00PM</Card.Body>
                <Card.Body>Employee</Card.Body>
            </Card>
            <Card>
                <Card.Body>Service</Card.Body>
                <Card.Body>2:00PM - 3:00PM</Card.Body>
                <Card.Body>Employee</Card.Body>
            </Card>
        </div>
    )
}

export default Availability