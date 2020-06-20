import React, { useEffect } from "react";
import Contact from "../../components/contact-form/contact-form.component";

const ContactPage = () => {
  const bodyStyle = document.body.style;
  bodyStyle.touchAction = "";
  bodyStyle.scrollBehavior = "";
  bodyStyle.overflow = "";

  return <Contact />;
};

export default ContactPage;
