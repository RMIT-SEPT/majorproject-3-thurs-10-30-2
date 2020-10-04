import React from 'react'
import axios from 'axios';
import {
    Card,
} from 'react-bootstrap'
import { Link } from 'react-router-dom';
class BookingBusiness extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],
        }
        // axios.get('http://agmeapi-env.eba-aw96pwjm.us-east-1.elasticbeanstalk.com/api/Business')
        axios.get('http://localhost:8080/api/Business')
            .then((response) => {
                this.setState({ businesses: response.data })
            });   
        this.selectedBusiness = this.selectedBusiness.bind(this);  
    }
    selectedBusiness(event){
        console.log(event);
    }
    
    render() {
        var bussinessCards = [];
        this.state.businesses.forEach(element => {
            bussinessCards.push(
                <Card>
                    <Card.Body>{element.name}{" "}
                    <Link onClick={this.selectedBusiness(element.name)} to={`/dashboard/bookingform/${element.name}`}>Book</Link></Card.Body>              
                </Card>
                
            )
        });
        return (
            <div id="businesses-list">
                <h2>Select a business</h2>
                {bussinessCards}                
            </div>
        )
    }
}

export default BookingBusiness