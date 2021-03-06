import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectIsLoggedIn,
  selectIsAdmin,
} from "./redux/user/user.selectors.js";
import { checkUserSession } from "./redux/user/user.actions.js";
import { hideCart } from "./redux/cart/cart.actions";
import Welcome from "./components/welcome/welcome.component";
import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.component.jsx";
import Spinner from "./components/spinner/spinner.component.jsx";
import ErrorBoundry from "./components/error-boundry/error-boundry.component.jsx";
import NotFoundPage from "./components/notFoundPage/notFoundPage.component.jsx";
import ImageUpload from "./components/imageupload/imageupload.component.jsx";
import TermsAndPrivacy from "./pages/terms-and-privacy/terms-and-privacy.component";
import ContactPage from "./pages/contact/contactpage.component.jsx";

import { GlobalStyles } from "./global.styles";

const GalleryPage = lazy(() => import("./pages/gallery/gallery.component.jsx"));
const CheckoutPage = lazy(() =>
  import("./pages/checkout/checkout.component.jsx")
);
const AboutPage = lazy(() => import("./pages/about/about.component.jsx"));
const HomePage = lazy(() => import("./pages/homepage/homepage.component.jsx"));
const SignInAndSignOutPageContainer = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-out.container")
);

const App = ({ checkUserSession, hideCart, userLoggedIn, isAdmin }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  useEffect(() => {
    hideCart();
  });

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Welcome />
        <Header />
        <GlobalStyles />
        <ErrorBoundry>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route
                exact
                path="/admin"
                render={() => (isAdmin ? <ImageUpload /> : <NotFoundPage />)}
              />
              <Route path="/gallery" component={GalleryPage} />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/privacy" component={TermsAndPrivacy} />
              <Route
                exact
                path="/checkout"
                render={() =>
                  userLoggedIn ? <CheckoutPage /> : <Redirect to="/signin" />
                }
              />
              <Route
                exact
                path="/signin"
                render={() =>
                  userLoggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <SignInAndSignOutPageContainer />
                  )
                }
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </ErrorBoundry>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userLoggedIn: selectIsLoggedIn,
  isAdmin: selectIsAdmin,
});

const mapDispatchToProps = {
  checkUserSession: () => checkUserSession(),
  hideCart: () => hideCart(),
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
