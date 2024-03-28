import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth, isArabic } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: deviceHeight() * 0.18,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1.5,
        paddingRight: deviceWidth() * 0.06,
        paddingLeft: deviceWidth() * 0.05,
        borderColor: primaryColors.gallery
    },
    cartImage: {
        width: deviceWidth() * 0.31,
        height: deviceHeight() * 0.145,
        // marginLeft: 14,
        marginRight: 14
    },
    subContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: deviceHeight() * 0.02,
        paddingBottom: deviceHeight() * 0.02
    },
    topRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    iconWraper: {
        alignSelf: 'flex-start',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10
    },
    icon: {
        width: 13,
        height: 14
    },
    textWraper: {
        alignItems: 'flex-start',
    },
    infoWraper: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },
    controlBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'flex-start',
        width: deviceWidth() * 0.19,
        height: 32,
        borderWidth: 1,
        borderColor: primaryColors.mercury,
        marginTop: deviceHeight() * 0.02,
        borderRadius: 4
    },
    smallBtns: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsBtn: {
        paddingRight: 10,
        paddingLeft: 10,
    }
})