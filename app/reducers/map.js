import { NEW_MAP, ADD_MAP, UPDATE_MAP } from '../actions/actions';

export default function map(state = [], action) {
    switch (action.type){
        case NEW_MAP: 
            return action.map;
        case ADD_MAP:
            return action.map;
        case UPDATE_MAP:
            return action.map
        default:
            return state;
    }
}

