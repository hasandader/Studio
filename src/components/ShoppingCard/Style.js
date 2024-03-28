import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts, secondaryFonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth, isArabic } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        width: deviceWidth() * 0.44
    },
    button: {
        width: deviceWidth() * 0.44,
        height: deviceHeight() * 0.25,
        borderRadius: 10,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    addBtn: {
        backgroundColor: primaryColors.santaFe,
        width: 20,
        height: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        marginLeft: 8,
    },
    cartBtn: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        marginLeft: 8,
    },
    icon: {
        width: '55%',
        height: '55%',
    },
    icon2: {
        width: '100%',
        height: '100%',
    },
    txtAlign: {
        marginRight: isArabic() ? 0 : 8,
        marginLeft: isArabic() ? 8 : 0,
        textAlign: 'left'
    }
});
