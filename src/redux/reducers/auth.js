import {
    SET_TOKEN,
    SET_USER,
} from '../types/apiTypes';

const initialState = {
    token: null,
    stopSplash: false,
    userData: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token,
                stopSplash: true
            };
        case SET_USER:
            return {
                ...state,
                userData: action.userData
            };
        default:
            return state;
    }
};

export default reducer;