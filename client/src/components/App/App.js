import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Header from 'components/Header/Header';


const useStyles = makeStyles(theme => ({
  root: {
  },
  '@global': {
    'html, body': {
      backgroundColor: '#24292e',
      color: '#fff',
    }
  }
}));


const App = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="xl">
        {children}
      </Container>
    </div>
  );
};


export default App;
