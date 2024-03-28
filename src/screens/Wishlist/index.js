import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { useSelector, useDispatch } from 'react-redux';
import { getWishlist } from '../../redux/actions/wishlist';
import ShoppingCard from '../../components/ShoppingCard/index';
import { cartAdd, liked, categories } from '../../images/index';
import { addToCart } from '../../redux/actions/cart';
import { removeFromWishlist } from '../../redux/actions/wishlist';
import { primaryColors } from '../../theme/colors';
import Langs from '../../lib/Langs';
import { fonts } from '../../theme/fonts';

export default function Wishlist(props) {

    const token = useSelector(state => state.auth.token);
    const wishlist = useSelector(state => state.wishlist.wishlist);
    const loadings = useSelector(state => state.ui.isLoading);
    const lang = useSelector(state => state.settings.lang);

    const [productId, setProductId] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const [removeID, setRemoveID] = useState(null);

    const dispatch = useDispatch();

    const wishlistHandler = useCallback(() => {
        dispatch(getWishlist(token, lang));
    }, [dispatch, token, lang]);

    const addToCartHandler = useCallback(() => {
        dispatch(addToCart(token, productId, quantity));
        setProductId(null);
        setQuantity(null);
    }, [dispatch, token, productId, quantity]);

    const removeItemHandler = useCallback(() => {
        dispatch(removeFromWishlist(token, removeID, lang));
    }, [dispatch, token, removeID, lang]);

    useEffect(() => {
        wishlistHandler();
    }, []);

    useEffect(() => {
        if (productId != null && quantity != null) {
            addToCartHandler();
        }
    }, [productId, quantity]);

    useEffect(() => {
        if (removeID != null) {
            removeItemHandler();
        }
    }, [removeID]);

    return (
        <View style={styles.container}>
            <Header
                title={Langs.t('favorites')}
                headerRight={
                    <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Categories') }}>
                        <Image source={categories} style={{ width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                }
                leftStyle={styles.button}
                style={styles.header}
            />
            <FlatList
                data={wishlist}
                numColumns={2}
                style={{ marginTop: 1 }}
                contentContainerStyle={styles.wishlist}
                columnWrapperStyle={{ marginBottom: 15 }}
                ListHeaderComponent={() => (
                    loadings.includes('getWishlist') ?
                        <View style={styles.activityIndicator}>
                            <ActivityIndicator size="large" color={primaryColors.gray} />
                        </View>
                        :
                        <Text children={Langs.t('favorites')}
                            fontFamily={fonts.bold} fontSize={18} mTop={18} align='left'
                            mBottom={15} />
                )}
                renderItem={({ item }) => (
                    <ShoppingCard
                        image={{ uri: decodeURI(item.thumb) }}
                        // firstIcon={cartAdd}
                        secondIcon={liked}
                        likeStyle={{ width: 15, height: 13 }}
                        price={item.price}
                        title={item.name}
                        containerStyle={styles.containerStyle}
                        addStyle={{ backgroundColor: 'transparent' }}
                        buttonStyle={{ backgroundColor: primaryColors.approxGallery }}
                        // onAdd={() => { setProductId(item.product_id); setQuantity(1); }}
                        onAddToWishlist={() => { setRemoveID(item.product_id); }}
                        onPress={() => {
                            props.navigation.navigate('ProductDetails', {
                                productID: item.product_id
                            })
                        }}
                    />
                )}
            />
        </View>
    )
}