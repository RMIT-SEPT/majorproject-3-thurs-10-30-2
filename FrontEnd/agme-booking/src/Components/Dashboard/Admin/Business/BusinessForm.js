import React from 'react'
import { Button } from 'react-bootstrap';
import OpeningHours from './OpeningHours';
import axios from 'axios';

class BusinessForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            opening_hours: [],
            days: [
                "MONDAY",
                "TUESDAY",
                "WEDNESDAY",
                "THURSDAY",
                "FRIDAY",
                "SATURDAY",
                "SUNDAY"
            ]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    addOpeningHours = (hours) => {
        var day = hours.dayOfWeek;
        var index = this.state.days.indexOf(day);
        this.setState({ days: this.state.days.filter((_, i) => i !== index) });
        this.setState({ opening_hours: [...this.state.opening_hours, hours] });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        if (!this.props.saveBusiness(this.state.name, this.state.opening_hours))
        {
            if (this.state.name === "") {
                alert("Business name missing")
            }
            else {
                alert("Please add business hours")
            }
        }
    }

    newOpeningHours(day) {
        console.log(this.state[day]);
        if (this.state[day] !== true) {
            this.setState({
                opening_hours: this.state.opening_hours.push({ "dayOfWeek": day }),
                [day]: true
            });
        };
    }

    render() {
        var dayRows = [];
        this.state.opening_hours.forEach(element => {
            dayRows.push(
                <tr key={element.dayOfWeek}>
                    <td>{element.dayOfWeek}</td>
                    <td>{element.startTime} - {element.endTime}</td>
                </tr>
            )
        });

        var form = "";
        if (this.state.days.length > 0) {
            form = <OpeningHours addOpeningHours={this.addOpeningHours} days={this.state.days} />
        };

        return (
            <div className="business-form">
                <h1>Register new business</h1>
                <label>Business Name</label>
                <br />
                <input required type="text" name="name" onChange={this.handleInputChange}></input>
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Opening hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dayRows}
                    </tbody>
                </table>
                {form}
                <Button variant="success" onClick={this.handleSubmit}>
                    Submit
                </Button>
                <Button variant="danger" type="submit" onClick={() => this.props.setForm(0)}>
                    <h4 className="mb-0">Cancel</h4>
                </Button>
            </div>
        );
    }
}

export default BusinessForm