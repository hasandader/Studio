import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: primaryColors.white,
        flex: 1,
        // paddingBottom: deviceHeight() * 0.1,
    },
    header: {
        paddingRight: 18,
        paddingLeft: 18
    },
    button: {
        // width: 22,
        height: 22,
        paddingLeft: 20
    },
    backBtn: {
        // width: 22,
        height: '50%',
        justifyContent: 'center',
        paddingRight: 20,
        paddingTop: 10,
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
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: '20%',
    },
    productsList: {
        alignSelf: 'center',
        borderWidth: 0,
        paddingTop: 15,
        paddingBottom: deviceHeight() * 0.11
    },
})