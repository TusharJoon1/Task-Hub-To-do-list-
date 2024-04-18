import React, { useState } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

import "./signup.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3001/login', { email, password })
            .then(response => {
                console.log(response.data);
                if (response.data === "Success") {
                    sendEmail(email); // Call function to send email upon successful login
                    navigate('/list');
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    const sendEmail = async (email) => {
        Axios.post('http://localhost:3001/list', { email })
            .then(response => {
                console.log('Email sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Failed to send email:', error);
            });
    }

    return (
        <div>
            <div id="container">
                <form onSubmit={handleSubmit}>
                    <h1>Signup</h1>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="xyz@gmail.com"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="********"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Remember me
                        </label>
                    </div>
                    <button type="submit" className="aboutme" id="CV">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
