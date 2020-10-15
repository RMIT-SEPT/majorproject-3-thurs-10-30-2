import React from 'react'
import axios from 'axios';
import {
    Card, Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom';
class BookingIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
        }
        // axios.get('http://agmeapi-env.eba-aw96pwjm.us-east-1.elasticbeanstalk.com/api/Business')
        axios.get('http://localhost:8080/api/users/'+JSON.parse(localStorage.user).id+'/bookings',{
            headers: {
                "Authorization": localStorage.token
            }
        })
            .then((response) => {
                this.setState({ bookings: response.data })
            });   
    }   
    render() {
        const allBookings = [];

        this.state.bookings.forEach(element => {
            allBookings.push(
                <Card>
                    <Card.Body>
                    <Card.Title>{"Business Name: "+element.businessName}</Card.Title>
                    <Card.Text>{"Date: "+element.startTime.substring(0,10)}</Card.Text>
                    <Card.Text>{"Starting Time: " + element.startTime.substring(11,16)}</Card.Text>
                    <Card.Text>{"Ending Time: " + element.endTime.substring(11,16)}</Card.Text>
                    <Button>More Details</Button>
                    </Card.Body>

                </Card>
                
            )
        });
        return (
            <div id="booking-list">
                <h2>Bookings</h2>
                {allBookings}                
            </div>
        )
    }
}

export default BookingIndex