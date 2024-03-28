import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Langs from '../../lib/Langs';
import styles from './Style';
import Header from '../../components/Header/index';
import { backBtn, categories, done, checkBoxActive } from '../../images/index';
import Text from '../../components/Text/index';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import Button from '../../components/Button/index';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderConfirmed } from '../../redux/actions/payment';
import { getCart } from '../../redux/actions/cart';


export default function OrderDone(props) {

    const token = useSelector(state => state.auth.token);
    const lang = useSelector(state => state.settings.lang);

    const dispatch = useDispatch();

    const completeOrderHandler = useCallback(() => {
        dispatch(setOrderConfirmed(false));
    }, [dispatch, token]);

    const cartHandler = useCallback(() => {
        dispatch(getCart(token, lang));
    }, [dispatch, token, lang]);

    useEffect(() => {
        completeOrderHandler()
    }, []);

    return (
        <View style={styles.container}>
            <Header
                title={Langs.t('buy')}
                headerRight={
                    <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Categories') }}>
                        <Image source={categories} style={{ width: 22, height: 22 }} />
                    </TouchableOpacity>
                }
                headerLeft={
                    <TouchableOpacity style={styles.backBtn} onPress={() => { props.navigation.pop() }}>
                        <Image source={backBtn} style={{ width: 22, height: 10 }} resizeMode='contain' />
                    </TouchableOpacity>
                }
                leftStyle={styles.button}
                style={styles.header}
            />

            <Image source={done} style={{ width: 130, height: 130, alignSelf: 'center', marginTop: 30 }} />

            <Text children={Langs.t('congrats')} fontFamily={fonts.bold} fontSize={22} align='center'
                mTop={35} lineHeight={25}
            />
            <Text children={Langs.t('purchaseSuccessfull')} fontFamily={fonts.bold} fontSize={18}
                align='center' mTop={35} lineHeight={25} mRight={5} mLeft={5} />
            <Text children={Langs.t('gheedWishes')} fontFamily={fonts.bold} fontSize={18}
                align='center' lineHeight={25} mRight={5} mLeft={5} />

            <Button
                title={Langs.t('continueShopping')}
                titleStyle={styles.btnTxt}
                style={[styles.buyBtn, styles.updatedBuyBtn]}
                onPress={() => {
                    cartHandler();
                    props.navigation.popToTop();
                    props.navigation.navigate('Home');
                }}
            />
        </View>
    );
}
