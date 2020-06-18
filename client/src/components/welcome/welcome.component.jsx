import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsLoggedIn,
  selectCurrentUser,
} from "../../redux/user/user.selectors";

import "./welcome.styles.scss";

const Welcome = ({ loggedIn, user }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-message">
        {user ? `Welcome ${user.name}` : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loggedIn: selectIsLoggedIn,
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(Welcome);
