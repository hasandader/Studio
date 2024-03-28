import React, { useCallback, useEffect, useState } from 'react';
import { View, ActivityIndicator, Image, TouchableOpacity, SafeAreaView, FlatList, I18nManager } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import Button from '../../components/Button/index';
import { logo, logoTxt, profile, mail, mobile, flag, eye, about } from '../../images/index';
import { fonts } from '../../theme/fonts';
import Input from '../../components/Input/index';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/auth';
import Langs from '../../lib/Langs';

export default function Login(props) {

    const loginBy = props.navigation.state.params && props.navigation.state.params.loginBy;

    const token = useSelector(state => state.auth.token);
    const userData = useSelector(state => state.auth.userData);
    const loadings = useSelector(state => state.ui.isLoading);
    const lang = useSelector(state => state.settings.lang);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [secure, setSecure] = useState(true);
    const [loging, setLoging] = useState(false);

    const dispatch = useDispatch();

    const loginHandler = useCallback(() => {
        dispatch(login(token, email, password, lang));
    }, [dispatch, token, email, password, lang]);

    useEffect(() => {
        if (userData && loging) {
            setLoging(false);
            props.navigation.pop();
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
            <Text children={Langs.t('welcomeLogin')} fontFamily={fonts.bold} fontSize={16}
                color={primaryColors.doveGray2} mTop={18} mBottom={18} style={styles.title}
            />
            {
                // loginBy == 'email' ?
                <Input
                    containerStyle={styles.input}
                    placeholder={Langs.t('email')}
                    inputTxtStyle={[styles.inputTxtStyle]}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize={false}
                />
                // :
                // <Input
                //     containerStyle={styles.input}
                //     placeholder='592xxxxxxx'
                //     inputTxtStyle={styles.inputTxtStyle}
                //     leftIcon={flag}
                //     leftIconStyle={styles.leftIconStyle}
                //     leftComponent={<Text children='+966' fontFamily={fonts.regular} fontSize={15}
                //         color={primaryColors.tundora2} style={styles.code}
                //     />}
                //     leftStyle={styles.leftStyle}
                //     value={phone}
                //     onChangeText={(text) => setPhone(text)}
                //     autoCapitalize={false}
                // />
            }
            <View style={[styles.divider, { width: '91%' }]} />
            <Input
                containerStyle={[styles.input, { marginBottom: 70 }]}
                placeholder={Langs.t('password')}
                inputTxtStyle={[styles.inputTxtStyle]}
                leftIcon={eye}
                leftIconStyle={[{ width: 23, height: 16, resizeMode: 'contain' }, styles.eyeAlignment]}
                onLeftIconPress={() => setSecure(!secure)}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={secure}
                autoCapitalize={false}
            />
            {
                // loginBy == 'mobile' ?
                // <Button
                //     title={Langs.t('loginByEmail')}
                //     titleStyle={styles.btnTxt}
                //     icon={<Image source={mail} style={[{ width: 21, height: 14 }, styles.iconAlignment3]} />}
                //     iconTxtStyle={styles.iconTxtStyle1}
                //     style={styles.btnStyle}
                //     onPress={() => {
                //         props.navigation.setParams({ loginBy: 'email' });
                //         setPhone('')
                //     }}
                // />
                // :
                // <Button
                //     title={Langs.t('loginByMobile')}
                //     titleStyle={styles.btnTxt}
                //     icon={<Image source={mobile} style={[{ width: 17, height: 30 }, styles.iconAlignment3]} />}
                //     iconTxtStyle={styles.iconTxtStyle1}
                //     style={styles.btnStyle}
                //     onPress={() => {
                //         props.navigation.setParams({ loginBy: 'mobile' });
                //         setEmail('')
                //     }}
                // />
            }
            <Button
                title={Langs.t('createAccount')}
                titleStyle={styles.btnTxt}
                icon={<Image source={profile} style={[{ width: 17, height: 21 }, styles.iconAlignment3]} />}
                iconTxtStyle={styles.iconTxtStyle1}
                style={styles.btnStyle}
                onPress={() => props.navigation.navigate('Register')}
            />
            <Button
                title={Langs.t('login')}
                style={styles.registerBtn}
                onPress={() => { loginHandler(); setLoging(true) }}
                subChild={loadings.includes('login') &&
                    <View style={styles.inBtnActivityIndicator}>
                        <ActivityIndicator size='small' color={primaryColors.white} />
                    </View>}
            />
        </SafeAreaView>
    )
}