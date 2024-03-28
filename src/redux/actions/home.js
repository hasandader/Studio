import {
    UI_START_LOADING,
    UI_STOP_LOADING,
    SET_PRODUCTS,
    SET_BESTSELLERS,
    SET_BANNERS,
    SET_PRODUCT_DETAILS,
    SET_ALL_BESTSELLERS,
    SET_LATEST,
    SET_ALL_LATEST
} from '../types/apiTypes';
import { URL } from '../../lib/constants';

export const getBanners = (token, lang) => {
    const url = `${URL}feed/rest_api/banners&id=7`;
    return dispatch => {
        dispatch(setStartLoading('getBanners'));
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
                dispatch(setStopLoading('getBanners'));
                dispatch(setBanners(parsedRes.data));
                console.log('getBanners: ', parsedRes);
            })
            .catch(err => {
                console.log('getBanners err:', err);
                dispatch(setStopLoading('getBanners'));
            });
    };
};

export const getBannerDetails = (token, lang) => {
    const url = `${URL}feed/rest_api/banners&id=8`;
    return dispatch => {
        dispatch(setStartLoading('getBannerDetails'));
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
                dispatch(setStopLoading('getBannerDetails'));
                // dispatch(setProductDetails(parsedRes.data));
                console.log('getBannerDetails: ', parsedRes);
            })
            .catch(err => {
                console.log('getBannerDetails err:', err);
                dispatch(setStopLoading('getBannerDetails'));
            });
    };
};

export const getProductDetails = (token, productID, lang) => {
    const url = `${URL}feed/rest_api/products&id=${productID}`;
    console.log('productID productID productID: ', productID)
    return dispatch => {
        dispatch(setStartLoading('getProductDetails'));
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
                dispatch(setStopLoading('getProductDetails'));
                dispatch(setProductDetails(parsedRes.data));
                console.log('getProductDetails: ', parsedRes);
            })
            .catch(err => {
                console.log('getProductDetails err:', err);
                dispatch(setStopLoading('getProductDetails'));
            });
    };
};

export const getLatest = (token, lang) => {
    const url = `${URL}feed/rest_api/latest&limit=4`;
    return dispatch => {
        dispatch(setStartLoading('getLatest'));
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
                dispatch(setStopLoading('getLatest'));
                dispatch(setLatest(parsedRes.data));
                console.log('getLatest: ', parsedRes);
            })
            .catch(err => {
                console.log('getLatest err:', err);
                dispatch(setStopLoading('getLatest'));
            });
    };
};

export const getAllLatest = (token, lang) => {
    const url = `${URL}feed/rest_api/latest`;
    return dispatch => {
        dispatch(setStartLoading('getAllLatest'));
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
                dispatch(setStopLoading('getAllLatest'));
                dispatch(setAllLatest(parsedRes.data));
                console.log('getAllLatest: ', parsedRes);
            })
            .catch(err => {
                console.log('getAllLatest err:', err);
                dispatch(setStopLoading('getAllLatest'));
            });
    };
};

export const getBestsellers = (token, lang) => {
    const url = `${URL}/bestsellers/limit&limit=10`;
    return dispatch => {
        dispatch(setStartLoading('getBestsellers'));
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
                dispatch(setStopLoading('getBestsellers'));
                dispatch(setBestsellers(parsedRes.data));
                console.log('getBestsellers: ', parsedRes);
            })
            .catch(err => {
                console.log('getBestsellers err:', err);
                dispatch(setStopLoading('getBestsellers'));
            });
    };
};

export const getAllBestsellers = (token, lang) => {
    const url = `${URL}bestsellers`;
    return dispatch => {
        dispatch(setStartLoading('getAllBestsellers'));
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
                dispatch(setStopLoading('getAllBestsellers'));
                dispatch(setAllBestsellers(parsedRes.data));
                console.log('getAllBestsellers: ', parsedRes);
            })
            .catch(err => {
                console.log('getAllBestsellers err:', err);
                dispatch(setStopLoading('getAllBestsellers'));
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

export const setProductDetails = data => {
    return {
        type: SET_PRODUCT_DETAILS,
        productDetails: data
    };
};

export const setBestsellers = data => {
    return {
        type: SET_BESTSELLERS,
        bestsellers: data
    };
};

export const setAllBestsellers = data => {
    return {
        type: SET_ALL_BESTSELLERS,
        allBestsellers: data
    };
};

export const setLatest = data => {
    return {
        type: SET_LATEST,
        latest: data
    };
};

export const setAllLatest = data => {
    return {
        type: SET_ALL_LATEST,
        allLatest: data
    };
};

export const setBanners = data => {
    return {
        type: SET_BANNERS,
        banners: data
    };
};