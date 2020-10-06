import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faCalendarWeek
} from '@fortawesome/free-solid-svg-icons'
import { Card } from 'react-bootstrap';
import BusinessView from './BusinessView'

class BusinessCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { businessView: "" };
    }

    showView() {
        if (this.state.businessView === "") {
            this.setState({
                businessView: <BusinessView/>
            });
        }
        else {
            this.setState({
                businessView: ""
            });
        }
    }

    render() {

        var busView = this.state.businessView

        return (
            <a className="w-75 text-dark" role="button" onClick={() => { this.showView() }}>
                <Card className="p-4 align-middle" id="business-1">
                    <Card.Title className="text-left m-0">
                        <div className="row">
                            <div className="col-sm-6">
                                Business Name
                            </div>
                            <div className="col-sm-6 text-right">
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                <span className="mr-4">99</span>
                                <FontAwesomeIcon icon={faCalendarWeek} className="mr-2" />
                                <span>99</span>
                            </div>
                        </div>
                    </Card.Title>
                    {busView}
                </Card>
            </a>
        )
    }
}

export default BusinessCard