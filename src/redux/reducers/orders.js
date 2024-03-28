import {
    SET_ORDERS,
    SET_ORDER_DETAILS,
    SET_STATUSES
} from '../types/apiTypes';

const initialState = {
    orders: null,
    orderDetails: null,
    statuses: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            };
        case SET_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.orderDetails
            };
        case SET_STATUSES:
            return {
                ...state,
                statuses: action.statuses
            };
        default:
            return state;
    }
};

export default reducer;