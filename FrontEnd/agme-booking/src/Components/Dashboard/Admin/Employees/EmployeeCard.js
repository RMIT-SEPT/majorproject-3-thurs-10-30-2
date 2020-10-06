import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faCalendarWeek
} from '@fortawesome/free-solid-svg-icons'
import { Button, Card } from 'react-bootstrap';

class EmployeeCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <li className="w-75 my-1" key={this.props.employee.name + this.props.employee.id}>
                <Card className="p-1">
                    <Card.Title className="pl-4 m-0 text-left align-middle">
                        <div className="row">
                            <div className="col-sm-6 d.flex">
                                {this.props.employee.name}
                            </div>
                            <div className="col-sm-6 text-right">
                                <Button variant="info" className="mr-2">Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </div>
                        </div>
                    </Card.Title>
                </Card>
            </li>
        )
    }
}

export default EmployeeCard