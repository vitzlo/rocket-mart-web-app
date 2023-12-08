import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../Utils/Users/client";

function SignIn(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/profile");
  };
  return (
  <div>
        <div>
    <label>Username</label> <br />
    <input
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
      type="text"
      placeholder="Password"
      value={credentials.password}
      onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })
      }
    />
  </div>
  <Button
    className="w-50"
    onClick={() => {
      signin();
      props.onHide();
    }}
  >
    Sign in
  </Button>
  </div>
  );
}

export default SignIn;
