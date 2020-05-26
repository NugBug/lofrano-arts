import React from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component.jsx";
import CustomButton from "../custom-button/custom-button.component.jsx";
import Spinner from "../spinner/spinner.component.jsx";
import { signUpStart } from "../../redux/user/user.actions.js";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { signUpStart } = this.props;
    const { name, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    } else if (password.length < 6) {
      alert("password needs to be more than 5 characters in length");
      return;
    }

    this.setState({ isLoading: true });
    signUpStart({ name, email, password })
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;
    let loading;
    if (this.state.isLoading) {
      loading = <Spinner />;
    } else {
      loading = null;
    }

    return (
      <div className="sign-up">
        {loading}
        <h2 className="title">I do not have an account</h2>
        <span> Sign up to receive updates and purchase art</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            label="Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">SIGN UP</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  signUpStart: (userCredentials) => signUpStart(userCredentials),
};

export default connect(null, mapDispatchToProps)(SignUp);
