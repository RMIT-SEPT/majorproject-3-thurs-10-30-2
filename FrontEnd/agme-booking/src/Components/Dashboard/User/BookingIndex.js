import React from 'react'
import axios from 'axios';
import {
    Card,
} from 'react-bootstrap'
import { Link } from 'react-router-dom';
class BookingIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
        }
        // axios.get('http://agmeapi-env.eba-aw96pwjm.us-east-1.elasticbeanstalk.com/api/Business')
        axios.get('http://localhost:8080/api/bookings',{
            headers: {
                "Authorization": localStorage.token
            }
        })
            .then((response) => {
                this.setState({ bookings: response.data })
            });   
        this.selectedBooking = this.selectedBooking.bind(this);  
    }
    selectedBooking(event){
        console.log(event);
    }
    
    render() {
        var allBookings = [];
        this.state.bookings.forEach(element => {
            allBookings.push(
                <Card>
                    {element.name}
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