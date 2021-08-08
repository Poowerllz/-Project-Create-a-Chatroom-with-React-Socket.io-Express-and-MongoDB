import { UserContext } from '../../UserContext'
import React, { useContext } from 'react'

import  SignedInMenu from './SignedInMenu'
import  SignedOutMenu from './SignedOutMenu'



import {
    Link
} from "react-router-dom";

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    const logout = async () => {
        try {
            const res = await fetch('http://localhost:5000/logout', {
                credentials: 'include',
            })
            const data = res.json()
            console.log('logout data', data)
            setUser(null);
        }
        catch (err) {
            console.log(err);
        }
    }
    const menu = user ? <SignedInMenu logout={logout} /> : <SignedOutMenu />
    return (
        <>
            <nav className="green">
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">Chat</a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {menu}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="Signup">Signup</Link></li>
                <li><a onClick={logout} href="#">Logout</a></li>
            </ul>
        </>

    )
}


export default Navbar
