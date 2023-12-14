import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-router-dom";

export const ProfileEditModal = ({ show, handleClose, user, editUser }) => {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [regionText, setRegionText] = useState("");
  const [emailText, setEmailText] = useState("");

  const update = () => {
    const updatedUser = {
      ...user,
      password: passwordText,
      region: regionText,
      email: emailText,
    };
    editUser(updatedUser);
    handleClose();
  };

  useEffect(() => {
    if (user) {
        setUsernameText(user.username);
        setPasswordText(user.password);
        setRegionText(user.region);
        setEmailText(user.email);
    }
  }, [user]);

  return (
    <Modal
      className="rm-profile-editing-modal"
      size="md"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Username: {usernameText}</div>
        <div>
          <label for="edit-password-input">Password: </label>
          <input
            className="form-control mb-2"
            id="edit-password-input"
            type="password"
            value={passwordText}
            onChange={(e) => setPasswordText(e.target.value)}
          />
        </div>
        <Form.Select
          aria-label="Region:"
          style={{ marginBottom: "0px" }}
          onChange={(e) => setRegionText(e.target.value)}
        >
          <option>KALOS</option>
          <option>UNOVA</option>
          <option>KANTO</option>
          <option>JOHTO</option>
          <option>GALAR</option>
        </Form.Select>
        <div>
          <label for="edit-email-input">Email: </label>
          <input
            className="form-control mb-2"
            id="edit-email-input"
            type="text"
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />
        </div>
        <button className="btn btn-primary my-2" onClick={update}>
          Update User
        </button>
      </Modal.Body>
    </Modal>
  );
};
