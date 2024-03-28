import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    SET_CART
} from '../types/apiTypes';
import { URL } from '../../lib/constants';

export const getCart = (token, loading, lang) => {
    const url = `${URL}rest/cart/cart`;
    return dispatch => {
        dispatch(setStartLoading(loading || 'getCart'));
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
                dispatch(setStopLoading(loading || 'getCart'));
                dispatch(setCart(parsedRes.data));
                console.log('getCart: ', parsedRes);
            })
            .catch(err => {
                console.log('getCart err:', err);
                dispatch(setStopLoading(loading || 'getCart'));
            });
    };
};

export const addToCart = (token, product_id, quantity, product_option_id, product_option_value_id, lang) => {
    const url = `${URL}rest/cart/cart`;
    console.log('product_id, quantity, size: ', product_id, quantity, product_option_id, product_option_value_id)
    return dispatch => {
        dispatch(setStartLoading('getCart'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                'X-Oc-Image-Dimension': '677x1015',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: product_id,
                quantity: quantity,
                option: {
                    [product_option_id]: product_option_value_id,
                }
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('addToCart'));
                dispatch(getCart(token, lang));
                console.log('addToCart: ', parsedRes);
            })
            .catch(err => {
                console.log('addToCart err:', err);
                dispatch(setStopLoading('addToCart'));
            });
    };
};

export const changeQuantity = (token, key, quantity, lang) => {
    const url = `${URL}rest/cart/cart`;
    console.log('product_key, quantity: ', key, quantity)
    return dispatch => {
        dispatch(setStartLoading('changeQuantity'));
        fetch(url, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                'X-Oc-Image-Dimension': '677x1015',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                key: key,
                quantity: quantity
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('changeQuantity'));
                dispatch(getCart(token, 'changeQuantity', lang));
                console.log('changeQuantity: ', parsedRes);
            })
            .catch(err => {
                console.log('changeQuantity err:', err);
                dispatch(setStopLoading('changeQuantity'));
            });
    };
};

export const deleteItem = (token, key, lang) => {
    const url = `${URL}rest/cart/cart`;
    console.log('product_key: ', key)
    return dispatch => {
        dispatch(setStartLoading('deleteItem'));
        fetch(url, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                'X-Oc-Image-Dimension': '677x1015',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                key: key
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('deleteItem'));
                dispatch(getCart(token, 'deleteItem', lang));
                console.log('deleteItem: ', parsedRes);
            })
            .catch(err => {
                console.log('deleteItem err:', err);
                dispatch(setStopLoading('deleteItem'));
            });
    };
};

export const setCart = data => {
    return {
        type: SET_CART,
        cart: data
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