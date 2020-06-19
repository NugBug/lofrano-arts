import React, { useState } from "react";
import axios from "axios";
import CustomButton from "../custom-button/custom-button.component";

import "./contact-form.styles.scss";

const Contact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [buttonText, setButtonText] = useState("Send Message");

  const formSubmit = (e) => {
    e.preventDefault();

    setButtonText("...Sending");

    let data = {
      name: name,
      email: email,
      message: message,
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
    setButtonText("Message Sent");
  };

  return (
    <div className="contact-container">
      <form className="contact-form" onSubmit={(e) => formSubmit(e)}>
        <div>
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
            value={email}
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

export default Contact;
