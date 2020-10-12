import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';


function WorkerDash() {

    const [currentWorker, setCurrentWorker] = useState([]);
    const [workerHours, setWorkerHours] = useState([]);

    // Add request for getting bookings for current worker
    useEffect(() => {

        axios.get('http://localhost:8080/api/users/worker/'+JSON.parse(localStorage.user).id)
        .then((response) => {
            setCurrentWorker(response.data)
            setWorkerHours(response.data.workerHours)
        });

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
        
        dow.forEach(element => {
            console.log(element)
        })
        console.log(dow);
        setShow(false);
    }

    // const handlePost = e=>{

    //     axios.put("http://localhost:8080/api/User/{currentWorker.id}", {
    //         {
    //             "workerHours": [
    //                 // Loop if dow == true, if initial was true and dow is true no change
    //                 // For any new days StartTime/EndTime == NULL
    //                 {
    //                     "dayOfWeek": "MONDAY",
    //                     "startTime": "09:00",
    //                     "endTime": "17:00"
    //                 },
    //                 {
    //                     "dayOfWeek": "TUESDAY",
    //                     "startTime": "09:00",
    //                     "endTime": "17:00"
    //                 }
    //             ],
    //         }
    //       });

    // }

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
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="checkbox" checked={dow.MONDAY} onChange={()=>handleChange("MONDAY")} />
                        Monday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.TUESDAY} onChange={()=>handleChange("TUESDAY")} />
                        Tuesday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.WEDNESDAY} onChange={()=>handleChange("WEDNESDAY")} />
                        Wednesday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.THURSDAY} onChange={()=>handleChange("THURSDAY")} />
                        Thursday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.FRIDAY} onChange={()=>handleChange("FRIDAY")} />
                        Friday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.SATURDAY} onChange={()=>handleChange("SATURDAY")} />
                        Saturday
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" checked={dow.SUNDAY} onChange={()=>handleChange("SUNDAY")} />
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