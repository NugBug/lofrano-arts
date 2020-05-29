import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component.jsx";
import CustomButton from "../custom-button/custom-button.component.jsx";
import { signUpStart } from "../../redux/user/user.actions.js";

import "./sign-up.styles.scss";

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    } else if (password.length < 6) {
      alert("password needs to be more than 5 characters in length");
      return;
    }
    signUpStart({ name, email, password });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span> Sign up to receive updates and purchase art</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          label="Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">SIGN UP</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  signUpStart: (userCredentials) => signUpStart(userCredentials),
};

export default connect(null, mapDispatchToProps)(SignUp);
