import { StyleSheet, I18nManager } from 'react-native';
import { deviceHeight, deviceWidth, isPlatformIos } from '../../lib/utility';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default StyleSheet.create({
    header: {
        width: deviceWidth(),
        height: deviceHeight() * 0.1,
        alignItems: 'flex-end',
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
        backgroundColor: primaryColors.white,
        paddingBottom: deviceHeight() * 0.02,
        marginBottom: 1
    },
    title: {
        lineHeight: 24
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
});