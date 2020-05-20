import React from "react";
import FormInput from "../form-input/form-input.component.jsx";
import CustomButton from "../custom-button/custom-button.component.jsx";
import Spinner from "../spinner/spinner.component.jsx";

import {
  auth,
  createUserProfileDocument,
} from "../../firebase/firebase.utils.js";

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
    this.setState({ isLoading: true });
    event.preventDefault();

    const { name, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    } else if (password.length < 6) {
      alert("password needs to be more than 5 characters in length");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { name });
      this.setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert("The email address is already in use");
      window.location.reload(false);
    }
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
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
