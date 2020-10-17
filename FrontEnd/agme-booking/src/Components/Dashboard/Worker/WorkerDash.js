import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Card, Modal } from 'react-bootstrap';


function WorkerDash() {

    // const [currentWorker, setCurrentWorker] = useState([]);
    const [currentWorker, setWorker] = useState([]);
    const [workingHours, setWorkingHours] = useState([]);

    const [workerBookings, setWorkerBookings] = useState([]);
    // const [workerHours, setWorkerHours] = useState([]); handleClose()

    const [dow, setDow]  = useState(
    {
        "MONDAY": false,
        "TUESDAY": false,
        "WEDNESDAY": false,
        "THURSDAY": false,
        "FRIDAY": false,
        "SATURDAY": false,
        "SUNDAY": false
    });

    useEffect(() => {
        if (currentWorker.length === 0) {
            axios.get('http://localhost:8080/api/users/worker/' + JSON.parse(localStorage.user).id,{headers: {
                    "Authorization": localStorage.token
                    }
                })
                .then((response) => {
                    var tempWorker = response.data
                    var tempWorkingHours = []
                    var tempDow = {}
                    tempWorker.workerHours.forEach(element => {
                        tempDow[element.dayOfWeek] = true;
                        var li = ""
                        if (element.startTime === null) {
                            li =
                                <li>
                                    <h4>{element.dayOfWeek}</h4>
                                    <p>Not assigned yet</p>
                                </li >
                        } else {
                            li =
                                <li>
                                    <h4>{element.dayOfWeek}</h4>
                                    <p>{element.startTime} - {element.endTime}</p>
                                </li >
                        }
                        tempWorkingHours.push(li)
                    });
                    console.log(workingHours)
                    setWorker(tempWorker)
                    setWorkingHours(tempWorkingHours)
                    setDow(tempDow)
                });
            axios.get('http://localhost:8080/api/users/' + JSON.parse(localStorage.user).id + '/bookings',{headers: {
                        "Authorization": localStorage.token
                    }
                })
                .then((response) => {
                    var tempWorkerList = []
                    var tempWorkerBookings = response.data
                    console.log(tempWorkerBookings)
                    tempWorkerBookings.forEach(element => {
                        var li =
                        <li>
                            <h4>Booking ID: {element.id}</h4>
                            <h6>Business: {element.businessName}</h6>
                            <h6>Date: {element.startTime.substring(0,10)}</h6>
                            <h4>Customer Details</h4>
                            <p>Name: {element.customer.fullName}</p>
                            <p>Email: {element.customer.username}</p>
                            <p>{element.startTime.substring(11,16)} - {element.endTime.substring(11,16)}</p>
                        </li>
                        tempWorkerList.push(li)
                    })
                    setWorkerBookings(tempWorkerList)
                });
                
        }
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //const [dow, setDow] = useState(

    const handleChange = day => e => {
        dow[day] = e.target.checked;
        console.log(dow)
    }

    const handleSubmit = e => {

        var tempWorkerHours = [];
        for (var key in dow) {
            currentWorker.workerHours.forEach(element => {
                if (element.dayOfWeek === key && dow[key] === true) {
                    dow[key] = false
                    tempWorkerHours.push(element)
                    console.log(element)
                }
            });
            if (dow[key] === true) {
                var tempAA = {
                    "dayOfWeek": key,
                    "startTime": null,
                    "endTime": null
                }
                tempWorkerHours.push(
                    tempAA
                )
            }
        }
        console.log(tempWorkerHours)
        currentWorker.workerHours = tempWorkerHours
        console.log(currentWorker)

        axios.post('http://localhost:8080/api/users/worker/' + currentWorker.id, {
            "workerHours": currentWorker.workerHours
        }).then((response) => {
            setWorker([]);
            handleClose()
        });
    }

    return (
        <div className="header-spacer container">
            <h1>Hello {currentWorker.fullName}</h1>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2>Your Working Hours</h2>
                    </Card.Title>
                    <ul className="list-unstyled">
                        {workingHours}
                    </ul>
                    <Button variant="success" onClick={handleShow}>
                        Edit
                    </Button>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2>Your Bookings</h2>
                    </Card.Title>
                    <ul className="list-unstyled">
                        {workerBookings}
                    </ul>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Your Availability</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>
                            <input type="checkbox" defaultChecked={dow.MONDAY} onChange={handleChange("MONDAY")} />
                        Monday
                    </label>
                        <br />
                        <label>
                            <input type="checkbox" defaultChecked={dow.TUESDAY} onChange={handleChange("TUESDAY")} />
                        Tuesday
                    </label>
                        <br />
                        <label>
                            <input type="checkbox" defaultChecked={dow.WEDNESDAY} onChange={handleChange("WEDNESDAY")} />
                        Wednesday
                    </label>
                        <br />
                        <label>
                            <input type="checkbox" defaultChecked={dow.THURSDAY} onChange={handleChange("THURSDAY")} />
                        Thursday
                    </label>
                        <br />
                        <label>
                            <input type="checkbox" defaultChecked={dow.FRIDAY} onChange={handleChange("FRIDAY")} />
                        Friday
                    </label>
                        <br />
                        <label>
                            <input type="checkbox" defaultChecked={dow.SATURDAY} onChange={handleChange("SATURDAY")} />
                        Saturday
                    </label>
                        <br />
                        <label>
                            <input type="checkbox" defaultChecked={dow.SUNDAY} onChange={handleChange("SUNDAY")} />
                        Sunday
                    </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    ) // Display bookings for worker below availability

}

export default WorkerDash