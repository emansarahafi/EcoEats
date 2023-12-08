import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { UserRole } from "./UserRole";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faShoppingCart, faHeadset, faFileAlt, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import Badge from 'react-bootstrap/Badge';


export default function NavigationBar({cartItemsCount}) {
  const role = UserRole(); 
  const navigate=useNavigate() 

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to SignOut")){ 
      localStorage.removeItem("token"); // Remove the token from local storage 
      navigate("/"); // Navigate to the home page or login page
    } 
  };
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
          {role === "user" && (
            <Nav.Link as={NavLink} to="/notifications">
              <FontAwesomeIcon icon={faBell} />
            </Nav.Link>
          )}

          <Nav.Link>
            <NavLink to="/cart"  >
              <FontAwesomeIcon icon={faShoppingCart}/>  <Badge bg="danger">{cartItemsCount ?? 0}</Badge>
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <NavLink
              to="/customers">
              <FontAwesomeIcon icon={faHeadset}  />
            </NavLink>
          </Nav.Link>

          {role === "admin" && (
            <Nav.Link as={NavLink} to="/customerServices">
              <FontAwesomeIcon icon={faFileAlt} />
            </Nav.Link>
          )}

          
          {role === "admin" && (
            <Nav.Link as={NavLink} to="/users">
              <FontAwesomeIcon icon={faUsers} />
            </Nav.Link>
          )}

          {role === "user" && (
            <Nav.Link as={NavLink} to="/profile">
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
          )}

          <Nav.Link>
            {role ? (
          <Link to="/"
          onClick={handleSignOut} 
          style={{
          borderRight: "none",
          border: "3px solid grey",
          borderRadius: "10px",
          marginLeft: "190px",
          padding: "8px",
          }} 
        >
          Sign Out
        </Link> 
        ):(
          <Link
            to="/signUp"
            style={{
              borderRight: "none",
              border: "3px solid grey",
              borderRadius: "10px",
              marginLeft: "190px",
              padding: "8px",
            }}>
            Sign Up/In
          </Link> 
          )}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
