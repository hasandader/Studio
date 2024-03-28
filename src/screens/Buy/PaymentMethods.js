import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Langs from '../../lib/Langs';
import styles from './Style';
import Header from '../../components/Header/index';
import { backBtn, categories, checkBox, checkBoxActive } from '../../images/index';
import Text from '../../components/Text/index';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import Button from '../../components/Button/index';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentMethod } from '../../redux/actions/payment';


export default function PaymentMethods(props) {

    const token = useSelector(state => state.auth.token);
    const shippingMethod = useSelector(state => state.payment.shippingMethod);
    const orderSummary = useSelector(state => state.payment.orderSummary);
    const loadings = useSelector(state => state.ui.isLoading);
    const lang = useSelector(state => state.settings.lang);

    const [selectedMethod, setSelectedMethod] = useState('tap');

    const dispatch = useDispatch();

    const setPaymentMethodHandler = useCallback(() => {
        dispatch(setPaymentMethod(token, selectedMethod, lang));
    }, [dispatch, token, selectedMethod, lang]);

    useEffect(() => {
        if (shippingMethod) {
            console.log('shippingMethod: ', shippingMethod);
        }
    }, [shippingMethod]);

    useEffect(() => {
        if (orderSummary) {
            if (orderSummary.totals) {
                console.log('we have order summar: ', orderSummary);
                props.navigation.navigate('OrderSummary');
            }
        }
    }, [orderSummary]);

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
            <Text children={Langs.t('paymentMethod')}
                lineHeight={25}
                fontFamily={fonts.bold} fontSize={18} mTop={18} mBottom={15} style={styles.title} />
            <View>
                <TouchableOpacity style={styles.checkBoxs} onPress={() => setSelectedMethod('tap')}>
                    <Image source={selectedMethod == 'tap' ? checkBoxActive : checkBox} style={{ width: 16, height: 16 }} />
                    <View >
                        <Text children={Langs.t('payByCreditCart')}
                            fontFamily={fonts.bold} fontSize={17} color={primaryColors.tundora}
                            style={styles.title} />
                        <Text children={Langs.t('thisOfferIncludesExtraDiscounts')}
                            fontFamily={fonts.regular} fontSize={16} color={primaryColors.tundora}
                            style={styles.title} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkBoxs} onPress={() => setSelectedMethod('cod')}>
                    <Image source={selectedMethod == 'cod' ? checkBoxActive : checkBox} style={{ width: 16, height: 16 }} />
                    <View >
                        <Text children={Langs.t('paymentUponReceipt')}
                            fontFamily={fonts.bold} fontSize={17} color={primaryColors.tundora}
                            style={styles.title} />
                        <Text children={Langs.t('additionalFeesWhenChoosingThisService')}
                            fontFamily={fonts.regular} fontSize={16} color={primaryColors.tundora}
                            style={styles.title} />
                    </View>
                </TouchableOpacity>
            </View>
            <Button
                title={Langs.t('buy')}
                titleStyle={styles.btnTxt}
                style={[styles.buyBtn, styles.updatedBuyBtn]}
                subChild={(loadings.includes('completeOrder') || loadings.includes('setPaymentMethod')) &&
                    <View style={styles.inBtnActivityIndicator}>
                        <ActivityIndicator size='small' color={primaryColors.white} />
                    </View>}
                onPress={() => {
                    setPaymentMethodHandler()
                }}
            />
        </View>
    );
}
