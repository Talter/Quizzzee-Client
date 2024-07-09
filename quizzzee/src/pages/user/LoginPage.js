import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "../../css/Login.css";

import { UserContext } from "../../context/UserContext";

function LoginPage() {
  const navi = useNavigate();

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  //Auth Client
  const { login } = useContext(UserContext);

  //API values
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  //API fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        console.log(responseBody);
        const { user_id, access, role } = responseBody;
        login(user_id, access, rememberMe);
        console.log(role);
        switch(role){
          case 'user':{
            navi("/");
            break;
          }
          case 'admin':{
            window.location.href = "/admin";
            break;
          }
          case 'superAdmin':{
            window.location.href = "/sadmin";
          }
        }
      } else {
        // Login failed
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-page">
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
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="remember" className="remember-label">
                    <span
                      className={`checkbox-custom ${
                        rememberMe ? "checked" : ""
                      }`}
                    ></span>
                    Remember Me
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button className="login-confirm-btn" type="submit">
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
