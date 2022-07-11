import React from "react";
import ReactDOM from "react-dom";

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
  this.state = { error: false };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    // Log or store the error
    console.error(error);
  }

  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}