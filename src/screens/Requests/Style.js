import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth, isArabic } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColors.white
    },
    container1: {
        backgroundColor: primaryColors.white,
        flex: 1,
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
        marginTop: 60
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
        flexDirection: 'row',
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
    divider2: {
        width: '91%',
        borderWidth: 0.5,
        borderColor: primaryColors.alto,
    },
    dataRow: {
        flexDirection: 'row-reverse',
        width: '91%',
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 15,
        paddingTop: 12,
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: primaryColors.alto,
        borderRadius: 5,
    },
    column: {
        alignItems: 'flex-start'
    },
    statusRow: {
        flexDirection: 'row-reverse',
        width: '95%',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    statusLine: {
        // borderWidth: 1,
        width: '91%',
        alignSelf: 'center',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginTop: 22
    },
    line: {
        borderWidth: 1,
        width: deviceWidth() * 0.2035,
        height: 4,
        backgroundColor: primaryColors.approxdustyGray,
        borderColor: primaryColors.approxdustyGray,
    },
    circle: {
        borderWidth: 0.5,
        borderRadius: 10,
        width: 8,
        height: 8,
        backgroundColor: primaryColors.approxdustyGray,
        borderColor: primaryColors.approxdustyGray
    },
    active: {
        backgroundColor: primaryColors.santaFe,
        borderColor: primaryColors.santaFe
    },
    description: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginRight: 20,
    },
    billRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 13
    },
    billWraper: {
        borderWidth: 1,
        borderColor: primaryColors.alto,
        borderRadius: 5,
        width: '91%',
        alignSelf: 'center',
        paddingBottom: 13,
        marginTop: 17
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
        marginLeft: 18
    },
    title2: {
        textAlign: 'left',
        marginRight: 36,
        // marginLeft: 36
    },
    ordersList: {
        backgroundColor: primaryColors.white,
        paddingBottom: deviceHeight() * 0.11
    },
})