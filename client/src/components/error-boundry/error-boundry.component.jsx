import React from "react";

import "./error-boundry.styles.scss";

class ErrorBoundry extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="error-overlay">
          <div className="error-image-container"></div>
          <div className="error-message">
            Sorry, this page is taking too long to load and may be broken
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;
