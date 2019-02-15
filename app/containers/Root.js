// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { Redirect, Switch, Route } from 'react-router';
// import { spring, AnimatedSwitch } from 'react-router-transition';

import App from "./App";
import MonitorTemplate from "./MonitorTemplate";
import JournalTemplate from "./JournalTemplate";
import SettingsTemplate from "./SettingsTemplate";
import ContainerTemplate from "./ContainerTemplate"
// import Fade from '@material-ui/core/Fade';


type Props = {
  store: Store,
  history: {}
};

const styles =  () => ({
  ".route-wrapper": {
    position: "relative"
  },  
  ".route-wrapper > div": {
    position: "absolute"
  }
})


class Root extends Component<Props>  {
  render(){
    const { store, history } = this.props;  
    console.log("location");
    console.log(this.props);
    return (
      <Provider store={store}>
            <ConnectedRouter history={history}>
              <App>
                <Switch>
                  <Route path="/ContainerTemplate/:name,:ref" component={ContainerTemplate}/>
                  <Route path="/JournalTemplate" component={JournalTemplate}/>      
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


export default withStyles(styles)(Root);
