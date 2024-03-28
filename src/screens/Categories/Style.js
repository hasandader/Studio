import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColors.white
    },
    row: {
        flexDirection: 'row',
        width: '91%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 28
    },
    button: {
        width: '50%',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 12,
        borderBottomColor: primaryColors.silver
    },
    active: {
        borderBottomColor: primaryColors.santaFe
    },
    btn: {
        width: 101,
        height: 27,
        marginTop: 66,
        borderRadius: 14
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
    button2: {
        // width: 22,
        height: 22,
        paddingLeft: 20
    },
    btnTitle: {
        fontSize: 13,
        fontFamily: fonts.regular
    },
    imgTitle: {
        textAlign: I18nManager.isRTL ? 'left' : 'right',
        marginRight: I18nManager.isRTL ? 0 : 20,
        marginLeft: I18nManager.isRTL ? 20 : 0,
        marginTop: 21,
        fontSize: 16,
        fontFamily: fonts.bold
    },
    imageTitle: {
        color: primaryColors.approxDoveGray,
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 20,
        marginTop: 21,
        fontFamily: fonts.bold
    },
    imageContent: {
        width: '100%',
        height: '100%',
    },
    card: {
        width: deviceWidth() * 0.905,
        marginTop: 11,
        borderWidth: 1,
        borderColor: primaryColors.approxGallery
    },
    row: {
        flexDirection: 'row',
        width: '91%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginTop: 28,
        // marginBottom: 15
    },
    button1: {
        width: '50%',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 12,
        borderBottomColor: primaryColors.silver
    },
    active: {
        borderBottomColor: primaryColors.santaFe
    },
    activityIndicator: {
        marginTop: '50%'
    }
})