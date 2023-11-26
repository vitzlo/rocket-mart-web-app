import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
import "./../index.css";
import React, { useState } from "react";

function NavigationBar() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <Navbar className="rm-nav" bg="dark" data-bs-theme="dark">
      {/* <Container className="mx-4"> */}
        <Navbar.Brand className="" href="#home">Rocket Mart</Navbar.Brand>

        <input
          className="rm-search"
          type="search"
          placeholder="Find your next pokemon"
          // onChange={handleChange}
          value={searchInput}
        />
      {/* </Container> */}
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
