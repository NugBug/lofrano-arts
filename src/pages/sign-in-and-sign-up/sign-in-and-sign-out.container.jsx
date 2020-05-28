import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsUserFetching,
  selectSignInError,
} from "../../redux/user/user.selectors.js";
import { resetForm } from "../../redux/user/user.actions.js";
import WithSpinner from "../../components/with-spinner/with-spinner.component.jsx";
import WithErrorMessage from "../../components/error-message/error-message.component.jsx";
import SignInAndSignUpPage from "./sign-in-and-sign-up.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsUserFetching,
  error: selectSignInError,
});

const mapDispatchToProps = {
  resetForm: () => resetForm(),
};

const SignInAndSignOutPageContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithErrorMessage,
  WithSpinner
)(SignInAndSignUpPage);


export default SignInAndSignOutPageContainer;
