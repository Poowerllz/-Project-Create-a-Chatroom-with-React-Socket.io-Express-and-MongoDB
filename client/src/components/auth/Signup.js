import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext'
import {Redirect} from 'react-router-dom'

const Signup = () => {
    const { user, setUser } = useContext(UserContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const submitHandler = async e => {   
        e.preventDefault();
        setNameError('');
        setNameError('');
        setPasswordError(''); 
        console.log(name, email, password)
        try{
            const res = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if(data.errors){
                setEmailError(data.errors.email);
                setNameError(data.erros.name)
                setPasswordError(data.error.password)
            }
            if(data.user){
                setUser(data.user)
            }
            if(user){
                return <Redirect to="/"/>
            }
        }catch(err){

        }
    }
    return (

        <div className="row">
            <h2>Signup</h2>
            <form className="col s12" onSubmit={submitHandler}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="name" type="text" className="validate"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <div className="name error red-text">{nameError}</div>
                        <label htmlFor="name">Name</label>
                    </div>

                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className="email error red-text">{emailError}</div>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="password error red-text">{passwordError}</div>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>

                <button className="btn">Sign up</button>
            </form>
        </div>

    )
}

export default Signup
