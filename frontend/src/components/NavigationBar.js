import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "./UserRole";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faShoppingCart,
  faHeadset,
  faFileAlt,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";

export default function NavigationBar({ cartItemsCount }) {
  const role = getUserRole();
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
        <Link to="/">
        <img src="/EcoEatsLogo.png" alt="Navbar" style={{ width: '100px', height: 'auto' }}/>
        </Link>
      </ul>

      <ul>
        {role === "user" && (
          <>
            <li>
              <NavLink to="/orders"><FontAwesomeIcon icon={faBell} /></NavLink>
            </li>
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

            <li>
              <NavLink to="/profile">
                <FontAwesomeIcon icon={faUser} />
              </NavLink>
            </li>
          </>
        )}

        {role === "admin" && (
          <>
            <li>
              <NavLink to="/customerServices">
                <FontAwesomeIcon icon={faFileAlt} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/users">
                <FontAwesomeIcon icon={faUsers} />
              </NavLink>
            </li>
          </>
        )}

        <li>
          {role ? (
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          ) : (
            <>
              <li>
                <NavLink to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <Badge bg="danger">{cartItemsCount ?? 0}</Badge>
                </NavLink>
              </li>
              <li>
                <Link to="/signUp">Sign Up/In</Link>
              </li>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
