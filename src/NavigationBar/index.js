import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SignIn from "../SignIn";
import Button from "react-bootstrap/Button";

function NavigationBar() {
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Navbar className="rm-nav" data-bs-theme="dark">
      <Navbar.Brand className="" href="#home">
        Rocket Mart
      </Navbar.Brand>

      <input
        className="rm-search"
        type="search"
        placeholder="Find your next pokemon"
        onChange={handleSearch}
        value={searchInput}
      />
      <Button variant="primary" className="text-nowrap" onClick={() => setModalShow(true)}>
        Sign in
      </Button>

      <SignIn show={modalShow} onHide={() => setModalShow(false)} />
      <Nav className="ms-5 float-end">
        <Nav.Link href="#profile">
          <img
            src="https://www.svgrepo.com/show/135058/circle-outline.svg"
            alt="profile"
            width="50px"
            height="50px"
          />
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
export default NavigationBar;
