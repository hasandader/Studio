import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth, isArabic } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: deviceHeight() * 0.11,
        backgroundColor: primaryColors.white
    },
    listContainer: {
        width: '100%',
        marginTop: 2
    },
    btnTxt: {
        fontSize: 16,
        fontFamily: fonts.regular
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
    button: {
        width: 22,
        height: 22,
    },
    header: {
        paddingRight: 18,
        paddingLeft: 18
    },
    txtRow: {
        flexDirection: 'row-reverse'
    },
    buyBtn: {
        width: deviceWidth() * 0.3,
        height: 39,
        backgroundColor: primaryColors.santaFe
    },
    summaryRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingRight: 18,
        paddingLeft: 18,
        marginTop: 20,
        marginBottom: 10
    },
    backBtn: {
        width: 22,
        height: 10,
    },
    title: {
        textAlign: 'left',
        marginLeft: 17,
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