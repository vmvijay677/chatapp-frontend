import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    return (
        <div className='home-container'>
            <div className='home-contents'>
                <p className='home-content-1'>Share your thoughts with your friends!</p>
                <p className='home-content-2'>MyChatApp helps you to connect and share with your friends wherever you are.</p>
                <Link to='/signup'>
                    <Button id='getstarted-button' variant='contained'>Get Started</Button>
                </Link>
            </div>

            <div>
                <img className='home-image' src='https://cdn2.stylecraze.com/wp-content/uploads/2019/07/151-Nicknames-For-Your-Best-Friends.jpg' alt='hoome-image'></img>
            </div>
        </div>
    )
};

export default Home;