import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import { like, categories } from '../../images/index';
import ImageButton from '../../components/ImageButton/index';
import { primaryColors } from '../../theme/colors';
import { deviceWidth } from '../../lib/utility';
import ShoppingCard from '../../components/ShoppingCard/index';
import { useSelector, useDispatch } from 'react-redux';
import { getLatest, getBanners, getBannerDetails } from '../../redux/actions/home';
import { addToCart } from '../../redux/actions/cart';
import { getCategoryItems } from '../../redux/actions/categories';
import { addToWishlist } from '../../redux/actions/wishlist';
import { fonts } from '../../theme/fonts';
import Langs from '../../lib/Langs';
import Modal from 'react-native-modal';

export default function Home(props) {

    const token = useSelector(state => state.auth.token);
    const latest = useSelector(state => state.home.latest);
    const banners = useSelector(state => state.home.banners);
    const categoryItems = useSelector(state => state.categories.categoryItems);
    const loadings = useSelector(state => state.ui.isLoading);
    const userData = useSelector(state => state.auth.userData);
    const lang = useSelector(state => state.settings.lang);

    const [productId, setProductId] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const [wishProductId, setWishProductId] = useState(null);
    const [fetchData, setFetchData] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch();

    const productsHandler = useCallback(() => {
        dispatch(getBanners(token, lang));
        dispatch(getBannerDetails(token, lang));
        dispatch(getLatest(token, lang));
        dispatch(getCategoryItems(token, 1, lang));
    }, [dispatch, token, lang]);

    const addToCartHandler = useCallback(() => {
        dispatch(addToCart(token, productId, quantity, lang));
        setProductId(null);
        setQuantity(null);
    }, [dispatch, token, productId, quantity, lang]);

    const addToWishlistHandler = useCallback(() => {
        dispatch(addToWishlist(token, wishProductId, lang));
        setWishProductId(null);
    }, [dispatch, token, wishProductId, lang]);

    useEffect(() => {
        if (productId != null && quantity != null) {
            addToCartHandler();
        }
    }, [productId, quantity]);

    useEffect(() => {
        if (wishProductId != null) {
            addToWishlistHandler();
        }
    }, [wishProductId]);

    useEffect(() => {
        productsHandler();
    }, []);

    useEffect(() => {
        if (categoryItems != null && latest != null) {
            setFetchData(false);
        }
    }, [categoryItems, latest]);

    useEffect(() => {
        setIsModalVisible(true);
    }, []);


    return (
        <View style={styles.container}>
            <Header
                title={Langs.t("logo")}
                headerRight={
                    <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Categories') }}>
                        <Image source={categories} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                }
                leftStyle={styles.button}
                style={styles.header}
            />
            {
                (loadings.includes('getLatest') || loadings.includes('getBanners') || fetchData) ?
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color={primaryColors.gray} />
                    </View>
                    :
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {
                            banners.map((item, index) => (
                                <ImageButton
                                    image={{ uri: item.image }}
                                    imageWraper={{ width: '100%', height: '100%' }}
                                    imageStyle={styles.imageContent}
                                    // title={item.title}
                                    titleStyle={styles.imgTitle}
                                    style={{ width: deviceWidth() * 0.905, marginTop: 11 }}
                                    onPress={() => props.navigation.navigate('Products', {
                                        title: Langs.t('categories'),
                                        category_id: item.extra_id
                                    })}
                                />
                            ))
                        }

                        <View style={styles.headerLine}>
                            <Text children={Langs.t('newest')} size={18} color={primaryColors.shark} fontFamily={fonts.bold} />
                            <TouchableOpacity style={styles.moreBtn} onPress={() => props.navigation.navigate('Products', {
                                parent: 'bestsellers',
                                title: Langs.t('newest')
                            })}>
                                <Text children={Langs.t('more')} size={13} color={primaryColors.silverChalice} fontFamily={fonts.regular} textDecorationLine='underline' />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={latest}
                            horizontal={true}
                            contentContainerStyle={styles.slider}
                            style={{ paddingLeft: deviceWidth() * 0.0475, paddingBottom: 15 }}
                            renderItem={({ item }) => {
                                return <ShoppingCard
                                    image={{ uri: decodeURI(item.thumb) }}
                                    // firstIcon={cartAdd}
                                    secondIcon={like}
                                    price={item.price_excluding_tax_formated}
                                    title={item.name}
                                    containerStyle={{ marginRight: 11 }}
                                    buttonStyle={{ backgroundColor: primaryColors.approxGallery, borderRadius: 10 }}
                                    addStyle={{ backgroundColor: 'transparent' }}
                                    // onAdd={() => { setProductId(item.product_id); setQuantity(1); }}
                                    onAddToWishlist={() => { setWishProductId(item.product_id); }}
                                    onPress={() => {
                                        props.navigation.navigate('ProductDetails', {
                                            productID: item.product_id
                                        })
                                    }}
                                />
                            }}
                        />

                    </ScrollView>
            }
            <Modal isVisible={isModalVisible}
                style={[styles.modalStyle, styles.shadow]}
                onBackdropPress={() => setIsModalVisible(false)}
                animationIn='zoomIn'
                animationOut='zoomOut'
                backdropOpacity={0.5}
                backdropColor='white'
            >
                <View style={styles.modalView}>
                    <Text children='أهلاً بكــ' fontFamily={fonts.bold} fontSize={18}
                        align='center' lineHeight={25}
                        color={primaryColors.approxScorpion} />
                    <Text children='سجلي معنا ليصلك جديدنا وعروضنا ولتنضمي لقائمتنا البريدية وتصلك مجلة غِيد الخاصة بأبرز أسرار المظهر الناجح بالعباية'
                        fontFamily={fonts.regular} fontSize={16}
                        align='center' mTop={16} lineHeight={25}
                        color={primaryColors.approxScorpion}
                        mRight={25} mLeft={25}
                    />
                    <Input
                        containerStyle={styles.input}
                        placeholder={Langs.t('email')}
                    />
                    <Button
                        style={styles.modalBtn}
                        title={Langs.t('register')}
                        onPress={() => setIsModalVisible(false)}
                    />
                </View>
            </Modal>
        </View >
    )
}
