import React, { useState } from "react";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import Title from "./Title/Title";
import { Button } from "./Button/Button";
import UserService from "../services/UserService";
import PropTypes from "prop-types";

const FORMTYPES = ["Signup", "Login"];

export default function Form({ formType, setToken }) {
  const checkFormType = FORMTYPES.includes(formType) ? formType : FORMTYPES[0];
  let navigate = useNavigate();
  const initialUser = {
    id: null,
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUser);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const checkInput = (event) => {
    var inputExists = user.email !== "" && user.password !== "";
    var isLogin = event.target.innerHTML === "Login";
    inputExists
      ? checkAlreadyExists(isLogin)
      : alert("Please Fill Out The Fields");
  };
  //Can be used for both Signup and Login
  const checkAlreadyExists = (isLogin) => {
    let thisUser;
    UserService.checkUser(user.email).then((response) => {
      thisUser = response.data;
      isLogin
        ? thisUser
          ? login(thisUser)
          : alert("There is no account associated with that email")
        : thisUser
        ? alert("User already exists")
        : register();
    });
  };

  const login = (thisUser) => {
    thisUser.password === user.password
      ? validated(thisUser)
      : alert("Incorrect Password");
  };

  const validated = (thisUser) => {
    setToken(thisUser.id);
    navigate("/UserProfile");
  };

  const register = () => {
    var data = {
      email: user.email,
      password: user.password,
    };
    UserService.create(data)
      .then((response) => {
        setUser({
          id: response.data.id,
          email: response.data.email,
          password: response.data.password,
        });
        setToken(response.data.id);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="container">
      <img className="logo" src="/images/transparent-logo.png" alt="logo" />
      <Title color="white" titleName={`${checkFormType}`} size="small"></Title>
      <div className={`form-container ${checkFormType}`}>
        <div className="email-field">
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            className="field"
            type="text"
            name="email"
            required
            value={user.email}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="password">
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            className="field"
            type="password"
            name="password"
            required
            value={user.password}
            onChange={(event) => handleInputChange(event)}
          />
        </div>

        <div className="password-repeat">
          <label htmlFor="psw-repeat">
            <b>Repeat Password</b>
          </label>

          <input className="field" type="password" name="psw-repeat" required />
        </div>
        <div className="bottom-container">
          <h4 className="redirect-to-login">
            Already have an account? <Link to="/Login">Login</Link>
          </h4>
          <h4 className="redirect-to-signup">
            Don't have an account? <Link to="/Signup">Signup</Link>
          </h4>
          {checkFormType === "Signup" ? (
            <Button
              className="enter-btn"
              onClick={(event) => checkInput(event)}
              children="Sign Up"
            />
          ) : (
            <Button
              className="enter-btn"
              onClick={(event) => checkInput(event)}
              children="Login"
            ></Button>
          )}
        </div>
      </div>
    </div>
  );
}

Form.propTypes = {
  setToken: PropTypes.func.isRequired,
};
