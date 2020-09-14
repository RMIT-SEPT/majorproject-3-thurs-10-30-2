import React from 'react'
import {
    Form, Button
} from 'react-bootstrap'
import Calendar from 'react-calendar'
import AvailabilityCard from './AvailabilityCard'


class BookingForm extends React.Component {
    state = {
        date: new Date(),
        employee: 'Any'
    }

    onChange = date => this.setState({ date })

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    render() {

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

        if (this.state.employee === 'Any') {
            Object.keys(times).map(key =>
                slots.push(<AvailabilityCard empName={key} times={times[key]} />))
        }
        else {
            slots.push(<AvailabilityCard empName={this.state.employee} times={times[this.state.employee]} />)
        }

        return (
            <div id="booking-form">
                <h1 className="text-center">
                    Business Name
                </h1>
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
                            <div className="col-sm-6">
                                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                    <Form.Label>Service</Form.Label>
                                    <Form.Control as="select" size="sm" custom>
                                        <option>Any</option>
                                        <option>Foo</option>
                                        <option>Bar</option>
                                        <option>Baz</option>
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
                    <Button variant="success" type="submit" className="mr-4">
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