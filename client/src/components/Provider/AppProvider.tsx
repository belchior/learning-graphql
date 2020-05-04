import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core/styles';

import Route from 'components/Route/Route';
import { client } from 'utils/environment';
import { theme } from 'utils/theme';


const AppProvider = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Route />
        </ApolloProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default AppProvider;
