import React, { useState } from 'react'
import BookingForm from './User/BookingForm'


function Dashboard() {
    return (
        <div className="header-spacer container">
            <div className="row">
                <div className="col-lg-2">
                </div>
                <div className="col-lg-8">
                    <BookingForm />
                </div>
                <div className="col-lg-2">
                </div>
            </div>
        </div>
    )
}

export default Dashboard