import React from 'react';
import "./Chat.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MessageForm from "../../Components/Message/MessageForm";

const Chat = () => {
    return (
        <div className='chat-container'>
            <div className='side-component'>
                <Sidebar />
            </div>

            <div className='message-component'>
                <MessageForm />
            </div>
        </div>
    )
};

export default Chat;
