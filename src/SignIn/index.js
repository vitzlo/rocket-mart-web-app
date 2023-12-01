import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import {useNavigate} from "react-router";

function SignIn(props) {
  const [isNewUser, setIsNewUser] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
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
        <div>
          <label>Email</label> <br />
          <input
            type="text"
            placeholder="Email"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          /> <br />
          <label>Password</label> <br />
          <input
            type="text"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
        </div>

        {isNewUser && (
          <Button className="w-50" onClick={props.onHide}>
            Create Account
          </Button>
        )}
        {!isNewUser && (
          <Button className="w-50" onClick={props.onHide}>
            Sign in
          </Button>
        )}
        <div
          className="text-center rm-curser-pointer"
          onClick={() => setIsNewUser(!isNewUser)}
        >
          No account? Create one
        </div>
      </Modal.Body>
      {/* <Modal.Footer> */}
      {/* </Modal.Footer> */}
    </Modal>
  );
}

export default SignIn;
