import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors.js";
import axios from "axios";
import CustomButton from "../custom-button/custom-button.component";

import "./contact-form.styles.scss";

const Contact = ({ user }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [sent, setSent] = useState(false);
  const [buttonText, setButtonText] = useState("Send Message");

  const formSubmit = (e) => {
    e.preventDefault();

    setButtonText("...Sending");

    let data = {
      name: name,
      email: email,
      message: message,
      topic: topic,
    };

    axios
      .post("/contact", data)
      .then((res) => {
        setSent(true);
        resetForm();
        console.log(sent);
      })
      .catch((error) => {
        console.log("Message not sent.  Error: ", error);
      });
  };

  const resetForm = () => {
    setName("");
    setMessage("");
    setEmail("");
    setTopic("");
    setButtonText("Message Sent");
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={(e) => formSubmit(e)}>
        <div>
          <label className="form-input-label" htmlFor="category">
            Subject
          </label>
          <select
            id="dropdown"
            name="category"
            className="form-input"
            onChange={(e) => setTopic(e.target.value)}
          >
            <option defaultValue>Select Category</option>
            <option value="Inquire About Art Piece">
              Inquire About Art Piece
            </option>
            <option value="Delete Account">Delete Account</option>
            <option value="General Question">General Question</option>
            <option value="Privacy Policy">Privacy Policy</option>
            <option value="Other">Other</option>
          </select>
          <label className="form-input-label" htmlFor="message-input">
            Your Message
          </label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            className="form-input"
            type="text"
            placeholder="Please write your message here"
            value={message}
            required
          />
        </div>
        <div>
          <label className="form-input-label" htmlFor="message-name">
            Your Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            name="name"
            className="form-input"
            type="text"
            placeholder="Name"
            value={name}
          />
        </div>
        <div>
          <label className="form-input-label" htmlFor="message-email">
            Your Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            className="form-input"
            type="email"
            placeholder="your@email.com"
            required
            value={user ? `${user.name}` : email}
          />
        </div>
        <div className="button-container">
          <CustomButton type="submit" className="button">
            {buttonText}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(Contact);
