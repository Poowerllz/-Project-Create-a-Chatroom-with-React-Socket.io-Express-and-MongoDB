import React from 'react'
import Message from '../message/Message'

const Messages = ({ messages, user_id }) => {
    console.log(messages);
    return (
        <div>
            {messages.map((message, index) => (
                <Message key={message._id} message={message} current_uid={user_id}></Message>
            ))}
        </div>
    )
}

export default Messages
