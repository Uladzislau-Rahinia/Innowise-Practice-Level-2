import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import React from 'react';
import LoginPage from 'core/pages/Login';
import RegisterPage from 'core/pages/Register';
import Paint from 'core/pages/Paint';
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
      <Route path={LINKS.PAINT}>
        <Paint />
      </Route>
    </Switch>
  </Router>
);

export default App;
