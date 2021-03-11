import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import React from 'react';
import LoginPage from 'core/pages/Login';
import RegisterPage from 'core/pages/Register';
import LINKS from 'core/utils/constants/links';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Redirect from={LINKS.ROOT} to={LINKS.LOGIN} exact />
      <Route path={LINKS.LOGIN}>
        <LoginPage />
      </Route>
      <Route path={LINKS.REGISTER}>
        <RegisterPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
