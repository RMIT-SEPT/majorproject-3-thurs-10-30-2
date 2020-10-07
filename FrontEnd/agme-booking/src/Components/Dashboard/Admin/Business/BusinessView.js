import React from 'react'
import EmployeeCard from '../Employees/EmployeeCard'

class BusinessCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }

        this.state.employees = [
            { name: "Anna", id: 1, days: ["Monday"], hours: [{dayOfWeek: "Monday", startTime: "09:00", endTime: "17:00"}] },
            { name: "Donna", id: 2, days: ["Monday"], hours: [{dayOfWeek: "Monday", startTime: "09:00", endTime: "17:00"}] },
            { name: "Chris", id: 3, days: ["Monday"], hours: [{dayOfWeek: "Monday", startTime: "09:00", endTime: "17:00"}] }
        ]
    }

    render() {

        var employeeCards = []

        this.state.employees.forEach(element => {
            employeeCards.push(
                <EmployeeCard employee={element} />
            )
        });

        return (
            //TODO add id for business here
            <div key={1}>
                <hr />
                <h3> Upcoming bookings </h3>
                <ul>
                </ul>
                <h3>Employees</h3>
                <ul className="list-unstyled d-flex align-items-center flex-column">
                    {employeeCards}
                </ul>
            </div>
        )
    }
}
export default BusinessCard