import { Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Login.css";
import { useLoginUserMutation } from "../../Services/appApi";
import { useContext } from 'react';
import { AppContext } from '../../Context/appContext';
import Slide from 'react-reveal/Slide';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginUser, { isLoading, error }] = useLoginUserMutation();

    const history = useHistory();

    const { socket } = useContext(AppContext);

    const handleLogin = (e) => {
        e.preventDefault();

        loginUser({ email, password }).then(({ data }) => {
            if (data) {
                socket.emit("new-user");
                history.push("/chats");
            }
        });
    };

    const guestLogin = () => {
        setEmail("guest_user@example.com");
        setPassword("guestuser");
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <Slide left>
                    <h4>Login with your account!</h4>
                    {error ? <p id="error-message">{error.data.message}</p> : ""}
                    <form onSubmit={handleLogin}>
                        <label>Email</label><br />
                        <input type='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} required /><br />

                        <label>Password</label><br />
                        <input type='Password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password} required ></input><br />

                        <div>
                            <Button variant='contained' type='submit'>
                                {isLoading ? "Loading..." : "Login"}
                            </Button> &nbsp;
                            <Button variant='contained' onClick={guestLogin}>Login as guest</Button>
                        </div>
                    </form>
                    <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
                </Slide>
            </div>

            <div>
                <Slide right>
                    <img className='login-image' src='https://img.freepik.com/premium-photo/group-friends-forming-huddle_107420-23115.jpg?w=2000' alt='login-page'></img>
                </Slide>
            </div>
        </div>
    )
};

export default Login;