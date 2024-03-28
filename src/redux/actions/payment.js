import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    SET_SHIIPING_ADDRESS,
    SET_SHIIPING_METHOD,
    SET_ORDER_SUMMARY,
    SET_SHIIPING_ADDRESS_DONE,
    SET_USER_NEW_ADDRESS,
    SET_ORDER_CONFIRMED
} from '../types/apiTypes';
import { URL } from '../../lib/constants';

export const deleteAddress = (token, lang) => {
    const url = `${URL}rest/account/address&id=596`;
    return dispatch => {
        dispatch(setStartLoading('deleteAddress'));
        fetch(url, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('deleteAddress'));
                console.log('deleteAddress: ', parsedRes);
            })
            .catch(err => {
                console.log('deleteAddress err:', err);
                dispatch(setStopLoading('deleteAddress'));
            });
    };
};

export const addAddress = (token, firstame, lastName, telephone, address1, address2, latitude, longitude, lang, city) => {
    const url = `${URL}rest/account/address`;
    return dispatch => {
        dispatch(setStartLoading('addAddress'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                firstname: firstame,
                lastname: lastName,
                telephone: telephone,
                city: city,
                address_1: address1,
                address_2: address2,
                latitude: latitude,
                longitude: longitude,
                country_id: 184,
                postcode: "   ",
                company: "   ",
                default: 0,
                zone_id: 0,
                comment: ""
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('addAddress'));
                dispatch(setUserNewAddress(true));
                dispatch(getShippingAddress(token, lang));
                console.log('addAddress: ', parsedRes);
            })
            .catch(err => {
                console.log('addAddress err:', err);
                dispatch(setStopLoading('addAddress'));
            });
    };
};

export const getPaymentAddress = (token, lang) => {
    const url = `${URL}rest/payment_address/paymentaddress&existing=1`;
    return dispatch => {
        dispatch(setStartLoading('getPaymentAddress'));
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('getPaymentAddress'));
                console.log('getPaymentAddress: ', parsedRes);
            })
            .catch(err => {
                console.log('getPaymentAddress err:', err);
                dispatch(setStopLoading('getPaymentAddress'));
            });
    };
};

export const setPaymentAddress = (token, address, lang) => {
    const url = `${URL}rest/payment_address/paymentaddress&existing=1`;
    return dispatch => {
        dispatch(setStartLoading('setPaymentAddress'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(address)
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('setPaymentAddress'));
                console.log('setPaymentAddress: ', parsedRes);
            })
            .catch(err => {
                console.log('setPaymentAddress err:', err);
                dispatch(setStopLoading('setPaymentAddress'));
            });
    }
}

export const getShippingAddress = (token, lang) => {
    const url = `${URL}rest/shipping_address/shippingaddress&existing=1`;
    return dispatch => {
        dispatch(setStartLoading('getShippingAddress'));
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('getShippingAddress'));
                dispatch(setShippingAdd(parsedRes.data));
                console.log('getShippingAddress: ', parsedRes);
            })
            .catch(err => {
                console.log('getShippingAddress err:', err);
                dispatch(setStopLoading('getShippingAddress'));
            });
    };
};

export const setShippingAddress = (token, address, lang) => {
    const url = `${URL}rest/shipping_address/shippingaddress&existing=1`;
    return dispatch => {
        dispatch(setStartLoading('setShippingAddress'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(address)
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('setShippingAddress'));
                dispatch(setShippingAddDone(true));
                dispatch(getShippingMethod(token, lang));
                console.log('setShippingAddress: ', parsedRes);
            })
            .catch(err => {
                console.log('setShippingAddress err:', err);
                dispatch(setStopLoading('setShippingAddress'));
            });
    }
}

