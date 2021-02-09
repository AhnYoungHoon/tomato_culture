import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'


export default function (state={}, action){ //전 state을 action으로 만들어줌
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
            return {...state, register: action.payload}
            break;
        case AUTH_USER:
            return {...state, userData: action.payload}
            break;


        default:
            return state;

    }
}