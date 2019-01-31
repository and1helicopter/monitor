/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
import { NEW_MAP, ADD_MAP, UPDATE_MAP } from './actions';

export function newMap(map) {
    return {
        type: NEW_MAP,
        map: {map}
    }
}

export function addMap(map) {
    return {
        type: ADD_MAP,
        map: {map}
    }
}

export function updateMap(map) {
    return {
        type: UPDATE_MAP,
        map: {map}
    }    
}
// export const newMap = map => ({
//     type: NEW_MAP,
//     map: {map}
// })