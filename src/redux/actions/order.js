import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    SET_ORDERS,
    SET_ORDER_DETAILS,
    SET_STATUSES
} from '../types/apiTypes';
import { URL } from '../../lib/constants';

export const getOrders = (token, lang) => {
    const url = `${URL}rest/order/orders`;
    return dispatch => {
        dispatch(setStartLoading('getOrders'));
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
                dispatch(setStopLoading('getOrders'));
                dispatch(setOrders(parsedRes.data));
                console.log('getOrders: ', parsedRes);
            })
            .catch(err => {
                console.log('getOrders err:', err);
                dispatch(setStopLoading('getOrders'));
            });
    };
};

export const getOrderDetails = (token, orderID, lang) => {
    const url = `${URL}rest/order/orders&id=${orderID}`;
    return dispatch => {
        dispatch(setStartLoading('getOrderDetails'));
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
                dispatch(setStopLoading('getOrderDetails'));
                dispatch(setOrderDetails(parsedRes.data));
                console.log('getOrderDetails: ', parsedRes);
            })
            .catch(err => {
                console.log('getOrderDetails err:', err);
                dispatch(setStopLoading('getOrderDetails'));
            });
    };
};

export const getStatuses = (token, lang) => {
    const url = `${URL}feed/rest_api/order_statuses`;
    return dispatch => {
        dispatch(setStartLoading('getStatuses'));
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
                dispatch(setStopLoading('getStatuses'));
                dispatch(setStatuses(parsedRes.data));
                console.log('getStatuses: ', parsedRes);
            })
            .catch(err => {
                console.log('getStatuses err:', err);
                dispatch(setStopLoading('getStatuses'));
            });
    };
};

export const setOrders = data => {
    return {
        type: SET_ORDERS,
        orders: data
    };
};

export const setOrderDetails = data => {
    return {
        type: SET_ORDER_DETAILS,
        orderDetails: data
    };
};

export const setStatuses = data => {
    return {
        type: SET_STATUSES,
        statuses: data
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