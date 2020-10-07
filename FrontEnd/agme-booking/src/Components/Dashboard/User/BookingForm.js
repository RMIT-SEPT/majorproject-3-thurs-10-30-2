import React from 'react'
import axios from 'axios';
import {
    Form, Button, Col,
} from 'react-bootstrap'
import Calendar from 'react-calendar'
class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessId: window.location.href.split("/").pop(),
            businesses: [],
            date: new Date(),
            duration: '',
            customer: '',
            employee: 'Any',
            worker: [],
            startTime: '',
            endTime: ''
        }
        axios.get('http://localhost:8080/api/user')
            .then((response) => {
                this.setState({ worker: response.data })
            });
        axios.get('http://localhost:8080/api/Business')
            .then((response) => {
                this.setState({ businesses: response.data })
            });
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChange = date => {
        this.setState({ date });
        var dateform = date.toString();
        var datesplit = dateform.split(' ');
        var dateString = datesplit[3] + "-" + this.monthCheck(date.getMonth() + 1) + "-" + this.dayCheck(date.getDate()) + "-";
        this.setState({ ...this.state.startTime, dateString });
        console.log(dateString);
    }
    monthCheck(month) {
        if (month < 10) {
            month = "0" + month
            return month;
        }
        return month;
    }
    dayCheck(day) {
        if (day < 10) {
            day = "0" + day
            return day;
        }
        return day;
    }
    handleChange(event) {
        var choice = event.target.value;
        var selectedWorker;
        this.employee = this.state.worker.map((employee) => {
            if (choice === employee.name) {
                selectedWorker = employee;
            }
        });
        this.setState({ ...this.state.worker, selectedWorker });
        console.log(selectedWorker.name);
    }
    handleStartTime(event) {
        var timeStart = event.target.value;
        this.setState({
            ...this.state.startTime, timeStart
        });
        console.log(timeStart);
    }
    handleEndTime(event) {
        var timeEnd = event.target.value;
        this.setState({
            ...this.state.startTime, timeEnd
        });
        console.log(timeEnd);
    }
    /*need to replace some text with variables*/
    handleSubmit() {
        axios({
            method: "POST",
            // url: 'http://agmeapi-env.eba-aw96pwjm.us-east-1.elasticbeanstalk.com/api/bookings',
            url: 'http://localhost:8080/api/bookings',
            headers: {},
            data: {
                "duration": 2,
                "customer": {
                    "id": 1,
                    "name": "customer",
                    "email": "customer@hotmail.com",
                    "password": "231asdsd12x",
                    "accountType": "CUSTOMER"
                },
                "worker": {
                    "id": this.state.selectedWorker.id,
                    "name": this.state.selectedWorker.name,
                    "email": this.state.selectedWorker.email,
                    "password": this.state.selectedWorker.password,
                    "accountType": this.state.selectedWorker.accountType
                },
                "startTime": this.state.dateString + this.state.timeStart,
                "endTime": this.state.dateString + this.state.timeEnd
            }

        }).then(function (response) {
            if (response.status === 201) {
                console.log("booking created");
                window.location.href = '/dashboard/bookings';
            }
            console.log(response);
        });
    }
    render() {

        // const times = {
        //     Donna: [
        //         { startTime: 10, endTime: 11 },
        //         { startTime: 12, endTime: 13 },
        //         { startTime: 15, endTime: 16 }
        //     ],
        //     Anna: [
        //         { startTime: 10, endTime: 11 },
        //         { startTime: 12, endTime: 13 },
        //         { startTime: 15, endTime: 16 }
        //     ]
        // };

        // const employees = Object.keys(times).map(key =>
        //     <option key={key} value={key}>{key}</option>);

        const workers = [];//only contains the names
        this.state.worker.forEach(element => {
            workers.push(
                <option>{element.name}</option>
            )
        });
        // const slots = []
        // if (this.state.employee === 'Any') {
        //     Object.keys(times).map(key =>
        //         slots.push(<AvailabilityCard empName={key} times={times[key]} />))
        // }
        // else {
        //     slots.push(<AvailabilityCard empName={this.state.employee} times={times[this.state.employee]} />)
        // }
        var name;
        this.select = this.state.businesses.map((select) => {
            console.log(select.id);
            if (this.state.businessId === select.id.toString()) {
                name = select.name.toString();
            }

        })
        return (
            <div id="booking-form">
                <h2>{name}</h2>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
                <div id="booking-availability">
                    <h2>
                        {
                            new Intl.DateTimeFormat("en-GB", {
                                weekday: 'long',
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            }).format(this.state.date)
                        }
                    </h2>
                    <div className="row">
                        <Form id="booking-refinement">
                            <Form.Group as={Col} sm={4} controlId="formEmployee">
                                <Form.Label>Employee</Form.Label>
                                <Form.Control as="select" onChange={this.handleChange.bind(this)}>
                                    <option key="Any" value="Any">Any</option>
                                    {workers}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} sm={4} controlId="formStartTime">
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="text" placeholder="HH:mm" onChange={this.handleStartTime.bind(this)} />
                            </Form.Group>

                            <Form.Group as={Col} sm={4} controlId="formEndTime">
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="text" placeholder="HH:mm" onChange={this.handleEndTime.bind(this)} />
                            </Form.Group>
                        </Form>
                        {/* {slots} */}
                    </div>
                </div>
                <div className="text-center mt-4">
                    <Button variant="success" size="lg" onClick={this.handleSubmit}>
                        <h5 className="mb-0">Book</h5>
                    </Button>{' '}
                    <Button variant="danger" type="submit" size="lg" onClick={() => window.location.href = '/dashboard'}>
                        <h5 className="mb-0">Cancel</h5>
                    </Button>
                </div>
            </div >
        );
    }
}

export default BookingForm
