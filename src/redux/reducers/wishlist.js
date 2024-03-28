import {
    SET_WISHLIST
} from '../types/apiTypes';

const initialState = {
    wishlist: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WISHLIST:
            return {
                ...state,
                wishlist: action.wishlist
            };
        default:
            return state;
    }
};

export default reducer;