import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../Utils/Users/client";
import SignIn from "./signin";
import SignUp from "./signup";

function User(props) {
  const [error, setError] = useState("");
  const regions = ["KALOS", "UNOVA", "KANTO", "JOHTO", "GALAR"];
  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/project/account");
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
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="rm-account-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Welcome to Rocket Mart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isNewUser ? (
          <div>
            <SignIn onHide={props.onHide} />
            <div
              className="text-center rm-curser-pointer"
              onClick={() => setIsNewUser(!isNewUser)}
            >
              No account? Create one
            </div>
          </div>
        ) : (
          <div>
            <SignUp onHide={props.onHide} />
            <div
              className="text-center rm-curser-pointer"
              onClick={() => setIsNewUser(!isNewUser)}
            >
              Sign In
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default User;
