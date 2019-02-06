// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect, Switch, Route } from 'react-router';
import App from "./App";
import MonitorTemplate from "./MonitorTemplate";
import Test from "./Test";
import SettingsTemplate from "./SettingsTemplate";
import ContainerTemplate from "./ContainerTemplate"

type Props = {
  store: Store,
  history: {}
};

// 
export default class Root extends Component<Props>  {
  render() {
    const { store, history } = this.props;  
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App>
            <Switch>
              <Route path="/ContainerTemplate/:name,:ref" component={ContainerTemplate}/>
              <Route path="/Test" component={Test}/>      
              {/* <Route path="/SettingsTemplate" component={SettingsTemplate}/>         */}
              <Route path="/SettingsTemplate/:name,:ref" component={SettingsTemplate} />
              <Route exact path="/MonitorTemplate" component={MonitorTemplate}/>
              <Redirect from="/" to="/MonitorTemplate"/>
            </Switch>
          </App>
        </ConnectedRouter>
      </Provider>
    );
  }
}
