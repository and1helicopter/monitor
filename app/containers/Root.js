// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect, Switch, Route } from 'react-router';
import App from "./App";
import Monitor from "./MonitorTamplate";
import Test from "./Test";
import Settings from "./SettingsTamplate";
import ContainerForm from "./ContainerForm"

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
              <Route path="/ContainerForm/:name,:ref" component={ContainerForm}/>

              <Route path="/Test" component={Test}/>
              
              <Route path="/SettingsTamplate" component={Settings}/>

              <Route exact path="/Monitor" component={Monitor}/>
              <Redirect from="/" to="/Monitor"/>
            </Switch>
          </App>
        </ConnectedRouter>
      </Provider>
    );
  }
}
