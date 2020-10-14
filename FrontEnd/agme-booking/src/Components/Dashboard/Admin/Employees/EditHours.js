import React from 'react'
const { useState } = require("react")

function EditHours(employee) {
    const [hours, setHours] = useState(employee.workingHours)

    var shifts = []
    console.log(employee)
    employee.workingHours.forEach(element => {
        shifts.push(
            <div>
                <span>
                    {element.dayOfWeek}
                </span>
                <input name="startTime" placeholder="Start time" pattern="[0-9][0-9]:[0-9][0-9]">
                </input>
                <input name="endTime" placeholder="End time" pattern="[0-9][0-9]:[0-9][0-9]">
                </input>
            </div>
        )
    });

    return (
        <div>
            <form id="opening-hours-form">
                <div className="add-hours">
                </div>
            </form>
        </div>
    )
}
export default EditHours