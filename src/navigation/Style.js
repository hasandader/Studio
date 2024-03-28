import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../theme/colors';
import { fonts } from '../theme/fonts';

export default StyleSheet.create({
    iconWraper: {
        width: '100%',
        height: 42,
    },
    buttonWraper: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        width: '100%',
        height: '100%',
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.00,

    },
    activeLabel: {
        color: primaryColors.santaFe,
        fontFamily: fonts.regular,
        fontSize: 11,
        textAlign: 'center'
    }
})