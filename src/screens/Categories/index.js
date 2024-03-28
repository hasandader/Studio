import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, getVeil, getCategoryItems } from '../../redux/actions/categories';
import Button from '../../components/Button/index';
import { test5, test6, test7, test9 } from '../../images/index';
import { deviceHeight, deviceWidth } from '../../lib/utility';
import { fonts } from '../../theme/fonts';
import { primaryColors } from '../../theme/colors';
import ImageButton from '../../components/ImageButton/index';
import Langs from '../../lib/Langs';

export default function Categories(props) {

    const token = useSelector(state => state.auth.token);
    const categories = useSelector(state => state.categories.categories);
    const veil = useSelector(state => state.categories.veil);
    const categoryItems = useSelector(state => state.categories.categoryItems);
    const loadings = useSelector(state => state.ui.isLoading);
    const lang = useSelector(state => state.settings.lang);

    const [clicked, setClicked] = useState('عبايات');
    const [fetchData, setFetchData] = useState(true);

    const dispatch = useDispatch();

    const categoriesHandler = useCallback(() => {
        dispatch(getCategoryItems(token, 1, lang));
        dispatch(getCategories(token, lang));
        dispatch(getVeil(token, lang));
    }, [dispatch, token, lang]);

    useEffect(() => {
        categoriesHandler();
    }, []);

    useEffect(() => {
        if (categoryItems != null) {
            setFetchData(false);
        }
    }, [categoryItems]);

    return (
        <View style={styles.container}>
            <Header title={Langs.t('categories')} />
            {/* <View style={styles.row}>
                <TouchableOpacity style={[styles.button, clicked == 'طرح' && styles.active]} onPress={() => setClicked('طرح')}>
                    <Text children='طرح' fontFamily={fonts.bold} fontSize={16}
                        color={clicked == 'طرح' ? primaryColors.santaFe : primaryColors.doveGray} lineHeight={25}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, clicked == 'عبايات' && styles.active]} onPress={() => setClicked('عبايات')}>
                    <Text children='عبايات' fontFamily={fonts.bold} fontSize={16}
                        color={clicked == 'عبايات' ? primaryColors.santaFe : primaryColors.doveGray} lineHeight={25}
                    />
                </TouchableOpacity>
            </View> */}
            {
                (loadings.includes('getCategoryItems') || fetchData) ?
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color={primaryColors.gray} />
                    </View>
                    :
                    <FlatList
                        data={clicked == 'عبايات' ? categoryItems.sub_categories : veil}
                        contentContainerStyle={{ paddingBottom: deviceHeight() * 0.13 }}
                        renderItem={({ item, index }) => (
                            <ImageButton
                                image={{ uri: item.original_image }}
                                imageWraper={{ width: '100%', height: '100%' }}
                                // title={item.name}
                                titleStyle={styles.imgTitle}
                                style={styles.card}
                                onPress={() => props.navigation.navigate('Products', {
                                    title: Langs.t('categories'),
                                    category_id: item.category_id
                                })}
                            />
                        )}
                    />
            }
        </View>
    )
}