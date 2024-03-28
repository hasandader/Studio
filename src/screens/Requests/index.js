import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Button from '../../components/Button/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import { deviceWidth, deviceHeight } from '../../lib/utility';
import { test10, backBtn } from '../../images/index';
import RequestCard from '../../components/RequestCard/index';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../redux/actions/order';
import { categories } from '../../images/index';
import { fonts } from '../../theme/fonts';
import Langs from '../../lib/Langs';
import moment from '../../lib/Moment';

export default function Requests(props) {

    const data = [test10, test10, test10, test10]

    const token = useSelector(state => state.auth.token);
    const loadings = useSelector(state => state.ui.isLoading);
    const orders = useSelector(state => state.orders.orders);
    const lang = useSelector(state => state.settings.lang);

    const [ordersList, setOrdersList] = useState([]);

    console.log('orders: ', orders)

    const dispatch = useDispatch();

    const ordersHandler = useCallback(() => {
        dispatch(getOrders(token, lang));
    }, [dispatch, token, lang]);

    useEffect(() => {
        if (orders) {
            setOrdersList(orders);
        }
    }, [orders]);

    useEffect(() => {
        ordersHandler();
    }, []);

    const data1 = [{}, {}, {},];

    return (
        <View style={styles.container}>
            <Header
                title={Langs.t('orders')}
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
                orders.length > 0 ?
                    <FlatList
                        data={orders}
                        contentContainerStyle={styles.ordersList}
                        style={styles.listContainer}
                        ListHeaderComponent={() => (
                            loadings.includes('getCart') ?
                                <View style={styles.activityIndicator}>
                                    <ActivityIndicator size="large" color={primaryColors.gray} />
                                </View>
                                :
                                <Text children={Langs.t('ordersList')}
                                    fontFamily={fonts.bold} fontSize={18} mTop={18} mBottom={15} style={styles.title} />
                        )}
                        renderItem={({ item }) => (
                            <RequestCard
                                orderNO={item.order_id}
                                orderDate={moment(item.date_added).format("YYYY-MM-DD")}
                                price={item.total}
                                requestStatus={item.status}
                                title={'عباية أسود'}
                                onDetails={() => {
                                    props.navigation.navigate('RequestDetails', {
                                        orderID: item.order_id
                                    })
                                }}
                            />
                        )}
                    />
                    :
                    <Text children={Langs.t('noOrders')}
                        fontFamily={fonts.regular} fontSize={18} color={primaryColors.approxGray}
                        align='center' mTop={'80%'}
                    />
            }



        </View>
    )
}