import { IconButton } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import "./MessageForm.css";
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { AppContext } from '../../Context/appContext';

const MessageForm = () => {
    const [message, setMessage] = useState("");

    const user = useSelector((state) => state.user);

    const { socket, currentRoom, setMessages, messages, privateMemberMsg } = useContext(AppContext);

    const messageEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function getFormattedDate() {
        const date = new Date();

        const year = date.getFullYear();

        let month = (1 + date.getMonth()).toString();

        month = month.length > 1 ? month : "0" + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : "0" + day;
        return month + "/" + day + "/" + year;
    };

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message) return;
        const today = new Date();

        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();

        const time = today.getHours() + ":" + minutes;

        const roomId = currentRoom;

        socket.emit("message-room", roomId, message, user, time, todayDate);
        setMessage("");
    };

    const todayDate = getFormattedDate();

    socket.off("room-messages").on("room-messages", (roomMessages) => {
        setMessages(roomMessages);
    });

    return (
        <div className='message-container'>
            <div className='messages-output'>
                {user && !privateMemberMsg?._id && <div className="group-alert-info">Your conversation in {currentRoom} group</div>}

                {user && privateMemberMsg?._id && (
                    <>
                        <div className="group-alert-info">
                            <div>
                                Your conversation with {privateMemberMsg.name}
                            </div>
                        </div>
                    </>
                )}

                {user &&
                    messages.map(({ _id: date, messagesByDate }, idx) => (
                        <div key={idx}>
                            <p className="message-form-data">{date}</p>
                            {messagesByDate?.map(({ content, time, from: sender }, msgIdx) => (
                                <div key={msgIdx} className={sender?.email === user?.email ? 'message-details' : "other-message-details"}>
                                    <div className="message-pic-name">
                                        <img src={sender.picture} style={{ width: 35, height: 35, objectFit: "cover", borderRadius: "50%" }} alt='profile-pic' />
                                        <p className="message-sender">{sender._id === user?._id ? "You" : sender.name}</p>
                                    </div>

                                    <p className="message-content">{content}</p>
                                    <p className="message-timestamp">{time}</p>
                                </div>
                            ))}
                        </div>
                    ))}

                <div ref={messageEndRef} />
            </div>

            <div className='message-input-container'>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Enter message' value={message} onChange={(e) => setMessage(e.target.value)}></input>
                    </form>
                </div>

                <div>
                    <IconButton id='send-button' aria-label="delete" type='submit'>
                        <SendIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default MessageForm;