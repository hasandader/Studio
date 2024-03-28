import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator, Image, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import Button from '../../components/Button/index';
import { logo, logoTxt, eye, mail, mobile, flag, help, about } from '../../images/index';
import { fonts } from '../../theme/fonts';
import Input from '../../components/Input/index';
import { register } from '../../redux/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import Langs from '../../lib/Langs';

export default function Register(props) {

    const token = useSelector(state => state.auth.token);
    const userData = useSelector(state => state.auth.userData);
    const loadings = useSelector(state => state.ui.isLoading);
    const lang = useSelector(state => state.settings.lang);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);
    const [loging, setLoging] = useState(false);

    const dispatch = useDispatch();

    const registerHandler = useCallback(() => {
        dispatch(register(token, firstName, lastName, email, password, phone, lang));
    }, [dispatch, token, firstName, lastName, email, password, phone, lang]);

    useEffect(() => {
        if (userData && loging) {
            setLoging(false);
            props.navigation.popToTop();
        }
    }, [userData]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainRow}>
                <Button
                    title={Langs.t('close')}
                    style={styles.close}
                    titleStyle={styles.btnTitle}
                    onPress={() => props.navigation.pop()}
                />
                <View style={styles.loginRow}>
                    <Image source={logoTxt} style={{ width: 82, height: 16, marginRight: 5 }} resizeMode='contain' />
                    <Image source={logo} style={{ width: 61, height: 55 }} resizeMode='contain' />
                </View>
            </View>
            <Text children={Langs.t('welcomeCreateAccount')} fontFamily={fonts.bold} fontSize={16}
                color={primaryColors.doveGray2} mTop={18} mBottom={18} style={styles.title}
            />
            <Input
                containerStyle={styles.input}
                placeholder={Langs.t('firstName')}
                inputTxtStyle={styles.inputTxtStyle}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
            />
            <View style={[styles.divider, { width: '91%' }]} />
            <Input
                containerStyle={styles.input}
                placeholder={Langs.t('lastName')}
                inputTxtStyle={styles.inputTxtStyle}
                value={lastName}
                onChangeText={(text) => setLastName(text)}
            />
            <View style={[styles.divider, { width: '91%' }]} />
            <Input
                containerStyle={styles.input}
                placeholder={Langs.t('email')}
                inputTxtStyle={styles.inputTxtStyle}
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize={false}
            />
            <View style={[styles.divider, { width: '91%' }]} />
            <Input
                containerStyle={styles.input}
                placeholder='592xxxxxxx'
                inputTxtStyle={styles.inputTxtStyle}
                leftIcon={flag}
                leftIconStyle={styles.leftIconStyle}
                leftComponent={<Text children='+966' fontFamily={fonts.regular} fontSize={15}
                    color={primaryColors.tundora2} style={styles.code}
                />}
                leftStyle={styles.leftStyle}
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />
            <View style={[styles.divider, { width: '91%' }]} />
            <Input
                containerStyle={styles.input}
                placeholder={Langs.t('password')}
                inputTxtStyle={styles.inputTxtStyle}
                leftIcon={eye}
                leftIconStyle={[{ width: 23, height: 16, resizeMode: 'contain' }, styles.eyeAlignment]}
                onLeftIconPress={() => setSecure(!secure)}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={secure}
                autoCapitalize={false}
            />
            <Button
                title={Langs.t('loginByEmail')}
                titleStyle={styles.btnTxt}
                icon={<Image source={mail} style={[{ width: 21, height: 14 }, styles.iconAlignment3]} />}
                iconTxtStyle={styles.iconTxtStyle1}
                style={[styles.btnStyle, { marginTop: 35 }]}
                onPress={() => props.navigation.navigate('Login', {
                    loginBy: 'email'
                })}
            />
            {/* <Button
                title={Langs.t('loginByMobile')}
                titleStyle={styles.btnTxt}
                icon={<Image source={mobile} style={[{ width: 17, height: 30 }, styles.iconAlignment3]} />}
                iconTxtStyle={styles.iconTxtStyle1}
                style={styles.btnStyle}
                onPress={() => props.navigation.navigate('Login', {
                    loginBy: 'mobile'
                })}
            /> */}
            <Button
                title={Langs.t('register')}
                style={styles.registerBtn}
                onPress={() => { registerHandler(); setLoging(true) }}
                subChild={loadings.includes('register') &&
                    <View style={styles.inBtnActivityIndicator}>
                        <ActivityIndicator size='small' color={primaryColors.white} />
                    </View>}
            />
        </SafeAreaView>
    )
}