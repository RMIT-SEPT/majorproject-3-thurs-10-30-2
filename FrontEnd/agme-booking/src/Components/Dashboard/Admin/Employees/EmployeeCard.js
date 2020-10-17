import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap';
import axios from 'axios';


function EmployeeCard(employee) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var dayRows = []
    if (employee.employee.workerHours) {
        employee.employee.workerHours.forEach(element => {
            dayRows.push(
                <tr key={element.dayOfWeek}>
                    <td>{element.dayOfWeek}</td>
                    <td>{element.startTime} - {element.endTime}</td>
                </tr>)
        });
    }

    const [hours, setHours] = useState(employee.employee.workerHours)

    const handleHoursUpdate = key => e => {
        hours.forEach(element => {
            if (element.dayOfWeek == key) {
                element[e.target.name] = e.target.value;
            }
        });
    };

    var shifts = []
    employee.employee.workerHours.forEach(element => {
        shifts.push(
            <div>
                <span className="mr-4">
                    {element.dayOfWeek}
                </span>
                <input name="startTime" placeholder="Start time" onChange={handleHoursUpdate(element.dayOfWeek)} pattern="[0-9][0-9]:[0-9][0-9]" defaultValue={element.startTime} className="w-25">
                </input>
                <input name="endTime" placeholder="End time" onChange={handleHoursUpdate(element.dayOfWeek)} pattern="[0-9][0-9]:[0-9][0-9]" defaultValue={element.endTime} className="w-25">
                </input>
            </div>
        )
    });

    function updateHours() {
        var updatedEmployee = employee.employee
        updatedEmployee.workerHours = hours

        axios.post('http://localhost:8080/api/users/worker/' + updatedEmployee.id, {
            "workerHours": updatedEmployee.workerHours
        }).then((response) => {
            handleClose()
        });
    }

    return (
        <li className="w-75 my-1" key={employee.employee.fullName + employee.id}>
            <Card className="p-1" id={employee.employee.fullName + employee.id}>
                <Card.Title className="pl-4 m-0 text-left align-middle">
                    <div className="row">
                        <div className="col-sm-6 d.flex">
                            {employee.employee.fullName}
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
                    <Modal.Title>Edit {employee.employee.fullName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form id="opening-hours-form">
                            <div className="add-hours">
                                {shifts}
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={() => updateHours()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </li>
    )
}


export default EmployeeCard