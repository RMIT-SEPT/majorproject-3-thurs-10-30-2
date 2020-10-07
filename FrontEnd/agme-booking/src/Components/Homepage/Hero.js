import React, { useState } from 'react'
import HomepageControls from './HomepageControls'
import Login from './Login'
import SignUp from './SignUp'
import Register from "./Register"
import { useTransition, animated } from 'react-spring'

function Hero() {
    const [formsIndex, setForm] = useState(0)

    const forms = [
        <HomepageControls setForm={setForm} />,
        <Login setForm={setForm} />,
        <SignUp setForm={setForm} />,
        <Register setForm={setForm} />
    ]

    const transitions = useTransition(formsIndex, p => p, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-50%)' },
    })

    return (
        <div id="hero">
            <div className="absolute-center">
                {forms[formsIndex]}
            </div>
        </div>
    )
}

export default Hero