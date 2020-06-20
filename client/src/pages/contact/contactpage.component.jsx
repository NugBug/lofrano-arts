import React, { useEffect } from "react";
import Contact from "../../components/contact-form/contact-form.component";

const ContactPage = () => {
  // Resets overflow, touch action and scroll behavior if user accesses contact form from collection item modal
  const bodyStyle = document.body.style;
  bodyStyle.touchAction = "";
  bodyStyle.scrollBehavior = "";
  bodyStyle.overflow = "";

  return <Contact />;
};

export default ContactPage;
