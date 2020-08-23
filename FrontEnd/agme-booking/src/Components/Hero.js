import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Header from './Header'
import HomepageControls from './HomepageControls'
import Login from './Login'
import SignUp from './SignUp'

function Hero() {
    const [showForm, setForm] = useState(0)

    let form

    if (showForm == 0) {
        form = <HomepageControls setForm={setForm}/>

    }
    if (showForm == 1) {
        form = <Login setForm={setForm}/>
    }
    if (showForm == 2) {
        form = <SignUp setForm={setForm}/>
    }
    if (showForm == 3) {

    }

    return (
        <div id="hero">
            <div className="absolute-center">
                {form}
            </div>
        </div>
    )
}

export default Hero