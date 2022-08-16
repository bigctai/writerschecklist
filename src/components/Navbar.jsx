import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
import { Button } from "./Button/Button";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar(user) {
  //const [varName, function to change var value]=useState(initial value);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => {
    setClick(!click);
  };
  const closeMobileMenu = () => {
    setClick(false);
  };
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {user.user && (
          <Link to="/" className="navbar-logo">
            <img
              src="/images/transparent-logo.png"
              alt="logo"
              onClick={closeMobileMenu}
            />
          </Link>
        )}
        {user.user && (
          <Link to="/MyChecklist" className="navbar-logo">
            <img
              src="/images/transparent-logo.png"
              alt="logo"
              onClick={closeMobileMenu}
            />
          </Link>
        )}
        <div className="burger" onClick={handleClick}>
          {/*sets the icon based on whether or not the icon has been clicked*/}
          <FontAwesomeIcon icon={click ? faTimes : faBars}></FontAwesomeIcon>
        </div>
        {/* This changes the class name depending on whether or not the navbar was clicked
                so that its css can be targeted and changed*/}
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link
              to="/ExploreSearch"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/MyChecklist"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              MyChecklist
            </Link>
          </li>

          {!user.user && (
            <li className="nav-links user-btn">
              {button && (
                <Button
                  destination="Signup"
                  buttonStyle="btn--white"
                  buttonSize="btn--fixed"
                >
                  Sign Up
                </Button>
              )}
            </li>
          )}
          {!user.user && (
            <li className="nav-links user-btn">
              {button && (
                <Button
                  destination="Login"
                  buttonStyle="btn--white"
                  buttonSize="btn--fixed"
                >
                  Login
                </Button>
              )}
            </li>
          )}

          {user.user && (
            <li className="nav-links">
              <Link to="/UserProfile">
                <FontAwesomeIcon
                  className="user-profile"
                  icon={faUser}
                ></FontAwesomeIcon>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
