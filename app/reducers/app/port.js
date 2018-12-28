// import { INITIALIZE_PORT } from '../actions/port';
// import type { Action } from './types';

const initialState = {
    port: "COM1",
    addr: 1,
    baudRate: 115200,
    dataBits: 8, /* 5, 6, 7 */
    stopBits: 1, /* 1.5, 2 */
    parity: 'odd'    
}

export default function port(state: object = initialState, action: Action) {
    switch (action.type){
        // case INITIALIZE_PORT:
        //     return state = object;
        default: 
            return state;
    }
 }