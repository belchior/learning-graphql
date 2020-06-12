import React from 'react';
import Typography from '@material-ui/core/Typography';


const ErrorView = () => (
  <div>
    <Typography variant="h1">Something went wrong.</Typography>
    <Typography>Try refresh the page</Typography>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError === false) return this.props.children;
    if (this.props.fallback) return this.props.fallback;
    return <ErrorView />;
  }
}

export default ErrorBoundary;
