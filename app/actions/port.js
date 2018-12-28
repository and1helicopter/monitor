// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const INITIALIZE_PORT = 'INITIALIZE_PORT';

export function initialize_port() {
  return {
    type: INITIALIZE_PORT
  };
}

// export function portAsync(delay: number = 1000) {
//   return (dispatch: Dispatch) => {
//     setTimeout(() => {
//       dispatch(port());
//     }, delay);
//   };
// }
