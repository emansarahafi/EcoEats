import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faShoppingCart, faHeadset } from "@fortawesome/free-solid-svg-icons";
import Badge from 'react-bootstrap/Badge';


export default function NavigationBar() {
 

  return (
    <Navbar >
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        {/* <Nav className="ml-auto"> */}
        <Nav
          className="me-auto"
          style={{
            display: "flex",
            padding: "14px 20px",
            //  justifyContent : "space-around",
            width: "100%",
            
          }}
        >
          <Nav.Link>
            <NavLink
              to="/notifications"
              style={({ isActive }) => {
                return {
                  
                  fontWeight: isActive ? "bold" : "",
                  fontSize: isActive ? "25px" : "20px",
                };
              }}
            >
              <FontAwesomeIcon icon={faBell}  />
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <NavLink to="/cart"  >
              <FontAwesomeIcon icon={faShoppingCart}  />  <Badge bg="danger">1</Badge>
            </NavLink>
          </Nav.Link>

          {/* New NavLink for customer service */}
          <Nav.Link>
            <NavLink
              to="/customers"
              style={({ isActive }) => {
                return {
               
                  fontWeight: isActive ? "bold" : "",
                  fontSize: isActive ? "25px" : "20px",
                };
              }}
            >
              <FontAwesomeIcon icon={faHeadset}  />
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <Link
            Style={{}}
              to="/signUp"
              
            >
              SignUp/In
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
