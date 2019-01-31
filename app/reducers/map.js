import { NEW_MAP, ADD_MAP, UPDATE_MAP } from '../actions/actions';

const initialState = [
    {
        name: "value1",
        addr: 0x0269,
        val: 10000
    },
    {
        name: "value2",
        addr: 0x0270,
        val: 11111
    },
    {
        name: "value3",
        addr: 0x0271,
        val: 12345
    },
    {
        name: "value4",
        addr: 0x0272,
        val: 12345
    }
]

export default function map(state = initialState, action) {
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

