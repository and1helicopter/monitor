import React from 'react';
import { Redirect, Switch, Route } from 'react-router';  // Switch,
import { connect } from 'react-redux';

// import {  } from '@material-ui/core/es';
// import routes from './constants/routes';
// import Monitor from './containers/Monitor';
// import {LocalizeProvider } from 'react-localize-redux';
import App from './containers/App';
import Monitor from './containers/MainContent';
import Test from './containers/Test';

// import Base from './containers/Base';
// import HomePage from './containers/HomePage';
// import CounterPage from './containers/CounterPage';

export default () => (
  // console.log(store);
  <App>
    <Switch>
      <Route path="/Test" component={Test}/>
      <Route exact path="/Monitor" component={Monitor}/>
      <Redirect from="/" to="/Monitor"/>
    </Switch>
  </App>
);
