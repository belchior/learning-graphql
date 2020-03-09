import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from 'utils/theme';
import Route from 'components/Route/Route';


const AppProvider = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Route />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default AppProvider;