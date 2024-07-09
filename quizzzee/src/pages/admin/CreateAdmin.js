import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

function CreateAdmin() {
  const { token } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    const user = {
      username,
      email,
      password,
      role: "admin",
    };
    console.log(JSON.stringify(user));
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/admins/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <div className="text-xl text-center">Create New Admin</div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 mt-12 text-lg px-96 text-center pb-12"
      >
        <label for="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="w-96 justify-self-center border border-black rounded-lg px-12"
        />
        <label for="email">Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-96 justify-self-center border border-black rounded-lg px-12"
        />
        <label for="password">Password</label>
        <input
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="w-96 justify-self-center border border-black rounded-lg px-12"
        />
        <button className="bg-mainColor mt-12 w-48 justify-self-center rounded-lg text-white py-2">Submit</button>
      </form>
    </div>
  );
}

export default CreateAdmin;
