import {
    SET_SHIIPING_ADDRESS,
    SET_SHIIPING_METHOD,
    SET_ORDER_SUMMARY,
    SET_SHIIPING_ADDRESS_DONE,
    SET_USER_NEW_ADDRESS,
    SET_ORDER_CONFIRMED
} from '../types/apiTypes';

const initialState = {
    shippingAddress: null,
    shippingMethod: null,
    orderSummary: null,
    shippingAddressDone: false,
    newAddressAdded: false,
    orderConfirmed: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHIIPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.shippingAddress
            };
        case SET_SHIIPING_METHOD:
            return {
                ...state,
                shippingMethod: action.shippingMethod
            };
        case SET_ORDER_SUMMARY:
            return {
                ...state,
                orderSummary: action.orderSummary
            };
        case SET_SHIIPING_ADDRESS_DONE:
            return {
                ...state,
                shippingAddressDone: action.shippingAddressDone
            };
        case SET_USER_NEW_ADDRESS:
            return {
                ...state,
                newAddressAdded: action.newAddressAdded
            };
        case SET_ORDER_CONFIRMED:
            return {
                ...state,
                orderConfirmed: action.orderConfirmed
            };
        default:
            return state;
    }
};

export default reducer;