import React from "react";
import axios from 'axios'


class WorkerDash extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentWorker: [],
            workerHours: []
        }

        axios.get('http://localhost:8080/api/User/worker/1')
            .then((response) => {
                this.setState({ currentWorker: response.data })
                console.log(this.state.currentWorker)
                this.setState({ workerHours: response.data.workerHours })
                console.log(this.state.workerHours)
            });
    }

    render() {

        var workingHours = [];
        this.state.workerHours.forEach(element => {
            workingHours.push(
                <h4>{element.dayOfWeek}</h4>
            )
            workingHours.push(
                <p>{element.startTime} - {element.endTime}</p>
            )
        });

    return (
        <div>
            <h1>Hello {this.state.currentWorker.name}</h1>
            <h2>Your Working Hours</h2>
            {workingHours}
        </div>
    )

    }
}

export default WorkerDash