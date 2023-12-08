import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../Utils/Users/client";
import Form from "react-bootstrap/Form";

function SignUp(props) {
  const [error, setError] = useState("");
  const regions = ["KALOS", "UNOVA", "KANTO", "JOHTO", "GALAR"];
  const signup = async () => {
    try {
        console.log("ew brandon");
      await client.signup(credentials);
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const [isNewUser, setIsNewUser] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  return (
    <div>
      <div>
        {error && <div>{error}</div>}
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
        <div>
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </div>
        <div>
          <label>Region</label>
          <Form.Select aria-label="Region">
            {regions.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </Form.Select>
        </div>
        <label>Position</label>
        <Form.Select aria-label="Position">
          <option>Buyer</option>
          <option>Seller</option>
        </Form.Select>
      </div>

      <Button
        className="w-50"
        onClick={() => {
          signup();
          props.onHide();
        }}
      >
        Create Account
      </Button>
    </div>
  );
}

export default SignUp;
