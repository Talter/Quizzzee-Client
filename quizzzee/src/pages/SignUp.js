import React from "react"
import "../css/SignUp.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function SignUp() {
    return (
        <div className="signUp-page">
            <div className="cloud-signUp"></div>
            <div className="cloud-signUp-1"></div>
            <div className="cloud-signUp-2"></div>
            <div className="cloud-signUp-3"></div>
            <div className="signUp-container">
                <a className="signUp-title">Sign Up</a>
                <form className="signUp-form">
                    <div className="first-part">
                        <div className="input-field">
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Password" />
                        </div>
                    </div>
                    <button className="signUp-confirm-btn" type="submit">Sign Up</button>
                    <br />
                    <Link className="had-acc-btn" to="/login">
                        <button type="submit">Aleady had an account?</button>
                    </Link>
                </form>
            </div >
        </div>
    );
}

export default SignUp