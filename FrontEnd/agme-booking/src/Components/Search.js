import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import { Button } from 'react-bootstrap'

function Search(business) {

    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState()

    const search = (query) => {
        var tempEmployees = []
        Axios.get('http://localhost:8080/api/users/search/' + query)
            .then((response) => {
                response.data.forEach(element => {
                    console.log(element)
                    tempEmployees.push(
                        <li key={element.id} onClick={() => selectEmployee({
                            "id": element.id,
                            "name": element.fullName,
                            "email": element.username
                        }
                        )}>
                            <h4>{element.fullName}</h4>
                            <h5>{element.username}</h5>
                        </li>
                    )
                });
                setEmployees(tempEmployees)
            }).catch(error => {
                setEmployees([])
            })
    }

    const selectEmployee = (user) => {
        setEmployee(
            <div>
                <h3>{user.name}</h3>
                <h4>{user.email}</h4>
                <Button onClick={() => saveEmployee(user.id)}>Add employee</Button>
            </div>
        )
    }

    const saveEmployee = (id) => {
        var user = {} 
        Axios.get('http://localhost:8080/api/users/' + id)
        .then((response) => {
            user = response.data
            user.employer_id = business.business.business.id
            
        })
    }

console.log(employees)
return (
    <div className="container">
        <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} />
            <input
                autocomplete="off"
                type="text"
                id="search-input"
                placeholder="Search"
                onChange={e => search(e.target.value)}
            />
        </div>
        <ul className="search-results">
            {employees}
        </ul>
        <div>
            {employee}
        </div>
    </div>
)
}

export default Search