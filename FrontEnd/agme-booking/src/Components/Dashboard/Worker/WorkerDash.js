import React, { useState } from "react";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';


function WorkerDash() {

    const [currentWorker, setCurrentWorker] = useState([]);
    const [workerHours, setWorkerHours] = useState([]);


    axios.get('http://localhost:8080/api/User/worker/1')
        .then((response) => {
            //this.setState({ currentWorker: response.data })
            setCurrentWorker(response.data)
            //console.log(this.state.currentWorker)
            //this.setState({ workerHours: response.data.workerHours })
            setWorkerHours(response.data.workerHours)
            //console.log(this.state.workerHours)
        });

    var workingHours = [];
    workerHours.forEach(element => {
        workingHours.push(
            <h4>{element.dayOfWeek}</h4>
        )
        workingHours.push(
            <p>{element.startTime} - {element.endTime}</p>
        )
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="header-spacer container">
            <h1>Hello {currentWorker.name}</h1>
            <h2>Your Working Hours</h2>
            {workingHours}
            <Button variant="success" onClick={handleShow}>
                    Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Your Availability</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label>
                            Monday
                            <input
                                name="Monday"
                                type="checkbox"
                                checked={setDow} />
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )

    }

export default WorkerDash