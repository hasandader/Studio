import {
    SET_CATEGORIES,
    SET_SUB_CATEGORIES,
    SET_CATEGORY_ITEMS,
    SET_CATEGORY_PRODUCTS,
    SET_VEIL
} from '../types/apiTypes';

const initialState = {
    categories: [],
    categoryItems: null,
    subCategories: null,
    categoryProducts: null,
    veil: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        case SET_SUB_CATEGORIES:
            return {
                ...state,
                subCategories: action.subCategories
            };
        case SET_CATEGORY_ITEMS:
            return {
                ...state,
                categoryItems: action.categoryItems
            };
        case SET_CATEGORY_PRODUCTS:
            return {
                ...state,
                categoryProducts: action.categoryProducts
            };
        case SET_VEIL:
            return {
                ...state,
                veil: action.veil
            }
        default:
            return state;
    }
};

export default reducer;