import React from 'react'
import { Button } from 'react-bootstrap';
import EmployeeCard from '../Employees/EmployeeCard'

class BusinessCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }

        this.state.employees = [
            { name: "Anna", id: 1, days: ["Monday", "Tuesday"], hours: [{ dayOfWeek: "Monday", startTime: "09:00", endTime: "17:00" }] },
            { name: "Donna", id: 2, days: ["Monday"], hours: [{ dayOfWeek: "Monday", startTime: "09:00", endTime: "17:00" }] },
            { name: "Chris", id: 3, days: ["Monday"], hours: [{ dayOfWeek: "Monday", startTime: "09:00", endTime: "17:00" }] }
        ]
    }

    render() {

        var employeeCards = []
        this.state.employees.forEach(element => {
            employeeCards.push(
                <EmployeeCard employee={element} />
            )
        });

        var dayRows = [];
        this.props.business.businessHours.forEach(element => {
            dayRows.push(
                <tr key={element.dayOfWeek}>
                    <td className="text-left">{element.dayOfWeek}</td>
                    <td className="text-right">{element.startTime} - {element.endTime}</td>
                </tr>
            )
        });

        return (
            <div key={this.props.business.id}>
                <hr />
                <h3> Opening Hours </h3>
                <div className="d-flex justify-content-center my-4">
                    <table className="w-75">
                        <thead>
                            <tr>
                                <th className="text-left">Day</th>
                                <th className="text-right">Opening hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dayRows}
                        </tbody>
                    </table>
                </div>
                <h3> Upcoming bookings </h3>
                <ul>
                </ul>
                <h3>Employees</h3>
                <ul className="list-unstyled d-flex align-items-center flex-column">
                    <div className="my-2">
                        <Button variant="success">
                            Add Employee
                        </Button>
                    </div>
                    {employeeCards}
                </ul>
            </div>
        )
    }
}
export default BusinessCard