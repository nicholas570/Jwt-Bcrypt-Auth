import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
        <Route path='/signin' component={Login} />
        <Route path='/home' component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
