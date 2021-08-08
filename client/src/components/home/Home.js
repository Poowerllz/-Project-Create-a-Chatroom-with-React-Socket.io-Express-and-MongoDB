import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import { Redirect } from 'react-router-dom'
import RoomList from './RoomList';
import io from 'socket.io-client'
let socket;

const Home = () => {
    const { user, setUser } = useContext(UserContext);
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([])
    const ENDPT = 'http://localhost:5000';
    useEffect(() => {
        socket = io(ENDPT);
        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [ENDPT])

    useEffect(() => {
        socket.on('output-rooms', rooms=> {
            setRooms(rooms)
        })
    }, [])

    useEffect(() => {
        socket.on('room-created', room => {
            setRooms([...rooms, room])
        })
    }, [room])

    useEffect(() => {
        console.log(rooms)
    }, [room])

    const handleSubmit = e => {
        e.preventDefault();
        socket.emit('create-room', room)
        console.log(room)
        setRoom('');
    }

    return (
        <div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Welcome {user ? user.name : ' '}</span>
                            <div className="row">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input placeholder="Enter a room name" id="room" type="text" className="validate" value={room} onChange={e => setRoom(e.target.value)} />
                                            <label htmlFor="room">First Name</label>
                                        </div>
                                    </div>
                                    <button className='btn'>Create Room</button>
                                </form>
                            </div>
                        </div>
                        <div className="card-action">
                            <a href="#">This is a link</a>
                            <a href="#">This is a link</a>
                        </div>
                    </div>
                </div>
                <div className='col s6 m5 offset-1'>
                    <RoomList rooms={rooms} />
                </div>
            </div>
            <h1>Home</h1>
        </div>
    )
}

export default Home;