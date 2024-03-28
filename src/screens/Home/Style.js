import { StyleSheet, I18nManager } from 'react-native';
import { primaryColors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { deviceHeight, deviceWidth, isArabic } from '../../lib/utility';

export default StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: primaryColors.white,
        flex: 1
    },
    header: {
        paddingRight: 18,
        paddingLeft: 18
    },
    searchInput: {
        backgroundColor: primaryColors.gallery,
        borderBottomWidth: 0,
        borderRadius: 9,
        width: deviceWidth() * 0.83,
        height: 36,
        paddingRight: 7,
        textAlign: 'right',
        marginRight: 10
    },
    searchIcon: {
        width: 15,
        height: 15,
        marginLeft: 9
    },
    inputTxt: {
        textAlign: 'right',
        justifyContent: 'center',
        paddingTop: 0,
    },
    topBar: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: deviceWidth() * 0.045,
        paddingBottom: 1
    },
    button: {
        width: 22,
        height: 22,
    },
    imageBtnWraper: {
        flexDirection: 'row-reverse',
        justifyContent: 'center'
    },
    imageContent: {
        width: '100%',
        height: '100%',
    },
    scrollView: {
        paddingTop: deviceWidth() * 0.022,
        paddingBottom: deviceHeight() * 0.11
    },
    btn: {
        width: 101,
        height: 27,
        marginTop: 66,
        borderRadius: 14
    },
    btnTitle: {
        fontSize: 13,
        fontFamily: fonts.regular
    },
    headerLine: {
        flexDirection: isArabic() ? 'row' : 'row-reverse',
        justifyContent: 'space-between',
        marginTop: deviceHeight() * 0.03,
        marginBottom: deviceHeight() * 0.018,
        paddingRight: 16,
        paddingLeft: 18
    },
    moreBtn: {
        paddingLeft: 10,
        paddingRight: 10
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
    imageTitleAr: {
        color: primaryColors.approxDoveGray,
        fontSize: 16,
        textAlign: isArabic() ? 'right' : 'left',
        marginRight: isArabic() ? 20 : 0,
        marginLeft: isArabic() ? 0 : 20,
        marginTop: 21,
        fontFamily: fonts.bold
    },
    slider: {
        paddingRight: isArabic() ? 0 : deviceWidth() * 0.05,
        paddingLeft: isArabic() ? deviceWidth() * 0.05 : 0
    },
    modalView: {
        backgroundColor: primaryColors.white,
        paddingTop: 17,
        borderRadius: 8,
        paddingBottom: 44
    },
    input: {
        borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: primaryColors.edward,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 25,
        paddingRight: 25,
        paddingLeft: 25,
        height: 45
    },
    modalBtn: {
        width: deviceWidth() * 0.77,
        backgroundColor: primaryColors.santaFe
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
})