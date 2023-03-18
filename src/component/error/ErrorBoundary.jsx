import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      <div className="error-mssg">
        <p>Something went wrong Refresh page to load content 😪</p>
      </div>;
    }
    return this.props.children;
  }
}
