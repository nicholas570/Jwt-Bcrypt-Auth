import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from '../views/Auth';
import Register from '../views/Register';
import SignIn from '../views/SignIn';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/signin' component={SignIn} />
        <Route exact path='/' component={Auth} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
