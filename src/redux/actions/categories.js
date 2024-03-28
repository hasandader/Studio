import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    SET_CATEGORIES,
    SET_CATEGORY_ITEMS,
    SET_SUB_CATEGORIES,
    SET_CATEGORY_PRODUCTS,
    SET_VEIL
} from '../types/apiTypes';
import { URL } from '../../lib/constants';

export const getCategories = (token, lang) => {
    const url = `${URL}feed/rest_api/categories`;
    return dispatch => {
        dispatch(setStartLoading('getCategories'));
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                'X-Oc-Image-Dimension': '677x1015',
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('getCategories'));
                dispatch(setCategories(parsedRes.data));
                console.log('getCategories: ', parsedRes);
            })
            .catch(err => {
                console.log('getCategories err:', err);
                dispatch(setStopLoading('getCategories'));
            });
    };
};

export const getVeil = (token, lang) => {
    const url = `${URL}feed/rest_api/categories/5`;
    return dispatch => {
        dispatch(setStartLoading('getVeil'));
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                'X-Oc-Image-Dimension': '677x1015',
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('getVeil'));
                dispatch(setVeil([parsedRes.data]));
                console.log('getVeil: ', parsedRes);
            })
            .catch(err => {
                console.log('getVeil err:', err);
                dispatch(setStopLoading('getVeil'));
            });
    };
};

export const getSubCategories = (token, parentID, lang) => {
    const url = `${URL}feed/rest_api/categories&parent=${parentID}`;
    return dispatch => {
        dispatch(setStartLoading('getSubCategories'));
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                'X-Oc-Image-Dimension': '677x1015',
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('getSubCategories'));
                dispatch(setSubCategories(parsedRes.data));
                console.log('getSubCategories: ', parsedRes);
            })
            .catch(err => {
                console.log('getSubCategories err:', err);
                dispatch(setStopLoading('getSubCategories'));
            });
    };
};

export const getCategoryItems = (token, categoryID, lang) => {
    const url = `${URL}feed/rest_api/categories&id=${categoryID}`;
    return dispatch => {
        dispatch(setStartLoading('getCategoryItems'));
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                'X-Oc-Image-Dimension': '677x1015',
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('getCategoryItems'));
                dispatch(setCategoryItems(parsedRes.data));
                console.log('getCategoryItems: ', parsedRes);
            })
            .catch(err => {
                console.log('getCategoryItems err:', err);
                dispatch(setStopLoading('getCategoryItems'));
            });
    };
};

export const getCategoryProducts = (token, categoryID, lang) => {
    const url = `${URL}feed/rest_api/products&category=${categoryID}`;
    return dispatch => {
        dispatch(setStartLoading('getCategoryProducts'));
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                'X-Oc-Image-Dimension': '677x1015',
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('getCategoryProducts'));
                dispatch(setCategoryProducts(parsedRes.data));
                console.log('getCategoryProducts: ', parsedRes);
            })
            .catch(err => {
                console.log('getCategoryProducts err:', err);
                dispatch(setStopLoading('getCategoryProducts'));
            });
    };
};


export const setStartLoading = data => {
    return {
        type: UI_START_LOADING,
        value: data
    };
};

export const setStopLoading = data => {
    return {
        type: UI_STOP_LOADING,
        value: data
    };
};

export const setCategories = data => {
    return {
        type: SET_CATEGORIES,
        categories: data
    };
};

export const setVeil = data => {
    return {
        type: SET_VEIL,
        veil: data
    };
};

export const setSubCategories = data => {
    return {
        type: SET_SUB_CATEGORIES,
        subCategories: data
    };
};

export const setCategoryItems = data => {
    return {
        type: SET_CATEGORY_ITEMS,
        categoryItems: data
    };
};

export const setCategoryProducts = data => {
    return {
        type: SET_CATEGORY_PRODUCTS,
        categoryProducts: data
    }
}