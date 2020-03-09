import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from '../App/App';
import Profile from 'pages/profile/Profile';
import NotFound from 'pages/notfound/NotFound';

const AppRoute = props => {
  const { children, ...routeProps } = props;
  return (
    <App>
      <Route {...routeProps}>
        {children}
      </Route>
    </App>
  );
};

const Router = props => {
  return (
    <BrowserRouter>
      <Switch>
        <AppRoute path="/:login([a-zA-Z]+[\w]+)" component={Profile} />
        <AppRoute path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;