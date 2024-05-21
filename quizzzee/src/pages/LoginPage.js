import React from "react"
import Header from "../components/layout/Header.js"
import "../css/Login.css";

function LoginPage() {
    return (
        <div className="login-page">
            <Header />
            <div className="cloud 0">
            </div>
            <div className="cloud-second"></div>
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
                                    <label className="remember">Remember Me</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="login-confirm-btn" type="submit">Login</button>
                    <br />
                    <button className="create-acc-btn" type="submit">Need an account?</button>
                </form>
            </div >
        </div>
    );
}

export default LoginPage