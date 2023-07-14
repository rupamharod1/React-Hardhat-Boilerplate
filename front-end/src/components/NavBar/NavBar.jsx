import React, { useState } from "react";
import "./../../assets/styles/components/Navbar.css";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Container, Nav } from "react-bootstrap";

import Connect from "./Connect";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          href="/"
          style={{ fontFamily: "Cursive", color: "#E18715", fontWeight: "700" }}
        >
          ReactDapp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            activeKey={window.location.pathname}
            className="me-auto"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Connect />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
