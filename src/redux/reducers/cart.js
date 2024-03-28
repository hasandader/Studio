import {
    SET_CART
} from '../types/apiTypes';

const initialState = {
    cart: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART:
            return {
                ...state,
                cart: action.cart
            };
        default:
            return state;
    }
};

export default reducer;