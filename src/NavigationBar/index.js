import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import User from "../SignIn";
import { blankPfpPath, pfpPathToSvg } from "../Utils/pfp-utils";

function NavigationBar({ user, setUser }) {
  const [searchInput, setSearchInput] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      navigate(`/results/${searchInput.replaceAll(" ", "-")}`);
    }
  };

  return (
    <Navbar className="rm-nav" data-bs-theme="dark">
      <Navbar.Brand className="" href="#home">
        Rocket Mart
      </Navbar.Brand>
      <input
        className="rm-search px-3"
        type="search"
        placeholder="Find your next pokemon"
        onChange={handleSearch}
        onKeyUp={handleEnter}
        value={searchInput}
      />
      <div
        className="ms-5 float-end .rm-curser-pointer"
        onClick={() => (!user ? setModalShow(true) : navigate("/profile"))}
      >
        <img
          src={user ? pfpPathToSvg[user.pfp] : blankPfpPath}
          alt="profile"
          width="50px"
          height="50px"
        />
      </div>
      <User
        show={modalShow}
        onHide={() => setModalShow(false)}
        setUser={setUser}
      />
    </Navbar>
  );
}
export default NavigationBar;
