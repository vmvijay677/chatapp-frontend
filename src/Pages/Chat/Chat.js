import React from 'react';
import "./Chat.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import MessageForm from "../../Components/Message/MessageForm";
import Slide from 'react-reveal/Slide';

const Chat = () => {
    return (
        <div className='chat-container'>
            <div className='side-component'>
                <Slide left>
                    <Sidebar />
                </Slide>
            </div>

            <div className='message-component'>
                <Slide right>
                    <MessageForm />
                </Slide>
            </div>
        </div>
    )
};

export default Chat;
