import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { test9, test10, test11, cartAdd, like, categories, backBtn } from '../../images/index';
import { deviceHeight, deviceWidth } from '../../lib/utility';
import { fonts } from '../../theme/fonts';
import { primaryColors } from '../../theme/colors';
import ShoppingCard from '../../components/ShoppingCard/index';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryProducts } from '../../redux/actions/categories';
import { addToCart } from '../../redux/actions/cart';
import { addToWishlist } from '../../redux/actions/wishlist';
import { getAllLatest } from '../../redux/actions/home';

export default function Products(props) {

    const title = props.navigation.state.params && props.navigation.state.params.title;

    const token = useSelector(state => state.auth.token);
    const categoryProducts = useSelector(state => state.categories.categoryProducts);
    const allLatest = useSelector(state => state.home.allLatest);
    const loadings = useSelector(state => state.ui.isLoading);
    const lang = useSelector(state => state.settings.lang);

    const data = [test9, test10, test11, test9, test10, test11, test9, test10, test11, test9, test10, test11];

    const [products, setProducts] = useState([{ image: test9 }, { image: test10 }, { image: test11 }, { image: test9 }, { image: test10 }, { image: test11 }, { image: test9 }, { image: test10 }, { image: test11 }, { image: test9 }, { image: test10 }, { image: test11 }]);
    const [productId, setProductId] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const [wishProductId, setWishProductId] = useState(null);
    const [fetchData, setFetchData] = useState(true);

    const dispatch = useDispatch();

    const bestsellersHandler = useCallback(() => {
        dispatch(getAllLatest(token, lang));
    }, [dispatch, token, lang]);

    const categoryProductsHandler = useCallback(() => {
        const category_id = props.navigation.state.params && props.navigation.state.params.category_id;
        dispatch(getCategoryProducts(token, category_id, lang));
    }, [dispatch, token, lang]);

    const addToCartHandler = useCallback(() => {
        dispatch(addToCart(token, productId, quantity));
        setProductId(null);
        setQuantity(null);
    }, [dispatch, token, productId, quantity]);

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
        const parent = props.navigation.state.params && props.navigation.state.params.parent;
        if (parent == 'bestsellers') {
            bestsellersHandler();
        } else {
            categoryProductsHandler();
        }
    }, []);

    useEffect(() => {
        const parent = props.navigation.state.params && props.navigation.state.params.parent;
        if (allLatest && parent == 'bestsellers') {
            setProducts(allLatest);
            setFetchData(false);
            console.log('all')
        } else if (categoryProducts) {
            setProducts(categoryProducts);
            console.log('category: ', categoryProducts)
            setFetchData(false);
        }

        console.log('allLatest: ', allLatest)
    }, [categoryProducts, allLatest])

    return (
        <View style={styles.container}>
            <Header
                title={title || 'العبايات'}
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
                (loadings.includes('getAllLatest') || loadings.includes('getCategoryProducts')) ?
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color={primaryColors.gray} />
                    </View>
                    :
                    <FlatList
                        data={products}
                        numColumns={2}
                        style={{ marginTop: 1 }}
                        contentContainerStyle={styles.productsList}
                        columnWrapperStyle={{ marginBottom: 15 }}
                        ListHeaderComponent={() => {

                            return <Text children={title || 'العبايات'}
                                fontFamily={fonts.bold} fontSize={18} mTop={18} align='left'
                                mLeft={17} mBottom={15} />
                        }}
                        renderItem={({ item }) => (
                            <ShoppingCard
                                image={{ uri: item.image ? decodeURI(item.image) : decodeURI(item.thumb) }}
                                // firstIcon={cartAdd}
                                secondIcon={like}
                                price={item.price_excluding_tax_formated}
                                title={item.name}
                                containerStyle={{ marginRight: 8, marginLeft: 8 }}
                                addStyle={{ backgroundColor: 'transparent' }}
                                buttonStyle={{ backgroundColor: primaryColors.approxGallery, borderRadius: 10 }}
                                // onAdd={() => { setProductId(item.product_id); setQuantity(1); }}
                                onAddToWishlist={() => { setWishProductId(item.product_id); }}
                                onPress={() => {
                                    props.navigation.navigate('ProductDetails', {
                                        productID: item.product_id
                                    })
                                }}
                            />
                        )}
                    />}
        </View>
    )
}