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
import { getCategoryItems } from '../../redux/actions/categories';

export default function SubCategories(props) {

    const title = props.navigation.state.params && props.navigation.state.params.title;

    const token = useSelector(state => state.auth.token);
    const categoryItems = useSelector(state => state.categories.categoryItems);
    const lang = useSelector(state => state.settings.lang);

    const data = [test9, test10, test11, test9, test10, test11, test9, test10, test11, test9, test10, test11];

    const [clicked, setClicked] = useState('عبايات');
    const [products, setProducts] = useState([{ image: test9 }, { image: test10 }, { image: test11 }, { image: test9 }, { image: test10 }, { image: test11 }, { image: test9 }, { image: test10 }, { image: test11 }, { image: test9 }, { image: test10 }, { image: test11 }]);


    const dispatch = useDispatch();

    const categoryItemsHandler = useCallback(() => {
        const category_id = props.navigation.state.params && props.navigation.state.params.category_id;
        dispatch(getCategoryItems(token, category_id, lang));
    }, [dispatch, token, lang]);

    useEffect(() => {
        categoryItemsHandler();
    }, []);

    useEffect(() => {
        if (categoryItems) {
            setProducts(categoryItems.sub_categories);
            console.log('new data has been set!');
        }
    }, [categoryItems])

    return (
        <View style={styles.container}>
            <Header
                title={title || 'العبايات'}
                headerRight={
                    <TouchableOpacity style={styles.button2} onPress={() => { props.navigation.navigate('Categories') }}>
                        <Image source={categories} style={{ width: 22, height: 22 }} />
                    </TouchableOpacity>
                }
                headerLeft={
                    <TouchableOpacity style={styles.backBtn} onPress={() => { props.navigation.pop() }}>
                        <Image source={backBtn} style={{ width: 22, height: 10 }} resizeMode='contain' />
                    </TouchableOpacity>
                }
                leftStyle={styles.button2}
                style={styles.header}
            />

            {
                title &&
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button1, clicked == 'طرح' && styles.active]} onPress={() => setClicked('طرح')}>
                        <Text children='طرح' fontFamily={fonts.bold} fontSize={16}
                            color={clicked == 'طرح' ? primaryColors.santaFe : primaryColors.doveGray} lineHeight={25}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button1, clicked == 'عبايات' && styles.active]} onPress={() => setClicked('عبايات')}>
                        <Text children='عبايات' fontFamily={fonts.bold} fontSize={16}
                            color={clicked == 'عبايات' ? primaryColors.santaFe : primaryColors.doveGray} lineHeight={25}
                        />
                    </TouchableOpacity>
                </View>
            }

            <FlatList
                data={products}
                numColumns={2}
                style={{ marginTop: 1 }}
                contentContainerStyle={{ alignSelf: 'center', borderWidth: 0, paddingTop: 15 }}
                columnWrapperStyle={{ marginBottom: 15 }}
                ListHeaderComponent={() => {

                    return !title && <Text children='العبايات'
                        fontFamily={fonts.bold} fontSize={18} mTop={18} align='right'
                        mRight={17} mBottom={15} />
                }}
                renderItem={({ item }) => (
                    <ShoppingCard
                        image={{ uri: item.original_image }}
                        addStyle={{ backgroundColor: 'transparent' }}
                        title={item.name}
                        containerStyle={{ marginRight: 8, marginLeft: 8 }}
                        buttonStyle={{ backgroundColor: primaryColors.approxGallery, borderRadius: 5 }}
                        onPress={() => {
                            props.navigation.navigate('Products', {
                                category_id: item.category_id
                            })
                        }}
                    />
                )}
            />
        </View>
    )
}