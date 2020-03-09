import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Header from 'components/Header/Header';
import { resource } from 'utils/fakeData';


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


export const GlobalContext = React.createContext();

const AppRoute = props => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GlobalContext.Provider value={resource.data.user}>
        <Header />
        <Container maxWidth="xl">
          {children}
        </Container>
      </GlobalContext.Provider>
    </div>
  );
};

export default AppRoute;