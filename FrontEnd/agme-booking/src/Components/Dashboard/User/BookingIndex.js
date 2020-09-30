import React from 'react'
import axios from 'axios';
import {
    Card, Button
} from 'react-bootstrap'
class BookingIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],
            selectedBusiness: 'hi'
        }
        // axios.get('http://agmeapi-env.eba-aw96pwjm.us-east-1.elasticbeanstalk.com/api/Business')
        axios.get('http://localhost:8080/api/Business')
            .then((response) => {
                this.setState({ businesses: response.data })
            });
    }
    
    render() {
        var bussinessCards = [];
        this.state.businesses.forEach(element => {
            bussinessCards.push(
                <Card>
                    <Card.Title>
                        {element.name}
                        <Button variant="primary" value = {element.name} onClick={() => window.location.href = '/dashboard/bookingform'}>Book</Button>
                    </Card.Title>
                </Card>
                
            )
        });
        return (
            <div id="businesses-list">
                {bussinessCards}
                
            </div>
        )
    }
}

export default BookingIndex