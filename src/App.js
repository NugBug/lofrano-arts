import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.actions.js";
import { selectCurrentUser } from "./redux/user/user.selectors.js";
import HomePage from "./pages/homepage/homepage.component.jsx";
import GalleryPage from "./pages/gallery/gallery.component.jsx";
import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.component.jsx";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.components copy.jsx";
import Hero from "./components/hero/hero.component.jsx";
import CheckoutPage from "./pages/checkout/checkout.component.jsx";
import {
  auth,
  createUserProfileDocument,
} from "./firebase/firebase.utils.js";

import "./App.css";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);

      // This code will add new digital art collection data upon application mount
      // Be sure to map state 'collectionsArray: selectCollectionsForPreview' to props and pass as prop
      // Import 'addCollectionAndDocuments from firebase.utils.js
      // Imprt selectCollectionsForPreview from gallery redux gallery.selector.js
      //
      // addCollecitonAndDocuments(
      //   "collections",
      //   collectionsArray.map(({ title, items }) => ({ title, items }))
      // );
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <Header />
          <Switch>
            <Route exact path="/" component={Hero} />
            <Route exact path="/homepage" component={HomePage} />
            <Route path="/gallery" component={GalleryPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                this.props.currentUser ? (
                  <Redirect to="/homepage" />
                ) : (
                  <SignInAndSignUpPage />
                )
              }
            />
          </Switch>
        </div>
        <div className="footer-container">
          {this.props.location.pathname !== "/" ? <Footer /> : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = {
  setCurrentUser: (user) => setCurrentUser(user),
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
