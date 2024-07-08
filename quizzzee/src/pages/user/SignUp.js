import React, { useState } from "react";
import "../../css/SignUp.css";
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');
    const navy = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setPopupMessage('Invalid email format');
            setPopupType('error');
            return;
        }

        const user = { username, email, password };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/commons/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                setPopupMessage('Sign up successful! Redirecting to login...');
                setPopupType('success');
                setTimeout(() => {
                    navy('/login');
                }, 3000);
            } else {
                setPopupMessage('Sign up failed. Please try again.');
                setPopupType('error');
            }
        } catch (error) {
            setPopupMessage('An error occurred. Please try again.');
            setPopupType('error');
        }
    }

    return (
        <div className="signUp-page">
            {popupMessage && (
                <div className={`popup ${popupType}`}>
                    {popupMessage}
                </div>
            )}
            <div className="cloud-signUp"></div>
            <div className="cloud-signUp-1"></div>
            <div className="cloud-signUp-2"></div>
            <div className="cloud-signUp-3"></div>
            <div className="signUp-container">
                <div className="signUp-title">
                    <a>Sign Up</a>
                </div>
                <form className="signUp-form" onSubmit={handleSignUp}>
                    <div className="first-part">
                        <div className="input-field">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="signUp-confirm-btn" type="submit">Sign Up</button>
                    <br />
                    <Link className="had-acc-btn" to="/login">
                        <button type="button">Already have an account?</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignUp;