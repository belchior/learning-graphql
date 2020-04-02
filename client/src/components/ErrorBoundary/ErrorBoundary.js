import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


const ErrorView = props => (
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

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError === false) return this.props.children;
    if (this.props.fallback) return this.props.fallback;
    return <ErrorView />;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

export default ErrorBoundary;
