import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';


function WorkerDash() {

    // const [currentWorker, setCurrentWorker] = useState([]);
    var currentWorker = [];
    var workingHours = [];
    // const [workerHours, setWorkerHours] = useState([]);
    // Add request for getting bookings for current worker

    var dow = 
    {
    "MONDAY":false,
    "TUESDAY":false,
    "WEDNESDAY":false,
    "THURSDAY":false,
    "FRIDAY":false,
    "SATURDAY":false,
    "SUNDAY":false
    };

    useEffect(() => {

        axios.get('http://localhost:8080/api/users/worker/'+JSON.parse(localStorage.user).id)
        .then((response) => {
            currentWorker = response.data
            console.log(currentWorker);
            currentWorker.workerHours.forEach(element => {
                dow[element.dayOfWeek] = true;
                workingHours.push(
                    <h4>{element.dayOfWeek}</h4> 
                )
                workingHours.push(
                    <p>{element.startTime} - {element.endTime}</p>
                )
            });
        });

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
                if(element.dayOfWeek === key){
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

        axios.put('http://localhost:8080/api/users/worker/'+JSON.parse(localStorage.user).id, {
            currentWorker
          });
    }

    return (
        <div className="header-spacer container">
            <h1>Hello {currentWorker.fullName}</h1>
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