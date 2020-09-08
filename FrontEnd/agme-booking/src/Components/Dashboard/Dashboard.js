import React, { useState } from 'react'
import {
    Button
} from 'react-bootstrap'
import { useTransition, animated } from 'react-spring'
import BookingForm from './User/BookingForm'
import CreateBookingButton from './User/CreateBookingButton';


function Dashboard() {

    const [bookingForm, setForm] = useState(0);
    const forms = [
        <CreateBookingButton setForm={setForm} />,
        <BookingForm setForm={setForm} />
    ];

    return (
        <div className="header-spacer container">
            <div className="row">
                <div className="col-lg-2">
                </div>
                <div className="col-lg-8">
                    {
                        forms[bookingForm]
                    }
                </div>
                <div className="col-lg-2">
                </div>
            </div>
        </div>
    )
}

export default Dashboard