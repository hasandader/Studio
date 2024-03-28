import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth, isArabic } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingBottom: deviceHeight() * 0.11,
        backgroundColor: primaryColors.white
    },
    container1: {
        flex: 1,
        paddingBottom: deviceHeight() * 0.11,
        backgroundColor: primaryColors.white
    },
    listContainer: {
        width: '100%',
        marginTop: 2
    },
    btnTxt: {
        fontSize: 16,
        fontFamily: fonts.regular,
        lineHeight: 25
    },
    btnTitle: {
        fontSize: 15,
        color: primaryColors.shark
    },
    btn: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: primaryColors.shark,
        marginTop: 35,
        marginBottom: 14
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
    inBtnActivityIndicator: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
        // width: 22,
        height: 22,
        paddingLeft: 20
    },
    header: {
        paddingRight: 18,
        paddingLeft: 18
    },
    txtRow: {
        flexDirection: 'row'
    },
    buyBtn: {
        width: deviceWidth() * 0.61,
        height: 39,
        backgroundColor: primaryColors.santaFe,
        marginBottom: 25,
        marginTop: 60,
    },
    updatedBuyBtn: {
        position: 'absolute',
        marginTop: deviceHeight() * 0.75,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingRight: 18,
        paddingLeft: 18,
        marginTop: 20,
        marginBottom: 10
    },
    footer: {
        width: '100%',
        marginTop: 40
    },
    row: {
        flexDirection: !isArabic() ? 'row' : 'row-reverse',
        justifyContent: 'space-between',
        marginRight: 17,
        marginLeft: 17,
        marginBottom: 16
    },
    divider: {
        borderWidth: 0.5,
        borderColor: primaryColors.alto,
        marginRight: 17,
        marginLeft: 17
    },
    backBtn: {
        // width: 22,
        height: '50%',
        justifyContent: 'center',
        paddingRight: 20,
        paddingTop: 10,
    },
    title: {
        textAlign: 'left',
        marginLeft: 17
    },
    radioBtn: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        alignItems: 'flex-start'
    },
    radiosWraper: {
        backgroundColor: primaryColors.white,
        width: '100%',
        // height: 94,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10
    },
    radioTxt: {
        fontFamily: fonts.regular,
        fontSize: 14,
        color: primaryColors.doveGray,
        fontWeight: 'normal',
        textAlign: 'left'
    },
    checkBoxs: {
        flexDirection: 'row',
        width: deviceWidth() * 0.91,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    modalStyle: {
        flex: 1,
        height: '100%',
        zIndex: 1,
        justifyContent: 'center'
    },
    modalContainer: {
        backgroundColor: primaryColors.white,
        alignItems: 'center',
        paddingTop: 18,
        borderRadius: 8
    },
    modalDivider: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: primaryColors.alto,
    },
    btnsWraper: {
        flexDirection: 'row'
    },
    selectionBtn: {
        width: '50%',
        backgroundColor: 'transparent'
    },
    selectionBtnTitle: {
        color: primaryColors.gray4,
        fontFamily: fonts.regular,
        fontSize: 18
    },
    virticalDivider: {
        borderWidth: 0.5,
        borderColor: primaryColors.alto,
    }
})