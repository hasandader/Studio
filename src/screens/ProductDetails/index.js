import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator, FlatList, ScrollView, Modal, SafeAreaView } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { test8, chat, categories, backBtn, cancel } from '../../images/index';
import { deviceHeight, deviceWidth } from '../../lib/utility';
import { fonts } from '../../theme/fonts';
import { primaryColors } from '../../theme/colors';
import Button from '../../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../redux/actions/home';
import { addToCart } from '../../redux/actions/cart';
import Langs from '../../lib/Langs';
import { SliderBox } from "react-native-image-slider-box";
import RNModal from 'react-native-modal';

export default function ProductDetails(props) {

    const token = useSelector(state => state.auth.token);
    const productDetails = useSelector(state => state.home.productDetails);
    const loadings = useSelector(state => state.ui.isLoading);
    const lang = useSelector(state => state.settings.lang);

    const [clicked, setClicked] = useState('sizes');
    const [size, setSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [productId, setProductId] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const [isImageModal, setIsImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [fetchData, setFetchData] = useState(true);

    const [colors, setColors] = useState(null);
    const [sizes, setSizes] = useState(null);

    const [sizeOptionId, setSizeOptionId] = useState(null);
    const [sizeValueId, setSizeValueId] = useState(null);
    const [checkedColor, setCheckedColor] = useState(null);
    const [images, setImages] = useState(null);

    const [tabelModal, setTabelModal] = useState(false);

    const dispatch = useDispatch();

    const productDetailsHandler = useCallback(() => {
        const productID = props.navigation.state.params && props.navigation.state.params.productID;
        console.log('productID: ', props.navigation.state.params)
        dispatch(getProductDetails(token, productID, lang));
    }, [dispatch, token, lang]);

    const addToCartHandler = useCallback(() => {
        dispatch(addToCart(token, productId, quantity, sizeOptionId, sizeValueId, lang));
        setProductId(null);
        setQuantity(null);
    }, [dispatch, token, productId, quantity, sizeOptionId, sizeValueId, lang]);

    useEffect(() => {
        productDetailsHandler();
        console.log('productDetailsHandler called!');
        console.log(deviceHeight())
    }, []);

    useEffect(() => {
        if (productId != null && quantity != null) {
            addToCartHandler();
        }
    }, [productId, quantity]);

    useEffect(() => {
        if (productDetails != null) {
            setFetchData(false);
            // setColors(productDetails.options[0].option_value);
            let sizesArray = productDetails.options && productDetails.options.find(element => {
                return element.option_id == 11
            })

            let colorsArray = productDetails.options && productDetails.options.find(element => {
                return element.option_id == 2
            })

            setSizes(sizesArray);
            setColors(colorsArray);
            let images = []
            productDetails && productDetails.images.forEach((item, index) => {
                images[index] = decodeURI(item);
            })
            setImages(images);

        }
    }, [productDetails]);


    console.log('images: ', images)

    return (
        <View style={styles.container}>
            <Header
                title={Langs.t('details')}
                headerRight={
                    <TouchableOpacity style={styles.button1} onPress={() => { props.navigation.navigate('Categories') }}>
                        <Image source={categories} style={{ width: 22, height: 22 }} />
                    </TouchableOpacity>
                }
                headerLeft={
                    <TouchableOpacity style={styles.backBtn} onPress={() => { props.navigation.pop() }}>
                        <Image source={backBtn} style={{ width: 22, height: 10 }} resizeMode='contain' />
                    </TouchableOpacity>
                }
                leftStyle={styles.button1}
                style={styles.header}
            />

            {
                loadings.includes('getProductDetails') || fetchData ?
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color={primaryColors.gray} />
                    </View>
                    :
                    <View style={styles.subContainer}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                            {/* <TouchableOpacity onPress={() => { setSelectedImage(productDetails.original_image); setIsImageModal(true); }}>
                            <Image source={{ uri: decodeURI(productDetails.original_image) }} style={styles.image} />
                        </TouchableOpacity> */}
                            <SliderBox
                                images={images.length > 0 ? images : [decodeURI(productDetails.image)]}
                                sliderBoxHeight={deviceHeight() * 0.6}
                                ImageComponentStyle={{}}
                                imageLoadingColor={primaryColors.gray}
                            />
                            <Text children={productDetails.name} fontFamily={fonts.regular} fontSize={22} lineHeight={30} style={styles.title} />
                            <View style={styles.prices} >
                                {/* <Text children='450 ر.س' fontFamily={fonts.regular}
                                    fontSize={15} color={primaryColors.scorpion}
                                    textDecorationLine='line-through'
                                    style={styles.textAlignment} /> */}
                                <Text children={productDetails.price_excluding_tax_formated} fontFamily={fonts.regular} fontSize={20} color={primaryColors.santaFe} />
                            </View>
                            <View style={styles.devider} />
                            <Text children={Langs.t('description')} fontFamily={fonts.regular} fontSize={16} style={styles.text} mTop={15} mBottom={10} />
                            <Text children={productDetails.description}
                                fontFamily={fonts.regular} fontSize={13} style={[styles.text, { marginLeft: 17, marginRight: 17 }]}
                            />
                            <View style={[styles.devider, { marginTop: 25 }]} />
                            {
                                (sizes || colors) &&
                                <View style={styles.buttons}>
                                    {colors && <TouchableOpacity style={clicked == 'colors' && { borderBottomWidth: 1.5, borderBottomColor: primaryColors.santaFe, paddingBottom: 25 }}
                                        onPress={() => setClicked('colors')}
                                    >
                                        <Text children={Langs.t('colors')} fontFamily={fonts.regular} fontSize={18} mRight={27} />
                                    </TouchableOpacity>}
                                    {sizes && <TouchableOpacity style={clicked == 'sizes' && { borderBottomWidth: 1.5, borderBottomColor: primaryColors.santaFe, paddingBottom: 25 }}
                                        onPress={() => setClicked('sizes')}
                                    >
                                        <Text children={Langs.t('sizes')} fontFamily={fonts.regular} fontSize={18} mLeft={27} />
                                    </TouchableOpacity>}
                                </View>}
                            {
                                clicked == 'sizes' ?
                                    <FlatList
                                        keyExtractor={item => item.option_value_id}
                                        data={sizes && sizes.option_value || []}
                                        horizontal={true}
                                        contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
                                        style={{ borderWidth: 0, marginTop: 25 }}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={[styles.sizes]} onPress={() => {
                                                setSize(item.option_value_id);
                                                setSizeOptionId(sizes.product_option_id);
                                                setSizeValueId(item.product_option_value_id);
                                            }}>
                                                <View style={[styles.sizes, size == item.option_value_id && { backgroundColor: primaryColors.santaFe },
                                                item == 48 && { backgroundColor: primaryColors.santaFe, opacity: 0.5 }  //edit this condition
                                                ]}>
                                                    <Text children={item.name} fontFamily={fonts.regular} fontSize={16} color={size == item.option_value_id && primaryColors.white} />
                                                    { //edit this condition
                                                        item == 48 && <View style={styles.curvedLine} />}
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    />
                                    :
                                    <FlatList
                                        data={colors && colors.option_value || []}
                                        horizontal={true}
                                        contentContainerStyle={{ flex: 1, justifyContent: 'center' }}
                                        style={{ borderWidth: 0, marginTop: 25 }}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={[styles.colors, item.name == selectedColor && styles.choosenColor]}
                                                onPress={() => {
                                                    setSelectedColor(item.name);
                                                    setCheckedColor(item.option_value_id)
                                                }}>
                                                <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                                            </TouchableOpacity>
                                        )}
                                    />
                            }
                            <Button
                                title='عرض جدول المقاسات'
                                titleStyle={{ fontSize: 16, color: primaryColors.mineShaft }}
                                style={{ backgroundColor: 'transparent', width: deviceWidth() * 0.55, marginTop: 15 }}
                                onPress={() => setTabelModal(true)}
                            />

                        </ScrollView>
                        {
                            //edit this condition
                            true ?
                                <View style={styles.bottomView}>
                                    <Button
                                        title={Langs.t('addToCart')}
                                        style={[styles.button, sizes && !sizeValueId && { opacity: 0.5 }]}
                                        titleStyle={styles.btnStyle}
                                        disabled={sizes && !sizeValueId}
                                        onPress={() => { setProductId(productDetails.product_id); setQuantity(1); }}
                                    />
                                </View>
                                :
                                <Button
                                    title={Langs.t('notifyMeAvailable')}
                                    style={styles.button}
                                    titleStyle={styles.btnStyle}
                                    icon={<Image source={chat} style={{ width: 32, height: 26, marginLeft: 18 }} />}
                                    iconTxtStyle={styles.iconTxtStyle}
                                />
                        }
                    </View>
            }


            <Modal
                transparent={true}
                animationType={'fade'}
                visible={isImageModal}
                onRequestClose={() => setIsImageModal(false)}
            >
                <View style={styles.modelStyle}>
                    <Image
                        style={styles.fullImageStyle}
                        source={{ uri: selectedImage }}
                        resizeMode={'contain'}
                    />
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.closeButtonStyle}
                        onPress={() => setIsImageModal(false)}>
                        <Image
                            source={cancel}
                            style={styles.closeBtn}
                        />
                    </TouchableOpacity>
                </View>
            </Modal>

            <RNModal
                backdropColor='white'
                isVisible={tabelModal}
                backdropOpacity={0.5}
                onBackdropPress={() => setTabelModal(false)}
            >
                <View style={[styles.sizesTabel, styles.shadow]}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ width: 50, paddingTop: 12 }}
                        onPress={() => setTabelModal(false)}>
                        <Image
                            source={cancel}
                            style={styles.closeTabel}
                        />
                    </TouchableOpacity>
                    <View style={[styles.tabelHeaders, { marginBottom: 40 }]}>
                        <Text children='طول الكم' fontFamily={fonts.bold} fontSize={16} color={primaryColors.santaFe} />
                        <Text children='العرض' fontFamily={fonts.bold} fontSize={16} color={primaryColors.santaFe} />
                        <Text children='الطول' fontFamily={fonts.bold} fontSize={16} color={primaryColors.santaFe} />
                        <Text children='المقاس' fontFamily={fonts.bold} fontSize={16} color={primaryColors.santaFe} />
                    </View>
                    <View style={styles.tabelHeaders}>
                        <Text children='26' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='22' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='52' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='52' fontFamily={fonts.regular} fontSize={16} color={primaryColors.tundora4} />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.tabelHeaders}>
                        <Text children='27' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='23' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='54' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='54' fontFamily={fonts.regular} fontSize={16} color={primaryColors.tundora4} />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.tabelHeaders}>
                        <Text children='28' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='25' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='56' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='56' fontFamily={fonts.regular} fontSize={16} color={primaryColors.tundora4} />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.tabelHeaders}>
                        <Text children='29' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='26' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='58' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='58' fontFamily={fonts.regular} fontSize={16} color={primaryColors.tundora4} />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.tabelHeaders}>
                        <Text children='30' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='28' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='60' fontFamily={fonts.regular} fontSize={16} color={primaryColors.gray5} />
                        <Text children='60' fontFamily={fonts.regular} fontSize={16} color={primaryColors.tundora4} />
                    </View>
                </View>
            </RNModal>
            <SafeAreaView style={{ backgroundColor: primaryColors.alabaster1 }} />
        </View>
    )
}