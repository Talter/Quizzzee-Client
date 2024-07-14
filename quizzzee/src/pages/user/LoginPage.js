import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "../../css/Login.css";
import { Modal, notification, Input } from "antd";
import { UserContext } from "../../context/UserContext";

function LoginPage() {
  const navi = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(UserContext);

  const [toggleModal, setToggleModal] = useState(false);
  const [resetData, setResetData] = useState({
    email: "",
    password: "",
  });

  const [resetError, setResetError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // validate email
    if (resetData.email) {
      if (!validateEmail(resetData.email)) {
        setResetError((prev) => ({
          ...prev,
          email: "Invalid email format",
        }));
        return;
      } else {
        setResetError((prev) => ({ ...prev, email: "" }));
      }
    }
  }, [resetData.email]);

  useEffect(() => {
    // validate password
    if (resetData.password) {
      if (!validatePassword(resetData.password)) {
        setResetError((prev) => ({
          ...prev,
          password:
            "Password must be at least 6 characters long and should not contain special symbols",
        }));
        return;
      } else {
        setResetError((prev) => ({ ...prev, password: "" }));
      }
    }
  }, [resetData.password]);

  const handleToggleModal = (e) => {
    e.preventDefault();
    // Clear the form fields
    setEmail("");
    setPassword("");
    setToggleModal(true);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!resetData.email || !resetData.password) {
      openNotification("error", "Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/commons/forget-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...resetData,
            new_password: resetData.password,
          }),
        }
      );
      if (response.ok) {
        openNotification("success", "Password reset successful");
        setToggleModal(false);
      } else {
        const responseBody = await response.json();
        openNotification("error", responseBody.message);
      }
    } catch (error) {
      openNotification("error", "An error occurred, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      openNotification("error", "Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      openNotification("error", "Invalid email format");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      openNotification(
        "error",
        "Password must be at least 6 characters long and should not contain special symbols"
      );
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
            window.location.href = "/admin";
            break;
          case "superAdmin":
            window.location.href = "/sadmin";
            break;
          default:
            navi("/");
        }
      } else {
        openNotification("error", "Account or Password is Incorrect");
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      openNotification("error", "An error occurred, please try again later");
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
  useEffect(() => {
    const test = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/google', {
          method: 'GET', // Adjust the method as per your backend setup
          credentials: 'include', // Ensure credentials are included for cookie handling
        });
  
        if (!response.ok) {
          throw new Error('Failed to log in');
        }
  
        const data = await response.json();
        const { accessToken } = data;
  
        console.log('Access Token:', accessToken);
        // Handle the token (e.g., store it in local storage or context)
        localStorage.setItem('token', accessToken);
      } catch (error) {
        console.error('Login Error:', error);
      }
    }
  })

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/commons/auth/google`;
  };

  return (
    <div className="login-page">
      <div
        className="overlay text-white font-bold flex-col text-xl"
        style={{ display: loading ? "flex" : "none" }}
      >
        Entering Quizzzee...
        <div className="loading-bar"></div>
      </div>

      <Modal
        open={toggleModal}
        onCancel={() => setToggleModal(false)}
        footer={[]}
      >
        <form className="modal-form mx-3">
          <div className="font-bold text-xl">Forget Password</div>
          <div className="items-center justify-center flex flex-col">
            <input
              className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 text-lg"
              type="text"
              name="email"
              placeholder="Enter to verify Email"
              onChange={(e) =>
                setResetData({ ...resetData, email: e.target.value.trim() })
              }
              onClick={(e) => setResetError({ ...resetError, email: "" })}
            />
            {resetError.email !== "" && (
              <span className="text-md text-red-500 font-semibold">
                {resetError.email}
              </span>
            )}

            <br />

            <Input.Password
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500 w-full p-2 mt-3 text-lg"
              type="password"
              name="password"
              placeholder="Enter New password"
              onChange={(e) =>
                setResetData({ ...resetData, password: e.target.value })
              }
              onClick={(e) => setResetError({ ...resetError, password: "" })}
            />

            {resetError.password !== "" && (
              <span className="text-md text-red-500 font-semibold">
                {resetError.password}
              </span>
            )}

            <button
              className="login-confirm-btn w-full mt-10"
              onClick={handleResetPassword}
              disabled={resetError.email || resetError.password || loading}
            >
              Reset
            </button>
          </div>
        </form>
      </Modal>

      <div className="cloud-login-1"></div>
      <div className="cloud-login-2"></div>
      <div className="cloud-login-3"></div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <a className="login-title">Login</a>
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(password);
                }}
              />
              <div className="options">
                <button
                  href="#"
                  className="forget-password"
                  onClick={handleToggleModal}
                >
                  Forget Password?
                </button>
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
          <div className="login-btn-container">
            <button
              className="login-confirm-btn"
              type="submit"
              disabled={loading}
            >
              Login
            </button>
            <div className="login-gg-container" onClick={handleGoogleLogin}>
              G
            </div>
          </div>
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
