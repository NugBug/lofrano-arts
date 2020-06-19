import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./welcome.styles.scss";

const Welcome = ({ user }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-message">
        {user ? `Welcome ${user.displayName}` : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(Welcome);
