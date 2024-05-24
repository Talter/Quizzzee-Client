import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "../../css/Login.css";

function LoginPage() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="login-page">
            <div className="cloud-login"></div>
            <div className="cloud-login-1"></div>
            <div className="cloud-login-2"></div>
            <div className="cloud-login-3"></div>
            <div className="login-container">
                <a className="login-title">Login</a>
                <form className="login-form">
                    <div className="first-part">
                        <div className="input-field">
                            <input type="text" placeholder="Username" />
                        </div>
                        <div className="input-field">
                            <input type="password" placeholder="Password" />
                            <div className="options">
                                <a href="#" className="forget-password">Forget Password?</a>
                                <div className="remember-me">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="remember-checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor="remember" className="remember-label">
                                        <span className={`checkbox-custom ${isChecked ? 'checked' : ''}`}></span>
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="login-confirm-btn" type="submit">Login</button>
                    <br />
                    <Link className="create-acc-btn" to="/signup">
                        <button type="submit">Need an account?</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
