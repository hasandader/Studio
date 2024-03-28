import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Button from '../../components/Button/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import { deviceWidth, deviceHeight } from '../../lib/utility';
import { test10, question } from '../../images/index';
import CartItem from './components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, changeQuantity, deleteItem } from '../../redux/actions/cart';
import { categories } from '../../images/index';
import { fonts } from '../../theme/fonts';
import Langs from '../../lib/Langs';
import Modal from 'react-native-modal';

export default function Cart(props) {

    const data = [test10, test10, test10, test10]

    const token = useSelector(state => state.auth.token);
    const cart = useSelector(state => state.cart.cart);
    const loadings = useSelector(state => state.ui.isLoading);
    const lang = useSelector(state => state.settings.lang);

    const [key, setKey] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [deleteKey, setDeleteKey] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();

    const cartHandler = useCallback(() => {
        dispatch(getCart(token, lang));
    }, [dispatch, token, lang]);

    const changeQuantityHandler = useCallback(() => {
        console.log('key, quantity::: ', key, quantity)
        dispatch(changeQuantity(token, key, quantity, lang));
        setKey(null);
        setQuantity(null);
    }, [dispatch, token, key, quantity, lang]);

    const deleteItemHandler = useCallback(() => {
        dispatch(deleteItem(token, deleteKey.key, lang));
    }, [dispatch, token, deleteKey, lang]);

    useEffect(() => {
        if (key != null && quantity != null) {
            changeQuantityHandler();
        }
    }, [key, quantity]);

    useEffect(() => {
        console.log('deleteKey: ', deleteKey)
        if (deleteKey != null && deleteKey.delete) {
            deleteItemHandler();
        }
    }, [deleteKey]);

    useEffect(() => {
        cartHandler();
        console.log('getting cart!')
    }, []);

    const data1 = [{}, {}, {},];

    return (
        <View style={styles.container}>
            <Header
                title={Langs.t('cart')}
                headerRight={
                    <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Categories') }}>
                        <Image source={categories} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                }
                leftStyle={styles.button}
                style={styles.header}
            />
            <FlatList
                data={cart.products}
                contentContainerStyle={{ backgroundColor: primaryColors.white }}
                style={styles.listContainer}
                ListHeaderComponent={() => (
                    loadings.includes('getCart') ?
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator size="large" color={primaryColors.gray} color={primaryColors.gray} />
                        </View>
                        :
                        <Text children={Langs.t('shoppingCart')}
                            fontFamily={fonts.bold} fontSize={18} mTop={18}
                            mBottom={15} style={styles.title} />
                )}
                ListFooterComponent={() => (
                    <View style={styles.summaryRow}>
                        <Button
                            title={Langs.t('buy')}
                            titleStyle={styles.btnTxt}
                            style={[styles.buyBtn, !cart.products && { opacity: 0.5 }]}
                            onPress={() => {
                                props.navigation.navigate('Buy')
                            }}
                            disabled={!cart.products}
                        />
                        <View style={styles.txtRow}>
                            <Text children={`  ${cart.total_raw || 0} ر.س`} fontFamily={fonts.regular} fontSize={18} lineHeight={25} color={primaryColors.santaFe} />
                            <Text children={`${Langs.t('totalPrice')}: `} fontFamily={fonts.regular} fontSize={18} lineHeight={25} />
                        </View>
                    </View>
                )}
                renderItem={({ item }) => (
                    <CartItem
                        itemImage={{ uri: decodeURI(item.thumb) }}
                        // resizeMode='contain'
                        price={item.price}
                        // oldPrice={'35.00 ر.س'}
                        title={item.name}
                        brand={item.model}
                        total={item.quantity}
                        onIncrease={() => { setKey(item.key); setQuantity(parseInt(item.quantity) + 1); }}
                        ondecrease={() => { setKey(item.key); setQuantity(parseInt(item.quantity) - 1); }}
                        onDelete={() => { setIsModalVisible(true); setDeleteKey({ key: item.key, delete: false }) }}
                        onPress={() => props.navigation.navigate('ProductDetails', {
                            productID: item.product_id
                        })}
                    />
                )}
            />

            <Modal isVisible={isModalVisible}
                style={styles.modalStyle}
                onBackdropPress={() => setIsModalVisible(false)}
                backdropOpacity={0.3}
                animationIn='zoomIn'
                animationOut='zoomOut'
            >
                <View style={styles.modalContainer}>
                    <Image source={question} style={{ width: 35, height: 35 }} />
                    <Text children='هل تريد حقاً حذف المنتج من السلة؟' fontFamily={fonts.regular}
                        fontSize={18} mTop={14} mBottom={22} color={primaryColors.tundora}
                        lineHeight={30}
                    />
                    <View style={styles.modalDivider} />
                    <View style={styles.btnsWraper}>
                        <Button
                            title='لا'
                            style={styles.selectionBtn}
                            titleStyle={styles.selectionBtnTitle}
                            onPress={() => setIsModalVisible(false)}
                        />
                        <View style={styles.virticalDivider} />
                        <Button
                            title='نعم'
                            style={styles.selectionBtn}
                            titleStyle={[styles.selectionBtnTitle, { color: primaryColors.santaFe }]}
                            onPress={() => { setDeleteKey({ ...deleteKey, delete: true }); setIsModalVisible(false) }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}