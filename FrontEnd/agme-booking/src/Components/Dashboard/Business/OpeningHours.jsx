import React from 'react'
import { Button } from 'react-bootstrap';

class OpeningHours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayOfWeek: "",
            startTime: "",
            endTime: ""
        };
    }

    handleSubmit = () => {
        this.props.addOpeningHours(
            {
                "dayOfWeek": this.state.dayOfWeek,
                "startTime": this.state.startTime,
                "endTime": this.state.endTime
            });
        document.getElementById("opening-hours-form").reset();
    }

    handleTimeChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        var dayOpts = [];
        this.props.days.forEach(element => {
            dayOpts.push(
                <option value={element} key={element}>
                    {element}
                </option>
            )
        });

        var addButton = <Button variant="secondary">Add</Button>
        if (this.state.startTime !== "" && this.state.endTime !== "") {
            addButton = <Button variant="success" onClick={this.handleSubmit}>Add</Button>
        }

        return (
            <div>
                <form id="opening-hours-form">
                    <select name="dayOfWeek" defaultValue="placeholder" onChange={this.handleTimeChange.bind(this)}>
                        <option value="placeholder" disabled={true}>
                            Select day
                    </option>
                        {dayOpts}
                    </select>
                    <input name="startTime" onChange={this.handleTimeChange.bind(this)}>
                    </input>
                    <input name="endTime" onChange={this.handleTimeChange.bind(this)}>
                    </input>
                    {addButton}
                </form>
            </div>
        )
    }
}

export default OpeningHours