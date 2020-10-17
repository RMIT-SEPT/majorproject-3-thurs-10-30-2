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
            bName:'',
            date: new Date(),
            duration: '',
            customer: '',
            employee: 'Any',
            worker: [],
            startTime: '',
            endTime: ''
        }
        //GET: should be changed to getting the list of workers for a business
        axios.get('http://localhost:8080/api/Business/'+ window.location.href.split("/").pop()+ '/employees',{
            headers: {
                "Authorization": localStorage.token
            }
        })
            .then((response) => {
                this.setState({ worker: response.data })
            });
        axios.get('http://localhost:8080/api/Business', {
            headers: {
                "Authorization": localStorage.token
            }
        })
            .then((response) => {
                this.setState({ businesses: response.data })
            });
        // this.businessNameset = this.businessNameset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    businessNameset() {
        this.select = this.state.businesses.map((select) => {
            if (this.state.businessId === select.id.toString()) {
                var name = select.name.toString();
                this.setState({ ...this.state.bName, name });
                console.log(name);
            }
        })
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
        this.businessNameset();
        var choice = event.target.value;
        var selectedWorker;
        this.employee = this.state.worker.map((employee) => {
            if (choice === employee.fullName) {
                selectedWorker = employee;
            }
        });
        this.setState({ ...this.state.worker, selectedWorker });
        console.log(selectedWorker.username);
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
    /*need to replace some text with variables
    * should redirect to a list of bookings for the user(getBookings() currently not working).
    */
    handleSubmit() {
        //sets the businessName for bookings.
        axios({
            method: "POST",
            // url: 'http://agmeapi-env.eba-aw96pwjm.us-east-1.elasticbeanstalk.com/api/bookings',
            url: 'http://localhost:8080/api/bookings',
            headers: {
                "Authorization": localStorage.token
            },
            data: {
                "businessName": this.state.name,
                "customer": {
                    "id": JSON.parse(localStorage.user).id,
                    "fullName": JSON.parse(localStorage.user).fullName,
                    "email": JSON.parse(localStorage.user).email,
                    "accountType": JSON.parse(localStorage.user).accountType,
                },
                "worker": {
                    "id": this.state.selectedWorker.id,
                    "fullName": this.state.selectedWorker.fullName,
                    "email": this.state.selectedWorker.email,
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
        /*populates workers array with workers under the business selected for dropbox */
        const workers = [];
        this.selectWorker = this.state.worker.map((selectWorker) => {
            workers.push(
                <option>{selectWorker.fullName}</option>
            )
        }) 
        /*Used to set the name of business selected*/
        var name;
        this.select = this.state.businesses.map((select) => {
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
