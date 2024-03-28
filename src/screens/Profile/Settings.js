import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator, I18nManager } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import Button from '../../components/Button/index';
import { global, flag, help, radioActive, categories, backBtn, radioBtn } from '../../images/index';
import { fonts } from '../../theme/fonts';
import { CheckBox } from 'react-native-elements'
import Langs from '../../lib/Langs';
import { isArabic } from '../../lib/utility';
import RNRestart from 'react-native-restart';
import { changeLanguage } from '../../redux/actions/settings';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';

export default function Settings(props) {

    const lang = useSelector(state => state.settings.lang);
    const userData = useSelector(state => state.auth.userData);

    console.log('userData: ', userData)

    const [language, setLanguage] = useState(lang);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [markerLoc, setMarkerLoc] = useState({ longitude: 46.71007187712675, latitude: 24.626473539206017, });
    const [latlonDelta, setLatlonDelta] = useState({ latitudeDelta: 0.036, longitudeDelta: 0.0121 });
    const [isMapReady, setIsMapReady] = useState(false);

    const dispatch = useDispatch();

    const languageHandler = useCallback(() => {
        dispatch(changeLanguage(language));
        console.log('language: ', language)
    }, [dispatch, language]);

    function updateLanguage(selectedLanguage) {
        if (selectedLanguage == 'ar') {
            I18nManager.forceRTL(true);
            I18nManager.allowRTL(true);
        }
        else {
            I18nManager.forceRTL(false);
            I18nManager.allowRTL(false);
        }
        // languageHandler();
        setTimeout(() => {
            RNRestart.Restart();
        }, 500);
    }

    console.log(lang)

    function pickLocationHandler(coords) {
        map.animateToRegion({
            longitude: coords.longitude,
            latitude: coords.latitude,
            // latitudeDelta: latlonDelta.latitudeDelta,
            // longitudeDelta: latlonDelta.longitudeDelta,
        });
    };

    return (
        <View style={styles.container}>
            <Header
                title={Langs.t('settings')}
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

            <ScrollView>
                <Text children={Langs.t('chooseLanguage')} fontFamily={fonts.regular} fontSize={16} color={primaryColors.doveGray}
                    mBottom={10} mTop={55} style={styles.title}
                />
                <View style={styles.radiosWraper}>
                    <CheckBox
                        center
                        title='English'
                        // iconRight={isArabic()}
                        checkedIcon={<Image source={radioBtn} style={{ width: 16, height: 16 }} />}
                        uncheckedIcon={<Image source={radioActive} style={{ width: 16, height: 16 }} />}
                        onPress={() => { setLanguage('en'); updateLanguage('en') }}
                        checked={language !== 'en'}
                        containerStyle={styles.radioBtn}
                        textStyle={styles.radioTxt}
                    />
                    <CheckBox
                        center
                        title='العربية'
                        // iconRight={isArabic()}
                        checkedIcon={<Image source={radioBtn} style={{ width: 16, height: 16 }} />}
                        uncheckedIcon={<Image source={radioActive} style={{ width: 16, height: 16 }} />}
                        onPress={() => { setLanguage('ar'); updateLanguage('ar') }}
                        checked={language !== 'ar'}
                        containerStyle={styles.radioBtn}
                        textStyle={styles.radioTxt}
                    />
                </View>

                <Text children={Langs.t('country')} fontFamily={fonts.regular} fontSize={16} color={primaryColors.doveGray}
                    mBottom={10} mTop={16} style={styles.title}
                />
                <View style={styles.countryView}>
                    <View style={styles.row}>
                        <Text children={Langs.t('saudiArabia')} fontFamily={fonts.regular} fontSize={16} color={primaryColors.doveGray} />
                        <Image source={flag} style={[{ width: 40, height: 23, borderRadius: 5 }, styles.title2]} />
                    </View>
                    <Text children={Langs.t('soonElsewhere')} fontFamily={fonts.regular} fontSize={16}
                        color={primaryColors.doveGray} mTop={18}
                    />
                </View>

                <Text children={Langs.t('address')} fontFamily={fonts.regular} fontSize={16} color={primaryColors.doveGray}
                    mBottom={10} mTop={16} style={styles.title} />

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            longitude: 46.71007187712675,
                            latitude: 24.626473539206017,
                            latitudeDelta: 0.036,
                            longitudeDelta: 0.0121,
                        }}
                        // ref={ref => {
                        //     map = ref;
                        // }}
                        // onPress={(coordinate) => {
                        //     setMarkerLoc({ longitude: coordinate.nativeEvent.coordinate.longitude, latitude: coordinate.nativeEvent.coordinate.latitude });
                        //     pickLocationHandler({ longitude: coordinate.nativeEvent.coordinate.longitude, latitude: coordinate.nativeEvent.coordinate.latitude })
                        // }}
                        // onRegionChange={(Region) => setLatlonDelta({ latitudeDelta: Region.latitudeDelta, longitudeDelta: Region.longitudeDelta })}
                        scrollEnabled={false}
                        zoomEnabled={false}
                    >
                        <MapView.Marker
                            coordinate={{
                                longitude: markerLoc.longitude,
                                latitude: markerLoc.latitude,
                                latitudeDelta: 0.036,
                                longitudeDelta: 0.0121,
                            }}
                        />
                    </MapView>
                </View>

                <TouchableOpacity onPress={() => {
                    // setIsModalVisible(true);
                    props.navigation.navigate('AddressMap')
                }}>
                    <Text children={Langs.t('addNewAddress')} fontFamily={fonts.regular} fontSize={14} color={primaryColors.santaFe}
                        mBottom={10} mTop={12} style={styles.title} textDecorationLine='underline' />
                </TouchableOpacity>

                <Modal isVisible={isModalVisible}
                    style={styles.modalStyle}
                    onBackdropPress={() => setIsModalVisible(false)}
                    backdropOpacity={0.3}
                    animationIn='zoomIn'
                    animationOut='zoomOut'
                >
                    <View style={styles.modalContainer}>
                        <MapView
                            style={styles.modalMap}
                            initialRegion={{
                                longitude: 46.71007187712675,
                                latitude: 24.626473539206017,
                                latitudeDelta: 0.036,
                                longitudeDelta: 0.0121,
                            }}
                            ref={ref => {
                                map = ref;
                            }}
                            onPress={(coordinate) => {
                                setMarkerLoc({ longitude: coordinate.nativeEvent.coordinate.longitude, latitude: coordinate.nativeEvent.coordinate.latitude });
                                pickLocationHandler({ longitude: coordinate.nativeEvent.coordinate.longitude, latitude: coordinate.nativeEvent.coordinate.latitude })
                            }}
                            onRegionChange={(Region) => setLatlonDelta({ latitudeDelta: Region.latitudeDelta, longitudeDelta: Region.longitudeDelta })}
                        >
                            <MapView.Marker
                                coordinate={{
                                    longitude: markerLoc.longitude,
                                    latitude: markerLoc.latitude,
                                }}
                            />
                        </MapView>
                        <View style={styles.modalBtns}>
                            <Button
                                title={Langs.t('save')}
                                titleStyle={styles.saveBtnTxt}
                                style={styles.modalBtn}
                            />
                            <Button
                                title={Langs.t('cancle')}
                                titleStyle={[styles.saveBtnTxt, { color: primaryColors.santaFe }]}
                                style={[styles.modalBtn, styles.modalBtnDiff]}
                                onPress={() => setIsModalVisible(false)}
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )
}