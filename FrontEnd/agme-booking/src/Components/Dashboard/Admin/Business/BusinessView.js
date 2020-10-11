import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap';
import AddEmployee from '../Employees/AddEmployee';
import EmployeeCard from '../Employees/EmployeeCard'

function BusinessCard(business) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var employeeCards = []
    // this.state.employees.forEach(element => {
    //     employeeCards.push(
    //         <EmployeeCard employee={element} />
    //     )
    // });

    var dayRows = [];
    console.log(business.business)
    business.business.businessHours.forEach(element => {
        dayRows.push(
            <tr key={element.dayOfWeek}>
                <td className="text-left">{element.dayOfWeek}</td>
                <td className="text-right">{element.startTime} - {element.endTime}</td>
            </tr>
        )
    });

    return (
        <div key={business.id}>
            <hr />
            <h3> Opening Hours </h3>
            <div className="d-flex justify-content-center my-4">
                <table className="w-75">
                    <thead>
                        <tr>
                            <th className="text-left">Day</th>
                            <th className="text-right">Opening hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dayRows}
                    </tbody>
                </table>
            </div>
            <h3> Upcoming bookings </h3>
            <ul>
            </ul>
            <h3>Employees</h3>
            <ul className="list-unstyled d-flex align-items-center flex-column">
                <div className="my-2">
                    <Button variant="success" onClick={handleShow}>
                        Add Employee
                    </Button>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddEmployee business={business}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                    </Button>
                        <Button variant="success">Save</Button>
                    </Modal.Footer>
                </Modal>
                {employeeCards}
            </ul>
        </div>
    )
}

export default BusinessCard