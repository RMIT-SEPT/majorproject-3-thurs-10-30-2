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

    const [dow, setDow] = useState([{"MONDAY":false,
    "TUESDAY":false,
    "WEDNESDAY":false,
    "THURSDAY":false,
    "FRIDAY":false,
    "SATURDAY":false,
    "SUNDAY":false}]);

    const handleChange = day => e => {
        setDow({day: e.target.value});
    }

    const handleSubmit = e=> {
        
        console.log(dow);
        setShow(false);
    }

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
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="checkbox" checked={dow.MONDAY} onChange={handleChange("MONDAY")} />
                        Monday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.TUESDAY} onChange={handleChange("TUESDAY")} />
                        Tuesday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.WEDNESDAY} onChange={handleChange("WEDNESDAY")} />
                        Wednesday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.THURSDAY} onChange={handleChange("THURSDAY")} />
                        Thursday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.FRIDAY} onChange={handleChange("FRIDAY")} />
                        Friday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.SATURDAY} onChange={handleChange("SATURDAY")} />
                        Saturday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.SUNDAY} onChange={handleChange("SUNDAY")} />
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
        
    )

    }

export default WorkerDash