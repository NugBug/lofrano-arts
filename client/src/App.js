import React, { useEffect, lazy, Suspense, useState } from "react";
import axios from "axios";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectIsLoggedIn,
} from "./redux/user/user.selectors.js";
import { checkUserSession } from "./redux/user/user.actions.js";
import { hideCart } from "./redux/cart/cart.actions";
import Header from "./components/header/header.component.jsx";
import Footer from "./components/footer/footer.component.jsx";
import Spinner from "./components/spinner/spinner.component.jsx";
import ErrorBoundry from "./components/error-boundry/error-boundry.component.jsx";
import NotFoundPage from "./components/notFoundPage/notFoundPage.component.jsx";
import ImageUpload from "./components/imageupload/imageupload.component.jsx";

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

const App = ({ checkUserSession, hideCart, userLoggedIn, currentUser }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  useEffect(() => {
    hideCart();
  });

  const accessAdmin = (user) => {
    axios({
      url: "admin",
      method: "post",
      data: {
        currentUserId: user.id,
      },
    })
      .then((response) => {
        setIsAdmin(response.data.permission);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="page-container">
      {currentUser ? accessAdmin(currentUser) : null}
      <div className="content-wrap">
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
});

const mapDispatchToProps = {
  checkUserSession: () => checkUserSession(),
  hideCart: () => hideCart(),
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
