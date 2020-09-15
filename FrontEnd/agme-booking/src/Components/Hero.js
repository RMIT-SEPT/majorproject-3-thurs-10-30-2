import React, { useState } from 'react'
import HomepageControls from './HomepageControls'
import Login from './Login'
import SignUp from './SignUp'
import { useTransition, animated } from 'react-spring'

function Hero() {
    const [formsIndex, setForm] = useState(0)

    const forms = [
        ({ style }) => <animated.div style={{ ...style }}><HomepageControls setForm={setForm} /></animated.div >,
        ({ style }) => <animated.div style={{ ...style }}><Login setForm={setForm} /></animated.div >,
        ({ style }) => <animated.div style={{ ...style }}><SignUp setForm={setForm} /></animated.div >
    ]

    const transitions = useTransition(formsIndex, p => p, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-50%)' },
    })

    return (
        <div id="hero">
            <div className="absolute-center">
                {transitions.map(({ item, props, key }) => {
                    const Form = forms[item]
                    return <Form key={key} style={props} />
                }
                )}
            </div>
        </div>
    )
}

export default Hero