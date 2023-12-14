import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../Utils/Users/client";
import Form from "react-bootstrap/Form";
import { generatePfp } from "../Utils/pfp-utils";

function SignUp({ onHide, setUser }) {
  const [error, setError] = useState("");
  const regions = ["KALOS", "UNOVA", "KANTO", "JOHTO", "GALAR"];
  const signup = async () => {
    try {
      credentials["pfp"] = generatePfp();
      const response = await client.signup(credentials);
      setUser(response);
      onHide();
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    region: "KALOS",
    type: "BUYER",
  });
  const navigate = useNavigate();
  return (
    <div className="container rm-sign-user">
      <div className="">
        {error && <div>{error}</div>}
        <div className="justify-content-center">
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
        </div>
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
        <div>
          <label>Email</label> <br />
          <input
            className="w-100"
            type="text"
            placeholder="me@example.com"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </div>
        <div className="row flex-nowrap">
          <div className="col">
            <label>Region</label>
            <Form.Select
              className="w-100"
              aria-label="Region"
              onChange={(e) =>
                setCredentials({ ...credentials, region: e.target.value })
              }
            >
              {regions.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </Form.Select>
          </div>

          <div className="col">
            <label>Position</label>
            <Form.Select
              aria-label="Position"
              onChange={(e) =>
                setCredentials({ ...credentials, type: e.target.value })
              }
            >
              <option>BUYER</option>
              <option>SELLER</option>
            </Form.Select>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button className="w-100" onClick={signup}>
          Create Account
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
