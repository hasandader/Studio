import {
    SET_TOKEN,
    UI_START_LOADING,
    UI_STOP_LOADING,
    SET_USER,
} from '../types/apiTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../lib/constants';
import { appLanguage } from '../../lib/utility';
import Intercom from 'react-native-intercom';

console.log('appLanguage: ', appLanguage())
export const getAccessToken = (lang) => {
    const url = `${URL}feed/rest_api/gettoken&grant_type=client_credentials`;
    return dispatch => {
        dispatch(setStartLoading('getAccessToken'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Basic c2hvcHBpbmdfb2F1dGhfY2xpZW50OnNob3BwaW5nX29hdXRoX3NlY3JldA==`,
                'grant_type': 'client_credentials'
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('getAccessToken'));
                dispatch(setToken(parsedRes.data.access_token));
                AsyncStorage.setItem('token', parsedRes.data.access_token);
                console.log('getAccessToken: ', parsedRes);
            })
            .catch(err => {
                console.log('getAccessToken err:', err);
                dispatch(setStopLoading('getAccessToken'));
            });
    };
};

export const login = (token, email, password, lang) => {
    const url = `${URL}rest/login/login`;
    return dispatch => {
        dispatch(setStartLoading('login'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('login'));
                dispatch(setUser(parsedRes.data));
                Intercom.registerIdentifiedUser({ userId: parsedRes.data.customer_id });
                Intercom.updateUser({
                    email: parsedRes.data.email,
                    user_id: parsedRes.data.customer_id,
                    name: `${parsedRes.data.firstname} ${parsedRes.data.lastname}`,
                    phone: parsedRes.data.telephone,
                    language_override: lang,
                    signed_up_at: new Date(),
                });
                AsyncStorage.setItem('userData', JSON.stringify(parsedRes.data));
                console.log('login: ', parsedRes);
            })
            .catch(err => {
                console.log('login err:', err);
                dispatch(setStopLoading('login'));
            });
    };
};

export const register = (token, firstname, lastName, mail, password, phone, lang) => {
    const url = `${URL}rest/register/register`;
    return dispatch => {
        dispatch(setStartLoading('register'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastName,
                email: mail,
                password: password,
                confirm: password,
                telephone: phone,
                agree: 1
            })
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('register'));
                dispatch(setUser(parsedRes.data));
                AsyncStorage.setItem('userData', JSON.stringify(parsedRes.data));
                console.log('register: ', parsedRes);
            })
            .catch(err => {
                console.log('register err:', err);
                dispatch(setStopLoading('register'));
            });
    };
};

export const logout = (token, lang) => {
    const url = `${URL}rest/logout/logout`;
    return dispatch => {
        dispatch(setStartLoading('logout'));
        fetch(url, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'X-Oc-Merchant-Language': lang,
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(setStopLoading('logout'));
                dispatch(removeUserData());
                Intercom.logout();
                console.log('logout: ', parsedRes);
            })
            .catch(err => {
                console.log('logout err:', err);
                dispatch(setStopLoading('logout'));
            });
    };
};

export const getAuthData = (lang) => {
    return async dispatch => {
        let userData = await AsyncStorage.getItem('userData');
        userData = JSON.parse(userData);
        let token = await AsyncStorage.getItem('token');
        if (token == null) {
            dispatch(getAccessToken(lang));
        } else {
            dispatch(setToken(token));
        }
        dispatch(setUser(userData));
    }
};

export const removeUserData = () => {
    return async dispatch => {
        await AsyncStorage.removeItem('userData');
        dispatch(setUser(null));
    }
}


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

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        token: token
    };
};

export const setUser = data => {
    return {
        type: SET_USER,
        userData: data
    }
}