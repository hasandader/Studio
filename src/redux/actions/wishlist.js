import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    SET_WISHLIST
} from '../types/apiTypes';
import { URL } from '../../lib/constants';

export const getWishlist = (token, lang) => {
    const url = `${URL}rest/wishlist/wishlist`;
    return dispatch => {
        dispatch(setStartLoading('getWishlist'));
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
                dispatch(setStopLoading('getWishlist'));
                dispatch(setWhishlist(parsedRes.data));
                console.log('getWishlist: ', parsedRes);
            })
            .catch(err => {
                console.log('getWishlist err:', err);
                dispatch(setStopLoading('getWishlist'));
            });
    };
};

export const addToWishlist = (token, product_id, lang) => {
    const url = `${URL}rest/wishlist/wishlist&id=${product_id}`;
    return dispatch => {
        dispatch(setStartLoading('addToWishlist'));
        fetch(url, {
            method: "POST",
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
                dispatch(setStopLoading('addToWishlist'));
                dispatch(getWishlist(token, lang));
                console.log('addToWishlist: ', parsedRes);
            })
            .catch(err => {
                console.log('addToWishlist err:', err);
                dispatch(setStopLoading('addToWishlist'));
            });
    };
};

export const removeFromWishlist = (token, product_id, lang) => {
    const url = `${URL}rest/wishlist/wishlist&id=${product_id}`;
    return dispatch => {
        dispatch(setStartLoading('removeFromWishlist'));
        fetch(url, {
            method: "DELETE",
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
                dispatch(setStopLoading('removeFromWishlist'));
                dispatch(getWishlist(token, lang));
                console.log('removeFromWishlist: ', parsedRes);
            })
            .catch(err => {
                console.log('removeFromWishlist err:', err);
                dispatch(setStopLoading('removeFromWishlist'));
            });
    };
};

export const setWhishlist = data => {
    return {
        type: SET_WISHLIST,
        wishlist: data
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