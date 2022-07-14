import React from 'react';
import "./LoginAlert.css";

const LoginAlert = () => {
    return (
        <div className='login-alert-container'>
            <div>
                <p className='login-alert-message'>Kindly Login or Signup to continue...!</p>
            </div>

            <div>
                <img className='login-alert-image' src='https://img.freepik.com/premium-photo/group-friends-doing-road-trip_23-2148196397.jpg?w=2000' alt='login-alert'></img>
            </div>
        </div>
    );
};

export default LoginAlert;