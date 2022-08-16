import React from "react";
import Form from "../Form";
import PropTypes from "prop-types";

export default function Login({ setToken }) {
  return (
    <div>
      <Form formType="Login" setToken={setToken}>
        Login
      </Form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
