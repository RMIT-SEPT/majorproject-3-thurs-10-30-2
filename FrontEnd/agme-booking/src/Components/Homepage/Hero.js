import React, { useState } from 'react'
import HomepageControls from './HomepageControls'
import Login from './Login'
import SignUp from './SignUp'
import Register from "./Register"

function Hero() {
    const [formsIndex, setForm] = useState(0)

    const forms = [
        <HomepageControls setForm={setForm} />,
        <Login setForm={setForm} />,
        <SignUp setForm={setForm} />,
        <Register setForm={setForm} />
    ]

    return (
        <div id="hero">
            <div className="absolute-center">
                {forms[formsIndex]}
            </div>
        </div>
    )
}

export default Hero