import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Button from '../../components/Button/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import { deviceWidth, deviceHeight, isArabic } from '../../lib/utility';
import { test10, backBtn } from '../../images/index';
import { useSelector, useDispatch } from 'react-redux';
import { categories } from '../../images/index';
import { fonts } from '../../theme/fonts';
import Langs from '../../lib/Langs';
import { getOrderDetails, getStatuses } from '../../redux/actions/order';
import moment from '../../lib/Moment';

export default function RequestDetails(props) {

    const data = [test10, test10, test10, test10]

    const token = useSelector(state => state.auth.token);
    const loadings = useSelector(state => state.ui.isLoading);
    const orderDetails = useSelector(state => state.orders.orderDetails);
    const lang = useSelector(state => state.settings.lang);
    const statuses = useSelector(state => state.orders.statuses);

    const [total, setTotal] = useState('');
    const [shipping, setShippig] = useState('');
    const [commission, setCommission] = useState('');
    const [totalIncTax, setTotalIncTax] = useState('');
    const [statusList, setStatusList] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const dispatch = useDispatch();

    const ordersHandler = useCallback(() => {
        const orderID = props.navigation.state.params && props.navigation.state.params.orderID;
        dispatch(getOrderDetails(token, orderID, lang));
        dispatch(getStatuses(token, lang));
    }, [dispatch, token, lang]);

    useEffect(() => {
        if (statuses) {
            let sorted = statuses.sort(function (a, b) { return a.order_status_id - b.order_status_id })
            setStatusList(sorted);
            let index = sorted.find((item) => item.order_status_id == orderDetails.order_status_id);
            setActiveIndex(index);
        }
    }, [statuses]);

    useEffect(() => {
        ordersHandler();
    }, []);

    const data1 = [{}, {}, {},];

    console.log('statuses: ', statuses)

    useEffect(() => {
        if (orderDetails) {
            let total = null;
            let shipping = null;
            let commission = null;
            let totalIncTax = null;
            total = orderDetails.totals.find((item) => item.title == 'Sub-Total');
            shipping = orderDetails.totals.find((item) => item.title == 'Flat Shipping Rate');
            commission = orderDetails.totals.find((item) => item.title == 'COD Fee');
            totalIncTax = orderDetails.totals.find((item) => item.title == 'Total');

            orderDetails.totals.find((item) => console.log('item: ', item));

            setTotal(total);
            setShippig(shipping);
            setCommission(commission);
            setTotalIncTax(totalIncTax);

            console.log('values: ', total, shipping, commission, totalIncTax)
        }
    }, [orderDetails]);

    return (
        <View style={styles.container1}>
            <Header
                title={Langs.t('orderDetails')}
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
            <ScrollView contentContainerStyle={{ paddingBottom: deviceHeight() * 0.13 }}>
                <Text children={Langs.t('orderDetails')}
                    fontFamily={fonts.bold} fontSize={18} mTop={18} mBottom={15}
                    style={styles.title} />
                {
                    loadings.includes('getOrderDetails') ?
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator size="large" color={primaryColors.gray} />
                        </View>
                        :
                        <>
                            <View style={styles.dataRow}>
                                <View style={styles.column}>
                                    <Text children={Langs.t('orderDate')} fontFamily={fonts.regular} fontSize={15}
                                        color={primaryColors.approxScorpion} lineHeight={30}
                                    />
                                    <Text children={orderDetails && moment(orderDetails.date_added).format("YYYY-MM-DD")} fontFamily={fonts.regular} fontSize={13} color={primaryColors.gray3} />
                                </View>
                                <View style={styles.column}>
                                    <Text children={Langs.t('orderNumber')} fontFamily={fonts.regular} fontSize={15}
                                        color={primaryColors.approxScorpion} lineHeight={30}
                                    />
                                    <Text children={orderDetails && orderDetails.order_id} fontFamily={fonts.regular} fontSize={13} color={primaryColors.gray3} />
                                </View>
                            </View>
                            <View style={styles.statusLine}>
                                <View style={[styles.circle, activeIndex.order_status_id >= 4 && styles.active]} />
                                <View style={[styles.line, activeIndex.order_status_id >= 4 && styles.active]} />
                                <View style={[styles.circle, activeIndex.order_status_id >= 3 && styles.active]} />
                                <View style={[styles.line, activeIndex.order_status_id >= 3 && styles.active]} />
                                <View style={[styles.circle, activeIndex.order_status_id >= 2 && styles.active]} />
                                <View style={[styles.line, activeIndex.order_status_id >= 2 && styles.active]} />
                                <View style={[styles.circle, activeIndex.order_status_id >= 1 && styles.active]} />
                                <View style={[styles.line, activeIndex.order_status_id >= 1 && styles.active]} />
                                <View style={[styles.circle, styles.active]} />
                            </View>
                            <View style={styles.statusRow}>
                                <Text children={statusList && statusList[4].name} fontFamily={fonts.regular} fontSize={11} color={primaryColors.tundora} />
                                <Text children={statusList && statusList[3].name} fontFamily={fonts.regular} fontSize={11} color={primaryColors.tundora} />
                                <Text children={statusList && statusList[2].name} fontFamily={fonts.regular} fontSize={11} color={primaryColors.tundora} />
                                <Text children={statusList && statusList[1].name} fontFamily={fonts.regular} fontSize={11} color={primaryColors.tundora} />
                                <Text children={statusList && statusList[0].name} fontFamily={fonts.regular} fontSize={11} color={primaryColors.tundora} />
                            </View>
                            <FlatList
                                horizontal={true}
                                data={orderDetails && orderDetails.products}
                                style={{ marginTop: 27 }}
                                contentContainerStyle={{ paddingRight: 17 }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.description} onPress={() => {
                                        props.navigation.navigate('ProductDetails', {
                                            productID: item.product_id
                                        })
                                    }}>
                                        <View>
                                            <Text children={item.name} align={isArabic() ? 'right' : 'left'} fontFamily={fonts.regular}
                                                fontSize={16} color={primaryColors.tundora} />
                                            <Text children={item.model} align={isArabic() ? 'right' : 'left'} fontFamily={fonts.regular}
                                                fontSize={16} color={primaryColors.approxGray} />
                                            <Text children={item.price} align={isArabic() ? 'right' : 'left'} fontFamily={fonts.regular}
                                                fontSize={16} color={primaryColors.santaFe} />
                                        </View>
                                        <Image source={{ uri: decodeURI(item.image) }} style={{ width: 102, height: 120, borderRadius: 5, marginRight: 8 }} />
                                    </TouchableOpacity>
                                )}
                            />
                            <View style={styles.billWraper}>
                                <Text children={Langs.t('deliveryTime')} fontFamily={fonts.regular}
                                    fontSize={16} color={primaryColors.approxScorpion} mTop={12} style={styles.title} />
                                <Text children='في خلال 72 ساعة' fontFamily={fonts.regular}
                                    fontSize={14} color={primaryColors.gray3} mTop={5} style={styles.title} />
                                <Text children={Langs.t('address')} fontFamily={fonts.regular}
                                    fontSize={16} color={primaryColors.approxScorpion} mTop={12} style={styles.title} />
                                <Text children={orderDetails && orderDetails.shipping_address_1} fontFamily={fonts.regular}
                                    fontSize={14} color={primaryColors.gray3} mTop={5} style={styles.title} />
                                <Text children={Langs.t('paymentMethod')} fontFamily={fonts.regular}
                                    fontSize={16} color={primaryColors.approxScorpion} mTop={12} lineHeight={25} style={styles.title} />
                                <Text children={orderDetails && orderDetails.payment_method} fontFamily={fonts.regular}
                                    fontSize={14} color={primaryColors.gray3} mTop={5} style={styles.title} />

                                <View style={styles.billRow}>
                                    <Text children={total && total.value} fontFamily={fonts.regular}
                                        fontSize={16} color={primaryColors.approxScorpion} style={styles.title2} />
                                    <Text children={Langs.t('total')} fontFamily={fonts.regular}
                                        fontSize={16} color={primaryColors.approxScorpion} style={styles.title} />
                                </View>
                                <View style={styles.billRow}>
                                    <Text children={shipping && shipping.value} fontFamily={fonts.regular}
                                        fontSize={16} color={primaryColors.approxScorpion} style={styles.title2} />
                                    <Text children={Langs.t('shipping')} fontFamily={fonts.regular}
                                        fontSize={16} color={primaryColors.approxScorpion} style={styles.title} />
                                </View>
                                <View style={styles.billRow}>
                                    <Text children={commission && commission.value} fontFamily={fonts.regular}
                                        fontSize={16} color={primaryColors.approxScorpion} style={styles.title2} />
                                    <Text children={Langs.t('commission')} fontFamily={fonts.regular}
                                        fontSize={16} color={primaryColors.approxScorpion} style={styles.title} />
                                </View>
                                <View style={[styles.divider, { marginBottom: 19, marginTop: 13 }]} />
                                <View style={styles.billRow}>
                                    <Text children={totalIncTax && totalIncTax.value} fontFamily={fonts.regular}
                                        fontSize={16} color={primaryColors.approxScorpion} style={styles.title2} />
                                    <Text children={Langs.t('totalIncludingTax')} fontFamily={fonts.regular}
                                        fontSize={16} color={primaryColors.approxScorpion} style={styles.title} />
                                </View>
                            </View>
                        </>
                }
            </ScrollView>
        </View>
    )
}