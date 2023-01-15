import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../../Context/appContext';
import "./Sidebar.css";
import { addNotifications, resetNotifications } from "../../Features/userSlice";

const Sidebar = () => {
    const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();

    function joinRoom(room, isPublic = true) {
        if (!user) {
            return alert("Please login to continue!");
        }
        socket.emit("join-room", room, currentRoom);
        setCurrentRoom(room);

        if (isPublic) {
            setPrivateMemberMsg(null);
        }
        dispatch(resetNotifications(room));
    };

    socket.off("notifications").on("notifications", (room) => {
        if (currentRoom !== room) dispatch(addNotifications(room));
    });

    useEffect(() => {
        if (user) {
            setCurrentRoom("general");
            getRooms();
            socket.emit("join-room", "general");
            socket.emit("new-user");
        }
    }, []);

    socket.off("new-user").on("new-user", (payload) => {
        setMembers(payload);
    });

    function getRooms() {
        fetch("https://chatapp-backend-five.vercel.app/rooms")
            .then((res) => res.json())
            .then((data) => setRooms(data));
    };

    function orderIds(id1, id2) {
        if (id1 > id2) {
            return id1 + "-" + id2;
        } else {
            return id2 + "-" + id1;
        }
    };

    function handlePrivateMemberMsg(member) {
        setPrivateMemberMsg(member);
        const roomId = orderIds(user._id, member._id);

        joinRoom(roomId, false);
    };

    if (!user) {
        return <></>;
    };

    return (
        <div className='sidebar-container'>
            <h5 className='group-chat-head'>Group chats</h5>
            {rooms.map((room, index) => (
                <p className='group-name' key={index} onClick={() => joinRoom(room)} style={{ background: room === currentRoom ? "skyblue" : "", display: "flex", justifyContent: "space-between" }}>
                    {room}
                    {currentRoom !== room && <span className="message-numbers-group" style={{ display: user.newMessages[room] ? "" : "none" }}>{user.newMessages[room]}</span>}
                </p>
            ))}

            <br />

            <h5 className='normal-chat-head'>Normal chats</h5>
            <div style={{ overflow: "auto", maxHeight: "265px" }}>
                {members.map((member) => (
                    <div className='group-name' key={member.id} onClick={() => handlePrivateMemberMsg(member)} style={{ background: privateMemberMsg?._id === member?._id ? "skyblue" : "", display: member._id === user._id ? "none" : "" }}>
                        <div className='member-status-with-messages'>
                            <div className='member-status-details'>
                                <img src={member.picture} className='member-status-img' alt='profile-pic'></img>

                                <div>
                                    <p style={{ margin: "0px" }}>{member.name}</p>
                                    <p style={{ margin: "0px" }}>
                                        {member.status === "online" ? <i className="fas fa-circle sidebar-online-status"></i> : <i className="fas fa-circle sidebar-offline-status"></i>}
                                        <span className='member-status-o-f'>{member.status === "online" ? "online" : "offline"}</span>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <span className="message-numbers" style={{ display: user.newMessages[orderIds(member._id, user._id)] ? "" : "none" }}>{user.newMessages[orderIds(member._id, user._id)]}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;