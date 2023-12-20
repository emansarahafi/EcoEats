import React from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "./UserRole";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faShoppingCart, faHeadset, faFileAlt, faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import Badge from 'react-bootstrap/Badge';

export default function NavigationBar({ cartItemsCount }) {
  const role = UserRole();
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <nav className="navigation">
      <ul>
        <Link to="/">Navbar</Link>
      </ul>

      <ul>
        {role === "user" && (
          <li>
            <NavLink to="/notifications">
              <FontAwesomeIcon icon={faBell} />
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <Badge bg="danger">{cartItemsCount ?? 0}</Badge>
          </NavLink>
        </li>

        <li>
          <NavLink to="/customers">
            <FontAwesomeIcon icon={faHeadset} />
          </NavLink>
        </li>

        {role === "admin" && (
          <li>
            <NavLink to="/customerServices">
              <FontAwesomeIcon icon={faFileAlt} />
            </NavLink>
          </li>
        )}

        {role === "admin" && (
          <li>
            <NavLink to="/users">
              <FontAwesomeIcon icon={faUsers} />
            </NavLink>
          </li>
        )}

        {role === "user" && (
          <li>
            <NavLink to="/profile">
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          </li>
        )}

        <li>
          {role ? (
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          ) : (
            <Link to="/signUp">Sign Up/In</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}