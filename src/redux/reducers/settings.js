import {
    SET_LANGUAGE
} from '../types/apiTypes';

const initialState = {
    lang: 'ar',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state,
                lang: action.lang
            };
        default:
            return state;
    }
};

export default reducer;