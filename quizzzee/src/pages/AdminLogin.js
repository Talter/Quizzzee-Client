import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginAdmin.css";

function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://your-backend-url.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.token) {
                const tokenResponse = await fetch('https://your-backend-url.com/api/validate-token', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${data.token}`,
                    },
                });

                const token = true;

                if (token === true) {
                    navigate('/admin/super');
                } else {
                    navigate('/admin/common');
                }
            } else {
                navigate('/admin/common');
            }
        } catch (error) {
            console.error('Error:', error);
            navigate('/admin/common');
        }
    };

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
                <form className="loginAdmin-form" onSubmit={handleLogin}>
                    <div className="first-part">
                        <div className="input-field">
                            <input
                                type="email"
                                placeholder="Administration"
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
                    <button className="loginAdmin-confirm-btn" type="submit">Login as Administration</button>
                </form>
            </div>
        </div>
    );
}

export default LoginAdmin;
