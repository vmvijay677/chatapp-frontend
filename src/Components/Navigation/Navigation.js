import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Navigation.css";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../Services/appApi";

const Navigation = () => {
    const user = useSelector((state) => state.user);

    const [logoutUser] = useLogoutUserMutation();

    const history = useHistory();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logoutUser(user);
        history.push("/");
    };

    return (
        <div className='navigation-container'>
            <div className='app-logo'>
                <img src='https://products.containerize.com/live-chat/signalapp/menu_image.png' alt='app-logo'></img>
                <p><Link to='/'>MyChatApp</Link></p>
            </div>

            <div className='navbars'>
                {user && (
                    <>
                        <img className='nav-user-image' src={user.picture} alt='profile-pic'></img>
                        <p>{user.name}</p>
                    </>
                )}
                <p><Link to="/chats">Chats</Link></p>

                {!user && (
                    <p><Link to="/login">Login</Link></p>
                )}

                {user && (
                    <p onClick={handleLogout}>Logout</p>
                )}
            </div>
        </div>
    );
};

export default Navigation;