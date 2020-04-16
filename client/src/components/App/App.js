import React from 'react';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';


const useStyles = makeStyles(theme => ({
  '@global': {
    'html, body': {
      backgroundColor: '#24292e',
      color: '#fff',
    },
  },
  root: {
    '& main': {
      display: 'flex',
      flex: 1,
    }
  },
  container: {
    paddingBottom: '5rem',
  }
}));


const App = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Container className={classes.container} maxWidth="xl">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </Container>
      <Footer />
    </div>
  );
};
App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
