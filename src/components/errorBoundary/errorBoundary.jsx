import React, { Component } from "react";
import { Box } from "zmp-ui";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          flex
          alignItems="center"
          className="h-screen"
          justifyContent="center"
        >
          <h1>Ứng dụng đang được cập nhật!</h1>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
