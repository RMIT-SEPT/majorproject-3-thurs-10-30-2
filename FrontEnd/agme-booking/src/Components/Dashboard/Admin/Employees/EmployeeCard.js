import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap';
import OpeningHours from '../Business/OpeningHours';

function EmployeeCard({ employee }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var dayRows = []
    employee.hours.forEach(element => {
        dayRows.push(
            <tr key={element.dayOfWeek}>
                <td>{element.dayOfWeek}</td>
                <td>{element.startTime} - {element.endTime}</td>
            </tr>)
    });

    const addOpeningHours = (hours) => {
        var day = hours.dayOfWeek;
        var index = this.state.days.indexOf(day);
        this.setState({ days: this.state.days.filter((_, i) => i !== index) });
        this.setState({ opening_hours: [...this.state.opening_hours, hours] });
    }

    return (
        <li className="w-75 my-1" key={employee.name + employee.id}>
            <Card className="p-1" id={employee.name + employee.id}>
                <Card.Title className="pl-4 m-0 text-left align-middle">
                    <div className="row">
                        <div className="col-sm-6 d.flex">
                            {employee.name}
                        </div>
                        <div className="col-sm-6 text-right">
                            <Button variant="info" className="mr-2" onClick={handleShow}>Edit</Button>
                            <Button variant="danger">Delete</Button>
                        </div>
                    </div>
                </Card.Title>
            </Card>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit {employee.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="business-form">
                        <table className="w-100">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dayRows}
                            </tbody>
                        </table>
                        <div className="employeeHours">
                        <OpeningHours addOpeningHours={addOpeningHours} days={employee.days} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success">Save</Button>
                </Modal.Footer>
            </Modal>
        </li>
    )
}


export default EmployeeCard