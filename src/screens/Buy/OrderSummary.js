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
import { completeOrder } from '../../redux/actions/payment';


export default function OrderSummary(props) {

    const token = useSelector(state => state.auth.token);
    const loadings = useSelector(state => state.ui.isLoading);
    const orderSummary = useSelector(state => state.payment.orderSummary);
    const orderConfirmed = useSelector(state => state.payment.orderConfirmed);
    const lang = useSelector(state => state.settings.lang);

    const [totalsLength, setTotalsLength] = useState(0);

    const dispatch = useDispatch();

    const completeOrderHandler = useCallback(() => {
        dispatch(completeOrder(token, orderSummary.orderID, lang));
    }, [dispatch, token, orderSummary, lang]);

    useEffect(() => {
        if (orderConfirmed) {
            props.navigation.navigate('OrderDone');
        }
    }, [orderConfirmed]);

    useEffect(() => {
        if (orderSummary) {
            if (orderSummary.totals) {
                setTotalsLength(orderSummary.totals.length);
                console.log('orderSummary: ', orderSummary);
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

            {
                loadings.includes('confirmOrder') ?
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color={primaryColors.gray} />
                    </View>
                    :
                    <>
                        <Text children={orderSummary.payment_code == 'tap' ? Langs.t('payByCreditCart') : Langs.t('paymentUponReceipt')}
                            lineHeight={25}
                            fontFamily={fonts.bold} fontSize={18} mTop={18} mBottom={15} style={styles.title} />


                        <View style={{ marginTop: 20 }}>
                            <View style={styles.row}>
                                <Text children={`${orderSummary.totals && orderSummary.totals[0].text || '0 ر.س'} `} fontFamily={fonts.regular} fontSize={17} color={primaryColors.tundora} />
                                <Text children={Langs.t('price')} fontFamily={fonts.regular} fontSize={17} color={primaryColors.approxGray} />
                            </View>
                            <>
                                <View style={styles.divider} />
                                <View style={[styles.row, { marginTop: 10, marginBottom: 18 }]}>
                                    <Text children={`${orderSummary.totals[1].text || '0 ر.س'} `} fontFamily={fonts.regular} fontSize={17} color={primaryColors.tundora} />
                                    <Text children={Langs.t('paymentTaxUponReceipt')} fontFamily={fonts.regular} fontSize={17} color={primaryColors.approxGray} />
                                </View>
                            </>
                            <View style={styles.divider} />
                            <View style={[styles.row, { marginTop: 10, marginBottom: 18 }]}>
                                <Text children={`${orderSummary.totals && orderSummary.payment_code == 'cod' ? orderSummary.totals[2].text : orderSummary.totals[1].text || '0 ر.س'} `} fontFamily={fonts.regular} fontSize={17} color={primaryColors.tundora} />
                                <Text children={Langs.t('shipping')} fontFamily={fonts.regular} fontSize={17} color={primaryColors.approxGray} />
                            </View>
                            <View style={styles.divider} />
                            <View style={[styles.row, { marginTop: 10 }]}>
                                <Text children={`${orderSummary.totals && orderSummary.totals[orderSummary.totals.length - 1].text || '0 ر.س'} `} fontFamily={fonts.regular} fontSize={17} color={primaryColors.tundora} />
                                <Text children={Langs.t('total')} fontFamily={fonts.regular} fontSize={17} color={primaryColors.tundora} />
                            </View>
                        </View>

                        <Button
                            title={`${Langs.t('pay')} ${orderSummary.totals[orderSummary.totals.length - 1].text}`}
                            titleStyle={styles.btnTxt}
                            style={[styles.buyBtn, styles.updatedBuyBtn]}
                            subChild={loadings.includes('completeOrder') &&
                                <View style={styles.inBtnActivityIndicator}>
                                    <ActivityIndicator size='small' color={primaryColors.white} />
                                </View>}
                            onPress={() => {
                                if (orderSummary.payment_code == 'tap') {
                                    props.navigation.navigate('CreditCardPayment', {
                                        url: orderSummary.payment
                                    });
                                }
                                else {
                                    // props.navigation.navigate('OrderDone');
                                    completeOrderHandler();
                                }
                            }}
                        />
                    </>
            }
        </View>
    );
}
