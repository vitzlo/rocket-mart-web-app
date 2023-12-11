import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

function User({ onHide, setUser, ...props }) {
  const [isNewUser, setIsNewUser] = useState(true);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="rm-account-modal"
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title
          className="rm-sign-user-title"
          id="contained-modal-title-vcenter"
        >
          Welcome to Rocket Mart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="container">
        {isNewUser ? (
          <div>
            <SignIn onHide={onHide} setUser={setUser} />
            <div
              className="text-center rm-curser-pointer"
              onClick={() => setIsNewUser(!isNewUser)}
            >
              <label className="rm-modal-switch">No account? Create one</label>
            </div>
          </div>
        ) : (
          <div>
            <SignUp onHide={onHide} setUser={setUser} />
            <div
              className="text-center rm-curser-pointer"
              onClick={() => setIsNewUser(!isNewUser)}
            >
              <label className="rm-modal-switch">Sign In</label>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default User;
