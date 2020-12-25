import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Layout from '../layout/Layout';
import Auth from '../views/Auth';
import Home from '../views/Home';
import Register from '../views/Register';
import Login from '../views/Login';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/home' component={Home} layout={Layout} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
