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
    <Navbar className="rm-nav w-100" data-bs-theme="dark">
      <Navbar.Brand href="#home">
        <div className="row flex-nowrap align-middle">
          <img src="/images/meowth.png" width="50px" alt="RM" />
          <span className="d-none d-md-block ps-0 mt-2">Rocket Mart</span>
        </div>
      </Navbar.Brand>
      <input
        className="rm-search px-3"
        type="search"
        placeholder="Find your next pokemon..."
        onChange={handleSearch}
        onKeyUp={handleEnter}
        value={searchInput}
      />
      <div
        className="ms-5 .rm-curser-pointer ms-auto"
        onClick={() => (!user ? setModalShow(true) : navigate("/profile"))}
      >
        <img
          src={user ? pfpPathToSvg[user.pfp] : blankPfpPath}
          alt="profile"
          width="50px"
          height="50px"
          style={{marginRight: "20px"}}
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
