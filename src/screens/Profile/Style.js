import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth, isArabic } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        paddingBottom: deviceHeight() * 0.08,
        backgroundColor: primaryColors.white,
        flex: 1
    },
    btnTitle: {
        fontSize: 15,
        fontFamily: fonts.regular,
        color: primaryColors.silverChalice
    },
    button1: {
        backgroundColor: primaryColors.alabaster,
        marginTop: 15,
        borderRadius: 0,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    stateBtn: {
        backgroundColor: primaryColors.alabaster,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: deviceWidth() * 0.05,
        paddingLeft: deviceWidth() * 0.05,
        borderRadius: 0
    },
    iconTxtStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconAlignment1: {
        marginRight: 12
    },
    iconAlignment2: {
        marginLeft: 5
    },
    iconAlignment3: {
        marginRight: 5,
    },
    iconAlignment4: {
        marginRight: 10
    },
    iconAlignment5: {
        marginRight: 8
    },
    eyeAlignment: {
        marginRight: 15
    },
    button: {
        // width: 22,
        height: 22,
        paddingLeft: 20
    },
    backBtn: {
        // width: 22,
        height: '50%',
        justifyContent: 'center',
        paddingRight: 20,
        paddingTop: 10,
    },
    header: {
        paddingRight: 18,
        paddingLeft: 18
    },
    country: {
        transform: [{ translateY: 0 }],
        marginRight: 5,
    },
    countryWraper: {
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    radius: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    divider: {
        width: deviceWidth() * 0.84,
        borderWidth: 0.5,
        borderColor: primaryColors.alto,
        alignSelf: 'center'
    },
    radioBtn: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        alignItems: 'flex-start'
    },
    radiosWraper: {
        backgroundColor: primaryColors.alabaster,
        width: deviceWidth() * 0.91,
        height: 94,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    radioTxt: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: primaryColors.doveGray
    },
    countryView: {
        backgroundColor: primaryColors.alabaster,
        width: deviceWidth() * 0.91,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingRight: 13,
        paddingLeft: 13,
        paddingTop: 10,
        minHeight: 85,
    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 13,
        marginTop: 15
    },
    row: {
        flexDirection: 'row-reverse',
        alignSelf: 'flex-start',
    },
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 18
    },
    close: {
        backgroundColor: 'transparent',
        width: 45,
        height: 29,
    },
    input: {
        flexDirection: 'row-reverse',
        backgroundColor: primaryColors.alabaster,
        borderBottomWidth: 0,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        alignSelf: 'center',
        width: '91%',
        height: 56,
    },
    inputTxtStyle: {
        textAlign: isArabic() ? 'right' : 'left',
        marginRight: 20,
        marginLeft: 20,
    },
    leftIconStyle: {
        width: 34,
        height: 20,
        borderRadius: 3,
        marginRight: 15
    },
    code: {
        marginRight: 10
    },
    leftStyle: {
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    iconTxtStyle1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnStyle: {
        width: 200,
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
        justifyContent: isArabic() ? 'flex-end' : 'flex-start',
        marginRight: isArabic() ? 18 : 0,
        marginLeft: isArabic() ? 0 : 18,
        height: 35,
        marginBottom: 5,
        // borderWidth: 1
    },
    btnTxt: {
        color: primaryColors.doveGray2,
        fontFamily: fonts.regular,
        fontSize: 16,
    },
    registerBtn: {
        backgroundColor: primaryColors.santaFe,
        borderRadius: 8,
        width: '71%',
        marginTop: 70
    },
    title: {
        textAlign: 'left',
        // marginRight: !isArabic() ? 18 : 0,
        marginLeft: 18
    },
    title2: {
        // marginLeft: !isArabic() ? 10 : 0,
        marginRight: 10
    },
    mapContainer: {
        width: deviceWidth() * 0.91,
        height: 236,
        alignSelf: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    modalContainer: {
        width: deviceWidth() * 1,
        // height: 364,
        flex: 1,
        backgroundColor: primaryColors.white,
        borderRadius: 5,
        alignSelf: 'center'
    },
    modalMap: {
        width: '100%',
        height: 315,
        borderRadius: 5
    },
    modalBtns: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 44,
    },
    modalBtn: {
        width: 163,
        height: 40,
        backgroundColor: primaryColors.santaFe,
        marginBottom: 30
    },
    modalBtnDiff: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: primaryColors.santaFe
    },
    saveBtnTxt: {
        fontFamily: fonts.regular,
        fontSize: 14
    },
    inputContainer: {
        borderBottomWidth: 0,
        backgroundColor: primaryColors.alabaster,
        borderRadius: 5,
        width: deviceWidth() * 0.91,
        alignSelf: 'center',
        paddingLeft: 10,
    },
    inputContainer1: {
        borderBottomWidth: 0,
        backgroundColor: primaryColors.alabaster,
        borderRadius: 5,
        width: deviceWidth() * 0.91,
        alignSelf: 'center',
        marginBottom: 11
    },
    addressWraper: {
        flexDirection: 'row',
        width: deviceWidth() * 0.91,
        alignSelf: 'center',
        marginTop: 19
    },
    magicTxt: {
        backgroundColor: primaryColors.alabaster,
        width: deviceWidth() * 0.91,
        height: 47,
        borderRadius: 5,
        textAlign: 'left',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        marginBottom: 10
    },
    inputText: {
        fontFamily: fonts.regular,
        fontSize: 15,
        color: primaryColors.doveGray,
    },
    telephone: {
        flex: 1,
        height: '100%',
        marginLeft: 10
    },
    inputMap: {
        borderBottomWidth: 0,
        width: '100%'
    },
    mobileCotainer: {
        flexDirection: 'row',
        width: deviceWidth() * 0.91,
        height: 47,
        borderRadius: 5,
        backgroundColor: primaryColors.alabaster,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20
    },
    addressInput: {
        width: deviceWidth() * 0.91,
        height: 47,
        backgroundColor: primaryColors.alabaster,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'center',
        borderBottomWidth: 0,
        paddingLeft: 20
    },
    inBtnActivityIndicator: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
    },
    activityIndicator: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: '50%',
    },
    back: {
        backgroundColor: 'white',
        height: 30,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10
    },
})