// @flow
import configureStoreDev from './configureStore.dev';
import configureStoreProd from './configureStore.prod';
// import { newMap } from '../actions/map';

const selectedConfigureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export const { configureStore } = selectedConfigureStore;

export const { history } = selectedConfigureStore;

export const store = configureStore();

// export const mapStoreToState = store.app;