export const getShippingMethod = (token, lang) => {
    const url = `${URL}rest/shipping_method/shippingmethods`;
    return dispatch => {
        dispatch(setStartLoading('getShippingMethod'));
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('getShippingMethod'));
                dispatch(setShippingMethod(token, parsedRes.data.shipping_methods[0].quote[0].code, lang));
                console.log('getShippingMethod: ', parsedRes);
            })
            .catch(err => {
                console.log('getShippingMethod err:', err);
                dispatch(setStopLoading('getShippingMethod'));
            });
    };
};

export const setShippingMethod = (token, method, lang) => {
    const url = `${URL}rest/shipping_method/shippingmethods`;
    return dispatch => {
        dispatch(setStartLoading('setShippingMethod'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                shipping_method: method,
                comment: ''
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('setShippingMethod'));
                dispatch(getPaymentMethod(token, lang))
                console.log('setShippingMethod: ', parsedRes);
            })
            .catch(err => {
                console.log('setShippingMethod err:', err);
                dispatch(setStopLoading('setShippingMethod'));
            });
    }
}

export const getPaymentMethod = (token, lang) => {
    const url = `${URL}rest/payment_method/payments`;
    return dispatch => {
        dispatch(setStartLoading('getPaymentMethod'));
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('getPaymentMethod'));
                console.log('getPaymentMethod: ', parsedRes);
            })
            .catch(err => {
                console.log('getPaymentMethod err:', err);
                dispatch(setStopLoading('getPaymentMethod'));
            });
    };
};

export const setPaymentMethod = (token, method, lang) => {
    const url = `${URL}rest/payment_method/payments`;
    return dispatch => {
        dispatch(setStartLoading('setPaymentMethod'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                payment_method: method,
                comment: '',
                agree: 1
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('setPaymentMethod'));
                dispatch(confirmOrder(token, lang));
                console.log('setPaymentMethod: ', parsedRes);
            })
            .catch(err => {
                console.log('setPaymentMethod err:', err);
                dispatch(setStopLoading('setPaymentMethod'));
            });
    }
};

export const confirmOrder = (token, lang) => {
    const url = `${URL}rest/confirm/confirm`;
    return dispatch => {
        dispatch(setStartLoading('confirmOrder'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('confirmOrder'));
                dispatch(setOrderSummary(parsedRes.data));
                console.log('confirmOrder: ', parsedRes);
            })
            .catch(err => {
                console.log('confirmOrder err:', err);
                dispatch(setStopLoading('confirmOrder'));
            });
    }
};

export const completeOrder = (token, orderID, lang) => {
    const url = `${URL}rest/simple_confirm/confirm`;
    return dispatch => {
        dispatch(setStartLoading('completeOrder'));
        fetch(url, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                order_id: orderID
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('completeOrder'));
                dispatch(setOrderConfirmed(true));
                console.log('completeOrder: ', parsedRes);
            })
            .catch(err => {
                console.log('completeOrder err:', err);
                dispatch(setStopLoading('completeOrder'));
            });
    }
};

export const payByCard = (token, lang) => {
    const url = `${URL}rest/pay/pay`;
    return dispatch => {
        dispatch(setStartLoading('payByCard'));
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('payByCard'));
                console.log('payByCard: ', parsedRes);
            })
            .catch(err => {
                console.log('payByCard err:', err);
                dispatch(setStopLoading('payByCard'));
            });
    }
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

export const setShippingAdd = data => {
    return {
        type: SET_SHIIPING_ADDRESS,
        shippingAddress: data
    };
};

export const setShippingAddDone = data => {
    return {
        type: SET_SHIIPING_ADDRESS_DONE,
        shippingAddressDone: data
    };
};

export const setShippingMeth = data => {
    return {
        type: SET_SHIIPING_METHOD,
        shippingMethod: data
    };
};

export const setOrderSummary = data => {
    return {
        type: SET_ORDER_SUMMARY,
        orderSummary: data
    };
};

export const setUserNewAddress = data => {
    return {
        type: SET_USER_NEW_ADDRESS,
        newAddressAdded: data
    }
};

export const setOrderConfirmed = data => {
    return {
        type: SET_ORDER_CONFIRMED,
        orderConfirmed: data
    }
};