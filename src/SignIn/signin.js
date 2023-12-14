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
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const signin = async () => {
    const response = await client.signin(credentials);
    if (response) {
      setError(false);
      setUser(response);
      onHide();
      navigate("/profile");
    } else {
      setError(true);
    }
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
          type="password"
          placeholder="Password"
          style={{marginBottom: "0px"}}
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <div>
          {error ? (
            <label className="rm-sign-error">
              Username or password is incorrect.
            </label>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Button className="w-100" onClick={signin}>
        Sign in
      </Button>
    </div>
  );
}

export default SignIn;
