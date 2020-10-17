import React from 'react'
import Search from './Search'


function addEmployee(business) {
    
    var workers = [
        {"id": 1},
        {"id": 2}
    ]

    const fetchWorkers = () => {

    }

    return (
        <div>
            <Search business={business.business}/>
        </div>
    )
}

export default addEmployee