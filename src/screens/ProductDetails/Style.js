import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth, isArabic, isIPhoneX } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        // justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: primaryColors.white,
        flex: 1,
        // paddingBottom: deviceHeight() * 0.03,
    },
    subContainer: {
        justifyContent: 'space-between',
        flex: 1
        // marginBottom: deviceHeight() > 812 ? deviceHeight() * 0.14 : deviceHeight() * 0.15
    },
    image: {
        width: deviceWidth() * 0.91,
        height: 175,
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 5
    },
    title: {
        textAlign: 'left',
        marginLeft: 17,
        marginTop: 9,
        marginBottom: 9
    },
    prices: {
        flexDirection: isArabic() ? 'row-reverse' : 'row',
        justifyContent: isArabic() ? 'flex-end' : 'flex-start',
        paddingRight: isArabic() ? 17 : 0,
        paddingLeft: isArabic() ? 0 : 17,
    },
    textAlignment: {
        marginRight: isArabic() ? 0 : 19,
        marginLeft: isArabic() ? 19 : 0
    },
    devider: {
        borderWidth: 0.5,
        borderColor: primaryColors.silver,
        marginTop: 10
    },
    text: {
        textAlign: 'left',
        marginLeft: 17
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: primaryColors.silver,
        // paddingBottom: 25
    },
    sizes: {
        width: 50,
        height: 50,
        borderRadius: 3,
        marginRight: 8,
        marginLeft: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primaryColors.concrete,
    },
    colors: {
        width: 35,
        height: 35,
        marginRight: 12,
        marginLeft: 12,
    },
    choosenColor: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 3,
    },
    button: {
        backgroundColor: primaryColors.santaFe,
        borderRadius: 8,
        height: 44,
        width: 199,
        // marginTop: 40,
    },
    bottomView: {
        backgroundColor: primaryColors.alabaster1,
        height: 66,
        width: '100%',
        justifyContent: 'center',
    },
    btnStyle: {
        fontFamily: fonts.regular,
        fontSize: 18
    },
    curvedLine: {
        borderWidth: 1,
        borderColor: primaryColors.silverChalice,
        width: '160%',
        transform: [{ rotateZ: '2.35rad' }, { translateY: 6 }],
    },
    iconTxtStyle: {
        flexDirection: 'row-reverse',
    },
    button1: {
        // width: 22,
        height: 22,
        paddingLeft: 20
    },
    header: {
        paddingRight: 18,
        paddingLeft: 18
    },
    backBtn: {
        // width: 22,
        height: '50%',
        justifyContent: 'center',
        paddingRight: 20,
        paddingTop: 10,
    },
    p: {
        // textAlign: 'left',
    },
    modelStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    fullImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    closeButtonStyle: {
        width: 25,
        height: 25,
        top: deviceHeight() * 0.06,
        right: deviceWidth() * 0.06,
        position: 'absolute',
        zIndex: 1,
    },
    closeBtn: {
        width: '100%',
        height: '100%',
        tintColor: primaryColors.white
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
    modalStyle: {
        flex: 1,
        height: '100%',
        zIndex: 1,
        justifyContent: 'center'
    },
    tabelModal: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        width: '100%',
        height: '100%',
        alignSelf: 'center'
    },
    sizesTabel: {
        backgroundColor: primaryColors.white,
        width: deviceWidth() * 0.9,
        alignSelf: 'center',
        paddingBottom: 25,
        borderRadius: 10,
    },
    closeTabel: {
        width: 10,
        height: 17,
        marginLeft: 13,
        marginBottom: 8
    },
    tabelHeaders: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    divider: {
        borderWidth: 0.5,
        borderColor: primaryColors.santaFe,
        opacity: 0.3,
        width: '90%',
        alignSelf: 'center',
        marginTop: 21,
        marginBottom: 21
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
})