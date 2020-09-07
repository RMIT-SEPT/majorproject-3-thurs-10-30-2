import React from 'react'
import {
    Form, Button
} from 'react-bootstrap'
import Calendar from 'react-calendar'
import Availability from './Availability'


class BookingForm extends React.Component {
    state = {
        date: new Date()
    }

    onChange = date => this.setState({ date })

    render() {
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
                                    <Form.Control as="select" size="sm" custom>
                                        <option>Any</option>
                                        <option>Anna</option>
                                        <option>Ben</option>
                                        <option>Chris</option>
                                        <option>Donna</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </Form>
                        <Availability />
                    </div>
                </div>
                <div className="text-center mt-4">
                    <Button variant="success" type="submit" >
                        <h3 className="m-0">Book</h3>
                    </Button>
                </div>
            </div>
        );
    }
}

export default BookingForm