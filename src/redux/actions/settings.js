import {
    SET_LANGUAGE
} from '../types/apiTypes';
import { URL } from '../../lib/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appLanguage } from '../../lib/utility';

export const getLanguages = (token) => {
    const url = `${URL}feed/rest_api/languages`;
    return dispatch => {
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(parsedRes => {
                let lang = '';
                if (appLanguage() == 'en') {
                    lang = 'English';
                } else {
                    lang = 'عربي'
                };
                let appLang = parsedRes.data.find((item) => item.name == lang);
                console.log('appLang: ', appLang);
                dispatch(changeLanguage(appLang.code));
                console.log('getLanguages: ', parsedRes);
            })
            .catch(err => {
                console.log('getLanguages err:', err);
            });
    };
};

export const changeLanguage = (language) => {
    return async dispatch => {
        await AsyncStorage.setItem('language', language);
        dispatch(setLanguage(language));
    };
};

export const getLanguage = () => {
    return async dispatch => {
        let language = await AsyncStorage.getItem('language');
        if (language !== null) {
            dispatch(setLanguage(language));
        } else {
            console.log('no language saved!')
        }
    }
};

export const setLanguage = data => {
    return {
        type: SET_LANGUAGE,
        lang: data
    };
};