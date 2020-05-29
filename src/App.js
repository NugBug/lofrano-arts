import React, { useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors.js";
import { checkUserSession } from "./redux/user/user.actions.js";
import { hideCart } from "./redux/cart/cart.actions.js";
import HomePage from "./pages/homepage/homepage.component.jsx";
import GalleryPage from "./pages/gallery/gallery.component.jsx";
import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.component.jsx";
import SignInAndSignUpPageContainer from "./pages/sign-in-and-sign-up/sign-in-and-sign-out.container";
import Hero from "./components/hero/hero.component.jsx";
import CheckoutPage from "./pages/checkout/checkout.component.jsx";

import { GlobalStyles } from "./global.styles";

const App = ({ checkUserSession, currentUser, location, hideCart }) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession]);

  useEffect(() => {
    hideCart()
  });
  // This code will add new digital art collection data upon application mount, use in useEffect
  // Be sure to map state 'collectionsArray: selectCollectionsForPreview' to props and pass as prop
  // Import 'addCollectionAndDocuments from firebase.utils.js
  // Imprt selectCollectionsForPreview from gallery redux gallery.selector.js
  //
  // addCollecitonAndDocuments(
  //   "collections",
  //   collectionsArray.map(({ title, items }) => ({ title, items }))
  // );
  // });
  
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Header />
        <GlobalStyles />
        <Switch>
          <Route exact path="/" component={Hero} />
          <Route exact path="/homepage" component={HomePage} />
          <Route path="/gallery" component={GalleryPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ?
                <Redirect to="/homepage" />: 
                <SignInAndSignUpPageContainer />
            }
          />
        </Switch>
      </div>
      <div
        className={
          location.pathname !== "/" ? "footer-container" : ""
        }
      >
        {location.pathname !== "/" ? <Footer /> : ""}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = {
  checkUserSession: () => checkUserSession(),
  hideCart: () => hideCart(),
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
