import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faCalendarWeek
} from '@fortawesome/free-solid-svg-icons'
import { Card } from 'react-bootstrap';
import BusinessView from './BusinessView'

function BusinessCard(business) {

    const [view, setView] = useState("");

    const showView = () => {
        if (view === "") {
               setView(<BusinessView business={business.business} />)
        }
        else {
            setView("")
        }
    }
    return (
        
        <Card className="w-75 text-dark" id="business-1">
            <div className="p-4 align-middle" role="button" onClick={() => { showView() }}>
                <Card.Title className="text-left m-0">
                    <div className="row">
                        <div className="col-sm-6">
                            {business.business.name}
                        </div>
                        <div className="col-sm-6 text-right">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            <span className="mr-4">99</span>
                            <FontAwesomeIcon icon={faCalendarWeek} className="mr-2" />
                            <span>99</span>
                        </div>
                    </div>
                </Card.Title>
            </div>
            {view}
        </Card >

    )
}


export default BusinessCard