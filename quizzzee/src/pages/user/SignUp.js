import React, { useState } from "react";
import "../../css/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!email || !password || !username) {
            openNotification('error', 'Please fill in all fields');
            setLoading(false);
            return;
        }

        if (!validateUsername(username)) {
            openNotification('error', 'Username should not contain special charactrs');
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            openNotification('error', 'Invalid email format');
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            openNotification('error', 'Password must be at least 6 characters long and should not contain special symbols');
            setLoading(false);
            return;
        }

        const user = { username: username, email: email, password: password };

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/commons/signup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                }
            );

            if (response.ok) {
                openNotification('success', 'Sign up successful! Redirecting to login...');
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                openNotification('error', 'Sign up failed. Please try again.');
            }
        } catch (error) {
            openNotification('error', 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9]+$/;
        return regex.test(username);
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email));
    };

    const validatePassword = (password) => {
        const emojiPattern = /[^\u0000-\u1F9FF\u2000-\u2BFF\uFB00-\uFFFD]+/;
        return password.length >= 6 && !emojiPattern.test(password);
    };

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
            duration: 2,
        });
    };

    return (
        <div className="signUp-page">
            <div className="overlay text-white font-bold flex-col text-xl" style={{ display: loading ? 'flex' : 'none' }}>
                Signing up...
                <div className="loading-bar"></div>
            </div>
            <div className="cloud-signUp-1"></div>
            <div className="cloud-signUp-2"></div>
            <div className="cloud-signUp-3"></div>
            <div className="signUp-container">
                <form className="signUp-form" onSubmit={handleSignUp}>
                    <a className="signUp-title">Sign Up</a>
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
                    <button className="signUp-confirm-btn" type="submit" disabled={loading}>
                        Sign Up
                    </button>
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
