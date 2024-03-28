import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator, I18nManager } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import Button from '../../components/Button/index';
import { categories, backBtn, search, location, flag } from '../../images/index';
import { fonts } from '../../theme/fonts';
import Langs from '../../lib/Langs';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import Input from '../../components/Input/index';
import { APIKey } from '../../lib/constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { addAddress, setUserNewAddress } from '../../redux/actions/payment';

export default function AddressMap(props) {

    const map = useRef(null);

    const token = useSelector(state => state.auth.token);
    const userData = useSelector(state => state.auth.userData);
    const loadings = useSelector(state => state.ui.isLoading);
    const newAddressAdded = useSelector(state => state.payment.newAddressAdded);
    const lang = useSelector(state => state.settings.lang);

    const [markerLoc, setMarkerLoc] = useState({ longitude: 46.71007187712675, latitude: 24.626473539206017, });
    const [latlonDelta, setLatlonDelta] = useState({ latitudeDelta: 0.036, longitudeDelta: 0.0121 });
    const [isMapReady, setIsMapReady] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [next, setNext] = useState(false);
    const [typedAddress, setTypedAddress] = useState('');
    const [newName, setNewName] = useState(userData && userData.firstname || '');
    const [newFamily, setNewFamily] = useState(userData && userData.lastname || '');
    const [newMobile, setNewMobile] = useState(userData && userData.telephone || '');

    const dispatch = useDispatch();

    const newAddressStatusHandler = useCallback(() => {
        dispatch(setUserNewAddress(false));
        props.navigation.pop();
    }, [dispatch]);

    const addAddressHandler = useCallback(() => {
        dispatch(addAddress(token, newName, newFamily, newMobile, address, typedAddress, markerLoc.latitude, markerLoc.longitude, lang, city));
    }, [dispatch, token, userData, newName, newFamily, newMobile, address, typedAddress, markerLoc, lang, city]);

    useEffect(() => {
        if (newAddressAdded) {
            newAddressStatusHandler();
        }
    }, [newAddressAdded]);

    function pickLocationHandler(coords) {
        if (map.current) {
            console.log('map ref')
            map.current.animateCamera({
                center: {
                    longitude: coords.longitude,
                    latitude: coords.latitude,
                }
                // latitudeDelta: latlonDelta.latitudeDelta,
                // longitudeDelta: latlonDelta.longitudeDelta,
            });
        }
    };

    function getAddress(selectedPlace) {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + selectedPlace.latitude + ',' + selectedPlace.longitude + '&key=' + APIKey)
            .then((response) => response.json())
            .then((responseJson) => {
                let address = JSON.stringify(responseJson);
                let parsedAddress = JSON.parse(address);
                console.log('ADDRESS GEOCODE is BACK!! => ', parsedAddress);

                var stateName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].short_name;
                var formattedAddress = responseJson.results[0].formatted_address
                setAddress(parsedAddress.results[0].formatted_address)
                // for City Name I used the administrative_area_level_2
                console.log('stateName: ', stateName)
                console.log('stateName2: ', parsedAddress.results[0].formatted_address)
            })
            .catch(err => {
                console.log('Ooops! ', err)
            })
    }

    function getLatLong(selectedPlace) {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?place_id=' + selectedPlace + '&key=' + APIKey)
            .then((response) => response.json())
            .then((responseJson) => {
                let address = JSON.stringify(responseJson);
                let parsedAddress = JSON.parse(address);
                console.log('ADDRESS GEOCODE is BACK!! => ', parsedAddress);

                var stateName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].short_name;
                var formattedAddress = responseJson.results[0].formatted_address
                setAddress(parsedAddress.results[0].formatted_address)
                // for City Name I used the administrative_area_level_2
                console.log('stateName: ', stateName)
                console.log('stateName2: ', parsedAddress.results[0].formatted_address)
                setMarkerLoc({ longitude: parsedAddress.results[0].geometry.location.lng, latitude: parsedAddress.results[0].geometry.location.lat });
                pickLocationHandler({ longitude: parsedAddress.results[0].geometry.location.lng, latitude: parsedAddress.results[0].geometry.location.lat });
            })
            .catch(err => {
                console.log('Ooops! ', err)
            })
    }

    function getCity(selectedPlace) {
        fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + selectedPlace.latitude + '&longitude=' + selectedPlace.longitude + '&localityLanguage=ar')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('City ', responseJson);
                setCity(`${responseJson.locality} ${responseJson.principalSubdivision}`)
            })
            .catch(err => {
                console.log('Ooops! ', err)
            })
    }

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

            <Text children={Langs.t('addYourAddress')} fontFamily={fonts.regular} fontSize={16} color={primaryColors.doveGray}
                mBottom={10} mTop={26} style={styles.title} />

            {
                !next &&
                <GooglePlacesAutocomplete
                    placeholder={Langs.t('findAstreet')}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                        getLatLong(data.place_id);
                    }}
                    query={{
                        key: APIKey,
                        language: 'en',
                    }}
                    styles={{
                        textInputContainer: styles.inputContainer1,
                        textInput: styles.inputContainer,
                        container: {
                            borderWidth: 0, flex: 0, zIndex: 1,
                        },
                        listView: { borderWidth: 0, zIndex: 1, position: 'absolute', marginTop: '13%' }
                    }}
                />
            }

            <ScrollView nestedScrollEnabled={true}>
                <View style={styles.modalContainer}>
                    <MapView
                        style={styles.modalMap}
                        initialRegion={{
                            longitude: 46.71007187712675,
                            latitude: 24.626473539206017,
                            latitudeDelta: 0.036,
                            longitudeDelta: 0.0121,
                        }}
                        ref={map}
                        onPress={(coordinate) => {
                            if (!next) {
                                setMarkerLoc({ longitude: coordinate.nativeEvent.coordinate.longitude, latitude: coordinate.nativeEvent.coordinate.latitude });
                                pickLocationHandler({ longitude: coordinate.nativeEvent.coordinate.longitude, latitude: coordinate.nativeEvent.coordinate.latitude });
                                getAddress({ longitude: coordinate.nativeEvent.coordinate.longitude, latitude: coordinate.nativeEvent.coordinate.latitude });
                                getCity({ longitude: coordinate.nativeEvent.coordinate.longitude, latitude: coordinate.nativeEvent.coordinate.latitude })
                            }
                        }}
                        onRegionChange={(Region) => setLatlonDelta({ latitudeDelta: Region.latitudeDelta, longitudeDelta: Region.longitudeDelta })}
                        scrollEnabled={!next}
                        zoomEnabled={!next}
                    >
                        <MapView.Marker
                            coordinate={{
                                longitude: markerLoc.longitude,
                                latitude: markerLoc.latitude,
                            }}
                        />
                    </MapView>
                    {
                        address !== '' &&
                        <View style={styles.addressWraper}>
                            <Image source={location} style={{ width: 15, height: 19, marginRight: 6 }} />
                            <Text children={address} fontFamily={fonts.regular} fontSize={14}
                                color={primaryColors.doveGray} mRight={5} />
                        </View>
                    }

                    {
                        next &&
                        <>
                            <View style={[styles.magicTxt, { marginTop: 20 }]}>
                                <Input
                                    value={newName}
                                    inputTxtStyle={styles.inputText}
                                    containerStyle={styles.inputMap}
                                    onChangeText={(text) => setNewName(text)}
                                />
                            </View>

                            <View style={styles.magicTxt}>
                                <Input
                                    value={newFamily}
                                    inputTxtStyle={styles.inputText}
                                    containerStyle={styles.inputMap}
                                    onChangeText={(text) => setNewFamily(text)}
                                />
                            </View>

                            <View style={styles.mobileCotainer}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={flag} style={{ width: 34, height: 20, borderRadius: 5, marginRight: 10 }} />
                                    <Text children='+966' fontFamily={fonts.regular} fontSize={15}
                                        color={primaryColors.tundora2}
                                    />
                                </View>
                                <Input
                                    value={newMobile}
                                    inputTxtStyle={styles.inputText}
                                    containerStyle={[styles.inputMap, styles.telephone]}
                                    onChangeText={(text) => setNewMobile(text)}
                                />
                            </View>

                            <Input
                                placeholder={Langs.t('nearbyPlaces')}
                                inputTxtStyle={styles.inputText}
                                containerStyle={styles.addressInput}
                                value={typedAddress}
                                onChangeText={(text) => setTypedAddress(text)}

                            />
                        </>
                    }

                    {
                        !next ?
                            <View style={[styles.modalBtns, address == '' && { opacity: 0.5 }]}>
                                <Button
                                    title={Langs.t('determineAddres')}
                                    titleStyle={styles.saveBtnTxt}
                                    style={[styles.modalBtn]}
                                    disabled={address == ''}
                                    onPress={() => setNext(true)}
                                />
                            </View>
                            :
                            <View style={[styles.modalBtns, typedAddress == '' && { opacity: 0.5 }]}>
                                <Button
                                    title={Langs.t('save')}
                                    titleStyle={styles.saveBtnTxt}
                                    style={[styles.modalBtn]}
                                    disabled={typedAddress == ''}
                                    subChild={loadings.includes('addAddress') &&
                                        <View style={styles.inBtnActivityIndicator}>
                                            <ActivityIndicator size='small' color={primaryColors.white} />
                                        </View>}
                                    onPress={() => addAddressHandler()}
                                />
                            </View>
                    }

                </View>
            </ScrollView>
        </View>
    )
}