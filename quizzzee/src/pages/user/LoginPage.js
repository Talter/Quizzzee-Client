import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import { notification } from "antd";
import { UserContext } from "../../context/UserContext";

function LoginPage() {
  const navi = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      openNotification('error', 'Please fill in all fields');
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

    const userData = {
      email: email,
      password: password,
      rememberMe: rememberMe,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/commons/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const responseBody = await response.json();
        const { user_id, access, role } = responseBody;
        login(user_id, access, rememberMe);

        switch (role) {
          case "user":
            navi("/");
            break;
          case "admin":
            window.location.href ="/admin";
            break;
          case "superAdmin":
            window.location.href = "/sadmin";
            break;
          default:
            navi("/");
        }
      } else {
        openNotification('error', 'Account or Password is Incorrect');
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      openNotification('error', 'An error occurred, please try again later');
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email));
  };

  const validatePassword = (password) => {
    const emojiPattern = /[^\u0000-\u1F9FF\u2000-\u2BFF\uFB00-\uFFFD]+/;
    return password.length >= 6 && !emojiPattern.test(password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 2,
    });
  };

  return (
    <div className="login-page">
      <div className="overlay text-white font-bold flex-col text-xl" style={{ display: loading ? 'flex' : 'none' }}>
        Entering Quizzzee...
        <div className="loading-bar"></div>
      </div>
      <div className="cloud-login"></div>
      <div className="cloud-login-1"></div>
      <div className="cloud-login-2"></div>
      <div className="cloud-login-3"></div>
      <div className="login-container">
        <a className="login-title">Login</a>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="first-part">
            <div className="input-field">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="options">
                <a href="#" className="forget-password">
                  Forget Password?
                </a>
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember"
                    className="remember-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember" className="remember-label">
                    <span
                      className={`checkbox-custom ${rememberMe ? "checked" : ""}`}
                    ></span>
                    Remember Me
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button className="login-confirm-btn" type="submit" disabled={loading}>
            Login
          </button>
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
