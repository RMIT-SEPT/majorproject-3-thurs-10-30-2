import React, { useState } from 'react'
import BusinessForm from './Admin/Business/BusinessForm';
import BookingBusiness from './User/BookingBusiness'
import BookingForm from './User/BookingForm'
import CreateBookingButton from './User/CreateBookingButton';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import BusinessIndex from './Admin/Business/BusinessIndex';
import BookingIndex from './User/BookingIndex';
import {
    Card,
    Button
} from 'react-bootstrap'
import axios from 'axios';

function Dashboard() {

    const [bookingBusiness, setForm] = useState(0);
    const forms = [
        <CreateBookingButton setForm={setForm} />,
        <BookingBusiness setForm={setForm} />,
        <BookingIndex setForm={setForm} />,
        <BusinessForm setForm={setForm} />
    ];

    const [bookings, setBookings] = useState("")

    if (bookings === "") {
        axios.get('http://localhost:8080/api/users/' + JSON.parse(localStorage.user).id + "/bookings")
            .then((response) => {
                var tmpBookings = []
                response.data.forEach(element => {
                    console.log(element)
                    tmpBookings.push(
                        <Card className="my-2">
                            <Card.Body>
                                <Card.Title>{"Business Name: " + element.businessName}</Card.Title>
                                <Card.Text>{"Date: " + element.startTime.substring(0, 10)}</Card.Text>
                                <Card.Text>{"Starting Time: " + element.startTime.substring(11, 16)}</Card.Text>
                                <Card.Text>{"Ending Time: " + element.endTime.substring(11, 16)}</Card.Text>
                                <Button>More Details</Button>
                            </Card.Body>
                        </Card>
                    )
                });
                setBookings(tmpBookings)
            });
    }

    return (
        <div className="header-spacer container dashboard">
            <div className="row">
                <div className="col-lg-2">
                </div>
                <div className="col-lg-8">

                    <Router>
                        <Switch>
                            <Route exact path="/dashboard">
                                {
                                    forms[bookingBusiness]
                                }
                                <div className="mt-4">
                                    {bookings}
                                </div>
                            </Route>
                            <Route path="/dashboard/bookingform">
                                <BookingForm />
                            </Route>
                            <Route path="/dashboard/businesses">
                                <BusinessIndex />
                            </Route>
                        </Switch>
                    </Router>
                </div>
                <div className="col-lg-2">
                </div>
            </div>
        </div>
    )
}

export default Dashboard
