// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app';
import map from './map';

// import counter from './counter';

export default function createRootReducer(history: History) {
  return combineReducers({
    app,
    map,
    router: connectRouter(history)
  });
}
