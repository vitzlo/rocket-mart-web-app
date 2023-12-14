import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-router-dom";

function ProfileEditModal({ show, handleClose, user, editUser }) {
  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [regionText, setRegionText] = useState("");
  const [emailText, setEmailText] = useState("");
  const regions = ["KALOS", "UNOVA", "KANTO", "JOHTO", "GALAR"];

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
        <Modal.Title>Editing @{usernameText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <div>
          <label for="edit-region-select">Region: </label>
          <select
            className="form-select mb-2"
            id="edit-region-select"
            onChange={(e) => setRegionText(e.target.value)}
          >
            {regions.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
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
        <button className="btn btn-primary mt-4 float-end" onClick={update}>
          Update User
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default ProfileEditModal;
