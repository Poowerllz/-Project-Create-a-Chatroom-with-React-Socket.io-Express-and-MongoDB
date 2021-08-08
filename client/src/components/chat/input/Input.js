import React from 'react'
import './Input.css'

const Input = ({message, setMessage, sendMessage}) => {
    return (
        <div>
            <form action="" onSubmit={sendMessage} className="form">
                <input type="text" className="input" placeholder="Escreva uma mensagem."
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button className="sendButton" onClick={sendMessage}>Send Message</button>
            </form>
        </div>
    )
}

export default Input
