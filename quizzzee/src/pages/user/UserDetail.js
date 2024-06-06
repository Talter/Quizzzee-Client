import React, { useState, useEffect, useContext } from "react";
import "../../css/UserSetting.css";
import { UserContext } from "../../context/UserContext";

function UserDetail() {
    const { isLoggedIn, userId, logout } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        birthday: "",
        password: ""
    });
    useEffect(() => {
        if(!isLoggedIn){
            window.location.href="/";
        }
    })
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `http://localhost:8080/api/users/${userId}`
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
                birthday: data.birthday,
                password: "",
            })

            console.log(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        if (userId) {
          fetchData();
        } else return;
      }, [userId]);

    const [isEditing, setIsEditing] = useState(false);

    const [avatar, setAvatar] = useState("");
    const [errors, setErrors] = useState({});

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
        console.log(JSON.stringify(formData));
        try {
          const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
      
          const result = await response.json();
          console.log('Data posted successfully:', result);
        } catch (error) {
          console.error('Failed to post data', error);
        }
      };
      

    const handleConfirmClick = (e) => {
        e.preventDefault();
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length === 0) {
            submitData();
            setIsEditing(false);
        } else {
            setErrors(formErrors);
        }
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            setFormData({
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                birthday: "",
                password: "",
            });
            setAvatar("");
        }
    };

    const validateForm = (data) => {
        const errors = {};
        console.log(data);
        if (!data.username || !data.username.trim()) {
            errors.username = "*Username is required";
        }
        if (!data.firstName || !data.firstName.trim()) {
            errors.firstName = "*First name is required";
        }
        if (!data.lastName || !data.lastName.trim()) {
            errors.lastName = "*Last name is required";
        }
        if (!data.email || !data.email.trim()) {
            errors.email = "*Email is required";
        } else if (!isValidEmail(data.email)) {
            errors.email = "*Invalid email format";
        }
        if (!data.password || !data.password.trim()) {
            errors.password = "*Password is required";
        }
        return errors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(URL.createObjectURL(file));
    };

    return (
        <div className="user-acc-page">
            <div className="setting-page-cloud"></div>
            <div className="setting-page-cloud-1"></div>
            <div className="setting-page-cloud-2"></div>
            <div className="avatar-bg"></div>
            <div className="main-container">
                <div className="user-avatar">
                    <img src={avatar || require("../../images/default/default-avatar.png")} alt="" className="avatar-image" />
                    {isEditing && (
                        <input type="file" accept="image/*" onChange={handleAvatarChange} />
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
                                    {errors.username && <span className="error">{errors.username}</span>}
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
                                        {errors.firstName && <span className="error">{errors.firstName}</span>}
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
                                        {errors.lastName && <span className="error">{errors.lastName}</span>}
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
                                    {errors.email && <span className="error">{errors.email}</span>}
                                </div>
                            </div>
                            <div className="birthday">
                                <label>Birthday:</label>
                                <div>
                                    <input
                                        className="DoB"
                                        type="date"
                                        name="birthday"
                                        value={formData.birthday}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                            <div className="password-edit">
                                <label>Password:</label>
                                <div>
                                    <input
                                        className="password-input"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                    {errors.password && <span className="error">{errors.password}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="btn-setup">
                            {isEditing ? (
                                <button className="dataform-confirm" type="submit" onClick={handleConfirmClick}>Confirm</button>
                            ) : (
                                <button className="dataform-edit" type="button" onClick={handleEditClick}>Edit</button>
                            )}
                            <button className="dataform-delete-acc" type="button" onClick={handleDeleteClick}>Delete Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
