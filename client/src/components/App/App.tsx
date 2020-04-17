import React from 'react';
import Container from '@material-ui/core/Container';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { useStyles } from './App.styles';


interface IProps {
  children: React.ReactNode
}

const App = (props: IProps) => {
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

export default App;
