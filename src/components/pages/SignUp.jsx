import React from "react";
import Form from "../Form";
import PropTypes from "prop-types";

function SignUp({ setToken }) {
  return (
    <div>
      <Form formType="Signup" setToken={setToken}>
        SignUp
      </Form>
    </div>
  );
}

export default SignUp;

SignUp.propTypes = {
  setToken: PropTypes.func.isRequired,
};
