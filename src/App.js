import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isArabic } from './lib/utility';
import { changeLanguage, getLanguages } from './redux/actions/settings';
import { AppStacks } from '../src/navigation/index';
import { getAuthData } from './redux/actions/auth';
import SplashScreen from 'react-native-splash-screen';

function App() {

    const token = useSelector(state => state.auth.token);
    const lang = useSelector(state => state.settings.lang);

    const dispatch = useDispatch();

    const languageHandler = useCallback(() => {
        let language = isArabic() ? 'ar' : 'en';
        dispatch(changeLanguage(language));
    }, [dispatch]);

    const authDataHandler = useCallback(() => {
        dispatch(getAuthData(lang));
    }, [dispatch]);

    const languagesHandler = useCallback(() => {
        dispatch(getLanguages(token));
    }, [token]);

    useEffect(() => {
        languageHandler();
        authDataHandler();
    }, []);

    useEffect(() => {
        if (token) {
            SplashScreen.hide();
            languagesHandler();
            console.log('true')
        }
    }, [token]);

    if (token) {
        return (
            <AppStacks />
        )
    } else { return null }

};

export default App;
