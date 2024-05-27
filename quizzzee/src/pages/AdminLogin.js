import React, { useState } from "react";
import "../css/LoginAdmin.css";

function LoginAdmin() {
    return (
        <div className="loginAdmin-page">
            <div className="cloud-admin"></div>
            <div className="cloud-admin-1"></div>
            <div className="cloud-admin-2"></div>
            <div className="cloud-admin-3"></div>
            <div className="cloud-admin-foot"></div>
            <div className="cloud-admin-foot-1"></div>
            <div className="cloud-admin-foot-2"></div>
            <div className="loginAdmin-container">
                <div className="loginAdmin-title">
                    <a>Administration Login</a>
                </div>
                <form className="loginAdmin-form">
                    <div className="first-part">
                        <div className="input-field">
                            <input
                                type="email"
                                placeholder="Administration"
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <button className="loginAdmin-confirm-btn" type="submit">Login as Administration</button>
                </form>
            </div>
        </div>
    );
}

export default LoginAdmin;
