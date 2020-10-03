import React, { useState } from 'react'
import BusinessForm from './Business/BusinessForm';
import BookingForm from './User/BookingForm'
import CreateBookingButton from './User/CreateBookingButton';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import BusinessIndex from './Business/BusinessIndex';
import WorkerDash from './Worker/WorkerDash';


function Dashboard() {

    const [bookingForm, setForm] = useState(3);
    const forms = [
        <CreateBookingButton setForm={setForm} />,
        <BookingForm setForm={setForm} />,
        <BusinessForm setForm={setForm} />,
        <WorkerDash setForm={setForm} />
    ];

    return (
        <div className="header-spacer container">
            <div className="row">
                <div className="col-lg-2">
                </div>
                <div className="col-lg-8">

                    <Router>
                        <Switch>
                            <Route exact path="/dashboard">
                                {
                                    forms[bookingForm]
                                }
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