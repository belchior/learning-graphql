import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Header from 'components/Header/Header';


const useStyles = makeStyles(theme => ({
  '@global': {
    'html, body': {
      backgroundColor: '#24292e',
      color: '#fff',
    }
  },
  root: {
    '& main': {
      display: 'flex',
      flex: 1,
    }
  },
  container: {
    paddingBottom: '2rem',
  }
}));


const App = props => {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Container className={classes.container} maxWidth="xl">
        {children}
      </Container>
    </div>
  );
};


export default App;
