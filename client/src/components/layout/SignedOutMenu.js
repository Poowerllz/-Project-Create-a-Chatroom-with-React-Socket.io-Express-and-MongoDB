import React from 'react'
import { Redirect } from 'react-router-dom'

const SignedOutMenu = () => {
    return (
        <div>
            <li><Redirect to="/login">Login</Redirect></li>
            <li><Redirect to="Signup">Signup</Redirect></li>
        </div>
    )
}

export default SignedOutMenu
