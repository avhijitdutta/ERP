import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import StockPage from './containers/StockPage';
import CounterPage from './containers/CounterPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.STOCKLIST} component={StockPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
