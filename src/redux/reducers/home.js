import {
    SET_BESTSELLERS,
    SET_PRODUCT_DETAILS,
    SET_ALL_BESTSELLERS,
    SET_LATEST,
    SET_ALL_LATEST,
    SET_BANNERS
} from '../types/apiTypes';

const initialState = {
    productDetails: null,
    bestsellers: null,
    allBestsellers: null,
    latest: null,
    allLatest: null,
    banners: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BANNERS:
            return {
                ...state,
                banners: action.banners
            };
        case SET_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.productDetails
            };
        case SET_BESTSELLERS:
            return {
                ...state,
                bestsellers: action.bestsellers
            };
        case SET_ALL_BESTSELLERS:
            return {
                ...state,
                allBestsellers: action.allBestsellers
            };
        case SET_LATEST:
            return {
                ...state,
                latest: action.latest
            };
        case SET_ALL_LATEST:
            return {
                ...state,
                allLatest: action.allLatest
            };
        default:
            return state;
    }
};

export default reducer;