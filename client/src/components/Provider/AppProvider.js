import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import Route from 'components/Route/Route';
import { theme } from 'utils/theme';


const AppProvider = () => {
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
