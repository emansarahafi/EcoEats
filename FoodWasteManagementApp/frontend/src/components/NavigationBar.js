import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faShoppingCart, faHeadset } from "@fortawesome/free-solid-svg-icons";

export default function NavigationBar() {
  const linkStyle = {
    textDecoration: "none",
    fontSize: "20px",
    color: "white",
    borderRight: "1px solid white",
    padding: "15px",
    marginLeft: "100px",
  };

  const iconStyle = {
    fontSize: "20px",
    marginRight: "5px",
  };

  const navbarStyle = {
    backgroundColor: "orange", // Set the background color to orange
  };

  return (
    <Navbar style={navbarStyle}>
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link>
            <NavLink
              to="/notifications"
              style={({ isActive }) => {
                return {
                  ...linkStyle,
                  fontWeight: isActive ? "bold" : "",
                  fontSize: isActive ? "25px" : "20px",
                };
              }}
            >
              <FontAwesomeIcon icon={faBell} style={iconStyle} />
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <Link to="/cart" style={linkStyle}>
              <FontAwesomeIcon icon={faShoppingCart} style={iconStyle} />
            </Link>
          </Nav.Link>

          {/* New NavLink for customer service */}
          <Nav.Link>
            <NavLink
              to="/customers"
              style={({ isActive }) => {
                return {
                  ...linkStyle,
                  fontWeight: isActive ? "bold" : "",
                  fontSize: isActive ? "25px" : "20px",
                };
              }}
            >
              <FontAwesomeIcon icon={faHeadset} style={iconStyle} />
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <Link
              to="/signUp"
              style={{
                ...linkStyle,
                borderRight: "none",
                border: "3px solid grey",
                borderRadius: "10px",
                marginLeft: "190px",
                padding: "8px",
              }}
            >
              SignUp/In
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
