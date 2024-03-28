import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import Button from '../../components/Button/index';
import { global, flag, help, about, categories, leftArrow, rightArrow, checkList, logOut } from '../../images/index';
import { fonts } from '../../theme/fonts';
import Langs from '../../lib/Langs';
import { isArabic } from '../../lib/utility';
import { logout } from '../../redux/actions/auth';
import { getCart } from '../../redux/actions/cart';
import { getWishlist } from '../../redux/actions/wishlist';
import { useSelector, useDispatch } from 'react-redux';
import Intercom from 'react-native-intercom';

export default function Profile(props) {
    const arrow = isArabic() ? leftArrow : rightArrow

    const token = useSelector(state => state.auth.token);
    const userData = useSelector(state => state.auth.userData);
    const lang = useSelector(state => state.settings.lang);

    console.log('userData: ', userData)

    const dispatch = useDispatch();

    const logoutHandler = useCallback(() => {
        dispatch(logout(token, lang));
    }, [dispatch, token, lang]);

    const screensHandler = useCallback(() => {
        dispatch(getCart(token, lang));
        dispatch(getWishlist(token, lang));
    }, [dispatch, token, lang]);

    useEffect(() => {
        screensHandler();
    }, [userData]);

    return (
        <View style={styles.container}>
            <Header
                title={Langs.t('account')}
                headerRight={
                    <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Categories') }}>
                        <Image source={categories} style={{ width: 22, height: 22 }} />
                    </TouchableOpacity>
                }
                leftStyle={styles.button}
                style={styles.header}
            />
            <Button
                title={Langs.t('login')}
                titleStyle={[styles.btnTitle, { color: primaryColors.denim }]}
                style={styles.button1}
                onPress={() => props.navigation.navigate('Login', {
                    loginBy: 'mobile'
                })}
            />
            <View style={styles.divider} />
            <Button
                title={Langs.t('orders')}
                titleStyle={styles.btnTitle}
                style={styles.stateBtn}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={checkList} style={[{ width: 17, height: 18 }, styles.iconAlignment1]} />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
                onPress={() => props.navigation.navigate('Requests')}
            />
            <View style={styles.divider} />
            <Button
                title={Langs.t('langsAndRegion')}
                titleStyle={styles.btnTitle}
                style={styles.stateBtn}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={global} style={[{ width: 16, height: 16 }, styles.iconAlignment1]} />
                }
                subChild={
                    <View style={styles.countryWraper}>
                        <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                        <Image source={flag} style={{ width: 27, height: 16 }} />
                        <Text children='SA' fontFamily={fonts.regular} fontSize={12} color={primaryColors.santaFe} style={styles.country} />
                    </View>
                }
                onPress={() => props.navigation.navigate('Settings')}
            />
            <View style={styles.divider} />
            <Button
                title={Langs.t('customersService')}
                titleStyle={styles.btnTitle}
                style={styles.stateBtn}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={help} style={[{ width: 17, height: 18 }, styles.iconAlignment1]} />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
                onPress={() => {
                    // props.navigation.navigate('CustomersService');
                    if (userData) {
                        Intercom.displayMessenger();
                    } else {
                        console.log('user is not logged!');
                        Intercom.registerUnidentifiedUser();
                        Intercom.displayMessenger();
                    }
                }}
            />
            <View style={styles.divider} />
            <Button
                title={Langs.t('aboutGheed')}
                titleStyle={styles.btnTitle}
                style={[styles.stateBtn, styles.radius]}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={about} style={[{ width: 18, height: 18 }, styles.iconAlignment1]} />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
                onPress={() => props.navigation.navigate('MyAccount')}
            />
            {
                userData &&
                <>
                    <View style={styles.divider} />
                    <Button
                        title={Langs.t('logout')}
                        titleStyle={styles.btnTitle}
                        style={[styles.stateBtn, styles.radius]}
                        iconTxtStyle={styles.iconTxtStyle}
                        icon={
                            <Image source={logOut} style={[{ width: 18, height: 16 }, styles.iconAlignment1]} />
                        }
                        subChild={
                            <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                        }
                        onPress={() => logoutHandler()}
                    />
                </>
            }
        </View>
    )
}