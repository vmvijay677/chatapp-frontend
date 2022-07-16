import { Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Signup.css";
import { useSignupUserMutation } from "../../Services/appApi";
import Slide from 'react-reveal/Slide';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [signupUser, { error }] = useSignupUserMutation();

    const history = useHistory();

    const validateImg = (e) => {
        const file = e.target.files[0];

        if (file.size >= 1048576) {
            return alert("Max file size is 1MB!");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async () => {
        const data = new FormData();

        data.append("file", image);
        data.append("upload_preset", "ufcryk1v");
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/dgisqvumx/image/upload", {
                method: "post",
                body: data,
            });

            const urlData = await res.json();

            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!image) return alert("Please upload your profile picture!");

        const url = await uploadImage(image);

        signupUser({ name, email, password, picture: url }).then(({ data }) => {
            if (data) {
                history.push("/chats");
            }
        });
    };

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <Slide left>
                    <h4>Create your new account!</h4>
                    {error ? <p id="error-message">{error.data.message}</p> : ""}

                    <form onSubmit={handleSignup}>
                        <div className="signup-profile-pic-container">
                            <img src={imagePreview || "https://cdn.wallpapersafari.com/13/22/kSCTAd.jpg"} className="signup-profile-pic" alt='signup-profile' />
                            <label htmlFor="image-upload" className="image-upload-label">
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                        </div>

                        <label>Name</label><br />
                        <input type='text' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} value={name} /><br />

                        <label>Email</label><br />
                        <input type='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} /><br />

                        <label>Password</label><br />
                        <input type='Password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password} ></input><br />

                        <Button variant='contained' type='submit'>
                            {uploadingImg ? "Loading..." : "Signup"}
                        </Button>
                    </form>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </Slide>
            </div>

            <div>
                <Slide right>
                    <img className='signup-image' src='https://i.pinimg.com/originals/6b/6e/60/6b6e603a58e5fb148cb7ffa3792ba6f5.jpg' alt='signup-page'></img>
                </Slide>
            </div>
        </div>
    )
};

export default Signup;