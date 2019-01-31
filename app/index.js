import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
// import App from './containers/App'
import {  store, history } from './store/configureStore';
// import Base from "./containers/Base";
// import './app.global.css';

//const store = configureStore();
// store={store} history={history}
// const store = configureStore();
// store={store} history={history}
render(
  <AppContainer>
    <Root store={store} history={history}/>
  </AppContainer>, 
  document.getElementById('root')
);

// render(
//   <AppContainer>
//     <Root store={store} history={history} />
//   </AppContainer>,
//   document.getElementById('root')
// );

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
