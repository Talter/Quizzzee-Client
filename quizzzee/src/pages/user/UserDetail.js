import React, { useState, useEffect, useContext } from "react";
import "../../css/UserSetting.css";
import { UserContext } from "../../context/UserContext";
import { LoadingOutlined } from "@ant-design/icons";
import { notification } from "antd";
import { isValid, parseISO } from 'date-fns';

function UserDetail() {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const { isLoggedIn, userId, token, logout } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  });
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/";
    }
  });
  const [isEditing, setIsEditing] = useState(false);

  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const [isImageUploading, setIsImageUploading] = useState(false);

  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      duration: 2,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFormData({
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          birthDate: data.birthDate,
        });
        setAvatar(data.image);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchData();
    } else return;
  }, [userId, avatar]);

  useEffect(() => {
    if (!isEditing) {
      setErrors({});
    }
  }, [isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const submitData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      openNotificationWithIcon("success", "Success", "Data updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to post data", error);
      openNotificationWithIcon("error", "Error", "Failed to update data");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      submitData();
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.username || !data.username.trim()) {
      errors.username = "*Username is required";
    } else if (!validateUsername(data.username)) {
      errors.username = "Invalid username"
    }
    if (!data.firstName || !data.firstName.trim()) {
      errors.firstName = "*First name is required";
    } else if (!validateFName(data.firstName)) {
      errors.firstName = "Invalid Name"
    }
    if (!data.lastName || !data.lastName.trim()) {
      errors.lastName = "*Last name is required";
    } else if (!validateLName(data.lastName)) {
      errors.lastName = "Invalid Name"
    }
    if (!data.email || !data.email.trim()) {
      errors.email = "*Email is required";
    } else if (!validateEmail(data.email)) {
      errors.email = "*Invalid email format";
    }
    if (!validateBirthDate(data.birthDate)) {
      errors.birthDate = "*Invalid birth date";
    }
    return errors;
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email));
  };

  const validateFName = (firstName) => {
    const emojiPattern = /[^\u0000-\u1F9FF\u2000-\u2BFF\uFB00-\uFFFD]+/;
    return !emojiPattern.test(firstName);
  };

  const validateLName = (lastName) => {
    const emojiPattern = /[^\u0000-\u1F9FF\u2000-\u2BFF\uFB00-\uFFFD]+/;
    return !emojiPattern.test(lastName);
  };

  const validateBirthDate = (birthDate) => {
    if (!isValid(parseISO(birthDate))) {
      return false;
    }
    const date = new Date(birthDate);
    const today = new Date();
    return date <= today;
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setIsImageUploading(true);

    handleUploadAvatar(file);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      logout();
    } catch(err){
      console.error("Failed:", err);
      openNotificationWithIcon("error", "Error", "Delete Failed");
    }
  }

  const handleUploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/image/upload/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setAvatar(result.image);
      openNotificationWithIcon(
        "success",
        "Success",
        "Avatar uploaded successfully"
      );
    } catch (error) {
      console.error("Failed to upload avatar", error);
      openNotificationWithIcon("error", "Error", "Failed to upload avatar");
    } finally {
      setIsImageUploading(false);
    }
  };

  return (
    <div className="user-acc-page">
      <div className="overlay text-white font-bold flex-col text-xl" style={{ display: loading ? 'flex' : 'none' }}>
        Updating...
        <div className="loading-bar"></div>
      </div>

      {contextHolder}

      <div className="setting-page-cloud"></div>
      <div className="setting-page-cloud-1"></div>
      <div className="setting-page-cloud-2"></div>
      <div className="avatar-bg"></div>
      <div className="main-container">
        <div className="user-avatar">
          {isImageUploading && (
            <span>
              <LoadingOutlined className="loading-icon" />
            </span>
          )}
          <img
            src={avatar || require("../../images/default/default-avatar.png")}
            alt=""
            className="avatar-image"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleAvatarChange}
              disabled={isImageUploading}
            />
          )}
        </div>
        <div className="user-acc-container">
          <a className="acc-setting">Account Setting</a>
          <form className="setting-form">
            <div className="data-input-field-form">
              <div className="username-edit">
                <label>Username:</label>
                <div>
                  <input
                    className="username-input"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  {errors.username && (
                    <span className="error">{errors.username}</span>
                  )}
                </div>
              </div>
              <div className="name-edit">
                <div className="first-name-part">
                  <label>First name:</label>
                  <div className="input-first-name">
                    <input
                      className="firstname-input"
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    {errors.firstName && (
                      <span className="error">{errors.firstName}</span>
                    )}
                  </div>
                </div>
                <div className="second-name-part">
                  <label>Last name:</label>
                  <div className="input-last-name">
                    <input
                      className="lastname-input"
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    {errors.lastName && (
                      <span className="error">{errors.lastName}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="email-edit">
                <label>Email:</label>
                <div>
                  <input
                    className="mail-input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="birthday">
                <label>Birth Date:</label>
                <div>
                  <input
                    className="DoB"
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  {errors.birthDate && (
                    <span className="error">{errors.birthDate}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="btn-setup">
              {isEditing ? (
                <button
                  className="dataform-confirm"
                  type="submit"
                  onClick={handleConfirmClick}
                >
                  Confirm
                </button>
              ) : (
                <button
                  className="dataform-edit"
                  type="button"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              )}
              <button
                className="dataform-delete-acc"
                type="button"
                onClick={() => handleDeleteUser()}
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
