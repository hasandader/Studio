import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
        backgroundColor: primaryColors.white
    },
    cardContainer: {
        width: deviceWidth() * 0.37,
        height: deviceHeight() * 0.19,
        marginBottom: 24
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 6
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
    flatList: {
        width: '100%',
        height: '100%'
    },
    flatListContainer: {
        width: '100%',
        paddingLeft: 41,
        paddingRight: 42,
        paddingTop: 20,
        paddingBottom: deviceHeight() * 0.24
    },
    button: {
        width: 22,
        height: 22,
    },
    header: {
        paddingRight: 18,
        paddingLeft: 18
    },
    containerStyle: {
        marginLeft: 5.5,
        marginRight: 5.5
    },
    wishlist: {
        paddingTop: 15,
        alignSelf: 'center',
        width: '100%',
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: deviceHeight() * 0.11
    }
})