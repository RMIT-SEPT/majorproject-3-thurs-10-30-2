import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'

function Search(items, param) {

    const [employees, setEmployees] = useState([])
    const [employee, setEmployee] = useState({})

    const search = (query) => {
        var tempEmployees = []
        Axios.get('http://localhost:8080/api/users/search/' + query)
            .then((response) => {
                response.data.forEach(element => {
                    console.log(element)
                    tempEmployees.push(
                        <li key={element.id} onClick={selectEmployee(element.id)}>
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

    const selectEmployee = () => {

    }

    console.log(employees)
    return (
        <div className="container">
            <FontAwesomeIcon icon={faSearch} />
            <label className="search-label" htmlFor="search-input">
                <input
                    autocomplete="off"
                    type="text"
                    id="search-input"
                    placeholder="Search Employees"
                    onChange={e => search(e.target.value)}
                />
            </label>
            <ul>
                {employees}
            </ul>
        </div>
    )
}

export default Search