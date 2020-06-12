import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors.js";
import { checkUserSession } from "./redux/user/user.actions.js";
import { hideCart } from "./redux/cart/cart.actions";
import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.component.jsx";
import Spinner from "./components/spinner/spinner.component.jsx";
import ErrorBoundry from "./components/error-boundry/error-boundry.component.jsx";
import NotFoundPage from "./components/notFoundPage/notFoundPage.component.jsx";

import { GlobalStyles } from "./global.styles";

const GalleryPage = lazy(() => import("./pages/gallery/gallery.component.jsx"));
const HomePage = lazy(() => import("./pages/homepage/homepage.component.jsx"));
const CheckoutPage = lazy(() =>
  import("./pages/checkout/checkout.component.jsx")
);
const AboutPage = lazy(() => import("./pages/about/about.component.jsx"));
const Hero = lazy(() => import("./components/hero/hero.component.jsx"));
const SignInAndSignUpPageContainer = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-out.container")
);

const App = ({ checkUserSession, currentUser, location, hideCart }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  useEffect(() => {
    hideCart();
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
        <ErrorBoundry>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/gallery" component={GalleryPage} />s
              <Route exact path="/" component={Hero} />
              <Route exact path="/homepage" component={HomePage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/checkout" component={CheckoutPage} />
              <Route
                exact
                path="/signin"
                render={() =>
                  currentUser ? (
                    <Redirect to="/homepage" />
                  ) : (
                    <SignInAndSignUpPageContainer />
                  )
                }
              />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </ErrorBoundry>
      </div>
      <div className={location.pathname !== "/" ? "footer-container" : ""}>
        {location.pathname !== "/" ? <Footer /> : ""}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = {
  checkUserSession: () => checkUserSession(),
  hideCart: () => hideCart(),
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
