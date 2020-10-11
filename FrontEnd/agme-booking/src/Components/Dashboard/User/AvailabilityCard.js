import React from 'react'
import {
    Card
} from 'react-bootstrap'

class AvailabilityCard extends React.Component {
    render() {

        const slots = []
        for (var i = 0; i < this.props.times.length; i++) {
            slots.push(
                <Card key={this.props.times[i].startTime+this.props.times[i].endTime+this.props.empName}>
                    {/* <Card.Body>Service</Card.Body> */}
                    <Card.Body> Time: {this.props.times[i].startTime} - {this.props.times[i].endTime}</Card.Body>
                    <Card.Body>{this.props.empName}</Card.Body>
                </Card>
            )
        }
        
        return (
            <div id="availability-cards">
                {slots}
            </div>
        )
    }
}

export default AvailabilityCard