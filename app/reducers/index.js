// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import app from './app';
import map from './map';
import journal from './journal';

// import counter from './counter';

export default function createRootReducer(history: History) {
  return combineReducers({
    app,
    map,
    journal,
    router: connectRouter(history)
  });
}
