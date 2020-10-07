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
// import BookingForm from './User/BookingForm';
function Dashboard() {

    const [bookingBusiness, setForm] = useState(0);
    const forms = [
        <CreateBookingButton setForm={setForm} />,
        <BookingBusiness setForm={setForm} />,
        <BusinessForm setForm={setForm} />
    ];

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
                            </Route>
                            <Route path="/dashboard/bookingform">
                                <BookingForm/>
                            </Route>
                            <Route path="/dashboard/businesses">
                                <BusinessIndex/>
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
