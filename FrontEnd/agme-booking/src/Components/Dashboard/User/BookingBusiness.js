import React from 'react'
import axios from 'axios';
import {
    Card, Form
} from 'react-bootstrap'
import { Link } from 'react-router-dom';
class BookingBusiness extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            business: 'Search Businesses',
            search: 'Search Businesses',
            businesses: [],
        }
        // axios.get('http://agmeapi-env.eba-aw96pwjm.us-east-1.elasticbeanstalk.com/api/Business')
        axios.get('http://localhost:8080/api/Business')
            .then((response) => {
                this.setState({ businesses: response.data })
            });
        this.selectedBusiness = this.selectedBusiness.bind(this);
    }
    selectedBusiness(event) {
        // console.log(event);
    }
    handleBusinessSearch(event) {
        this.state.search = event.target.value;
        this.setState({
            [this.state.business]: this.state.search
        });
        // console.log(this.state.search);
    }
    render() {
        /*for displaying business cards by search or default*/
        const slots = [];
        this.select = this.state.businesses.map((select) => {
            if (this.state.search === 'Search Businesses' || this.state.search === '') {
                slots.push(
                    <Card>
                        <Card.Body>{select.name}{" "}
                            <Link to={`/dashboard/bookingform/${select.name}`}>Book</Link></Card.Body>
                    </Card>
                )
            } else {
                if (this.state.search === select.name) {
                    slots.push(
                        <Card>
                            <Card.Body>{select.name}{" "}
                                <Link to={`/dashboard/bookingform/${select.name}`}>Book</Link></Card.Body>
                        </Card>
                    )
                }
            }
        }
        )
        return (
            <div id="businesses-list">
                <h2>Select a business</h2>
                <Form>
                    <Form.Control type="text" placeholder="Search Businesses" onChange={this.handleBusinessSearch.bind(this)} />
                </Form>
                {slots}
            </div>
        )
    }
}

export default BookingBusiness