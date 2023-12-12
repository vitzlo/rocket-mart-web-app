import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../Utils/Users/client";

function SignIn({ onHide, setUser }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const signin = async () => {
    const response = await client.signin(credentials);
    setUser(response);
    onHide();
    navigate("/profile");
  };
  return (
    <div className="rm-sign-user">
      <div>
        <label>Username</label> <br />
        <input
          className="w-100"
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <br />
        <label>Password</label> <br />
        <input
          className="w-100"
          type="text"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </div>
      <Button className="w-100" onClick={signin}>
        Sign in
      </Button>
    </div>
  );
}

export default SignIn;