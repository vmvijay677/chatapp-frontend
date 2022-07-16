import React from 'react';
import "./LoginAlert.css";
import Slide from 'react-reveal/Slide';

const LoginAlert = () => {
    return (
        <div className='login-alert-container'>
            <div>
                <Slide left>
                    <p className='login-alert-message'>Kindly Login or Signup to continue...!</p>
                </Slide>
            </div>

            <div>
                <Slide right>
                    <img className='login-alert-image' src='https://img.freepik.com/premium-photo/group-friends-doing-road-trip_23-2148196397.jpg?w=2000' alt='login-alert'></img>
                </Slide>
            </div>
        </div>
    );
};

export default LoginAlert;