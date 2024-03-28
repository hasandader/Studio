import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Button from '../../components/Button/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import { deviceWidth, deviceHeight } from '../../lib/utility';
import { test10, backBtn, radioBtn, radioActive, question } from '../../images/index';
import CartItem from '../Cart/components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, changeQuantity, deleteItem } from '../../redux/actions/cart';
import { setShippingAddDone, getShippingAddress, getPaymentAddress, setShippingAddress, setPaymentAddress } from '../../redux/actions/payment';
import { categories } from '../../images/index';
import { fonts } from '../../theme/fonts';
import Langs from '../../lib/Langs';
import { CheckBox } from 'react-native-elements'
import Modal from 'react-native-modal';

export default function Buy(props) {

    const data = [test10, test10, test10, test10]

    const products = props.navigation.state.params && props.navigation.state.params.products;

    const token = useSelector(state => state.auth.token);
    const cart = useSelector(state => state.cart.cart);
    const loadings = useSelector(state => state.ui.isLoading);
    const shippingAddress = useSelector(state => state.payment.shippingAddress);
    const shippingAddressDone = useSelector(state => state.payment.shippingAddressDone);
    const lang = useSelector(state => state.settings.lang);

    const [key, setKey] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [deleteKey, setDeleteKey] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedAddID, setSelectedAddID] = useState(null);

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

    const paymentHandler = useCallback(() => {
        dispatch(getPaymentAddress(token, lang));
        dispatch(getShippingAddress(token, lang));
    }, [dispatch, lang]);

    const setAddressHandler = useCallback(() => {
        dispatch(setShippingAddress(token, selectedAddress, lang));
        dispatch(setPaymentAddress(token, selectedAddress, lang));
        // props.navigation.navigate('PaymentMethods');
    }, [dispatch, selectedAddress, lang]);

    const changeStatus = useCallback(() => {
        dispatch(setShippingAddDone(false));
    }, [dispatch]);

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
        paymentHandler();
    }, []);

    useEffect(() => {
        if (shippingAddress) {
            console.log("shippingAddress: ", shippingAddress);
        }
    }, [shippingAddress]);

    useEffect(() => {
        if (shippingAddressDone) {
            props.navigation.navigate('PaymentMethods');
            changeStatus();
        }
    }, [shippingAddressDone]);

    const data1 = [{}, {}, {},];

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
            <FlatList
                data={cart.products}
                contentContainerStyle={{ backgroundColor: primaryColors.white }}
                style={styles.listContainer}
                ListHeaderComponent={() => (
                    loadings.includes('getCart') ?
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator size="large" color={primaryColors.gray} />
                        </View>
                        :
                        <Text children={Langs.t('shoppingCart')}
                            fontFamily={fonts.bold} fontSize={18} mTop={18} mBottom={15} style={styles.title} />
                )}
                ListFooterComponent={() => (
                    <View style={styles.footer}>
                        <Text children={`${Langs.t('address')}:`}
                            fontFamily={fonts.regular} fontSize={16} color={primaryColors.doveGray}
                            mBottom={12} style={styles.title}
                        />

                        <View style={styles.radiosWraper}>
                            {
                                shippingAddress != null && shippingAddress.addresses && shippingAddress.addresses.map((item, index) => (
                                    <CheckBox
                                        center
                                        title={item.address_1}
                                        checkedIcon={<Image source={radioBtn} style={{ width: 16, height: 16 }} />}
                                        uncheckedIcon={<Image source={radioActive} style={{ width: 16, height: 16 }} />}
                                        onPress={() => { setSelectedAddress(item); setSelectedAddID(item.address_id) }}
                                        checked={item.address_id !== selectedAddID}
                                        containerStyle={styles.radioBtn}
                                        textStyle={styles.radioTxt}
                                    />
                                ))
                            }

                            <CheckBox
                                center
                                title='إضافة عنوان جديد'
                                checkedIcon={<Image source={radioBtn} style={{ width: 16, height: 16 }} />}
                                uncheckedIcon={<Image source={radioActive} style={{ width: 16, height: 16 }} />}
                                onPress={() => {
                                    setSelectedAddID('newAddress');
                                    props.navigation.navigate('AddressMap');
                                }}
                                checked={'newAddress' !== selectedAddID}
                                containerStyle={styles.radioBtn}
                                textStyle={styles.radioTxt}
                            />
                        </View>

                        <Button
                            title={Langs.t('buy')}
                            titleStyle={styles.btnTxt}
                            style={[styles.buyBtn, (!selectedAddress || !cart.products) && { opacity: 0.5 }]}
                            disabled={!selectedAddress || !cart.products}
                            subChild={loadings.includes('setShippingAddress') &&
                                <View style={styles.inBtnActivityIndicator}>
                                    <ActivityIndicator size='small' color={primaryColors.white} />
                                </View>}
                            onPress={() => {
                                setAddressHandler()
                            }}
                        />
                    </View>
                )}
                renderItem={({ item }) => (
                    <CartItem
                        itemImage={{ uri: decodeURI(item.thumb) }}
                        price={item.price}
                        oldPrice={'35.00 ر.س'}
                        title={item.name}
                        brand={item.model}
                        total={item.quantity}
                        onIncrease={() => { setKey(item.key); setQuantity(parseInt(item.quantity) + 1); }}
                        ondecrease={() => { setKey(item.key); setQuantity(parseInt(item.quantity) - 1); }}
                        onDelete={() => { setDeleteKey({ key: item.key, delete: false }); setIsModalVisible(true); }}
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