import React from 'react'
import axios from 'axios';
import {
    Form, Button, Dropdown
} from 'react-bootstrap'
import Calendar from 'react-calendar'
import AvailabilityCard from './AvailabilityCard'
import BookingIndex from './BookingIndex'
class BookingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            business: '',
            businesses: [],
            date: new Date(),
            duration: ' ',
            employee: 'Any'
        }
        // to display available businesses.
        // axios.get('http://localhost:8080/api/Business')
        //     .then((response) => {
        //         this.setState({ businesses: response.data })
        //     });
        // this.handleSubmit = this.handleSubmit.bind(this);
    
    }
    onChange = date => this.setState({ date })

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }
    changeBusinessValue(text) {
        this.setState({ business: text })
    }

    handleSubmit() {
        axios({
            method: "POST",
            // url: 'http://agmeapi-env.eba-aw96pwjm.us-east-1.elasticbeanstalk.com/api/bookings',
            url: 'http://localhost:8080/api/bookings',
            headers: {},
            data: {
                "booking": {
                    "duration": this.state.duration
                    //customer
                    //worker(employee)
                    //startTime
                    //endTime
                },

            }
        }).then(function (response) {
            if (response.status === 201) {
                window.location.href = '/dashboard/bookings';
            }
            console.log(response);
        });
    }
    render() {
        var businessesList = [];
        this.state.businesses.forEach(element => {
            businessesList.push(
                element.name
            )
        });

        const times = {
            Donna: [
                { startTime: 10, endTime: 11 },
                { startTime: 12, endTime: 13 },
                { startTime: 15, endTime: 16 }
            ],
            Anna: [
                { startTime: 10, endTime: 11 },
                { startTime: 12, endTime: 13 },
                { startTime: 15, endTime: 16 }
            ]
        };

        const employees = Object.keys(times).map(key =>
            <option key={key} value={key}>{key}</option>)
        const slots = []

        //pushes the available times for an employee.
        if (this.state.employee === 'Any') {
            Object.keys(times).map(key =>
                slots.push(<AvailabilityCard empName={key} times={times[key]} />))
        }
        else {
            slots.push(<AvailabilityCard empName={this.state.employee} times={times[this.state.employee]} />)
        }

        return (
            <div id="booking-form">
                business Name
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
                            {/* <div className="col-sm-6">
                                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                    <Form.Label>Service</Form.Label>
                                    <Form.Control as="select" size="sm" custom>
                                        <option>Any</option>
                                        <option>Foo</option>
                                        <option>Bar</option>
                                        <option>Baz</option>
                                    </Form.Control>
                                </Form.Group>
                            </div> */}
                            <div className='col-sm-6'>
                                <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                                    <Form.Label>Available Times</Form.Label>
                                    <Form.Control as="select" size="sm" custom onChange={this.handleChange('employee')}>
                                        <option key="Any" value="Any">select a time</option>
                                      
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-sm-6">
                                <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                                    <Form.Label>Employee</Form.Label>
                                    <Form.Control as="select" size="sm" custom onChange={this.handleChange('employee')}>
                                        <option key="Any" value="Any">Any</option>
                                        {employees}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </Form>
                        {slots}
                    </div>
                </div>
                <div className="text-center mt-4">
                    <Button variant="success" onClick={this.handleSubmit}>
                        <h4 className="mb-0">Book</h4>
                    </Button>
                    <Button variant="danger" type="submit" onClick={() => this.props.setForm(0)}>
                        <h4 className="mb-0">Cancel</h4>
                    </Button>
                </div>
            </div >
        );
    }
}

export default BookingForm