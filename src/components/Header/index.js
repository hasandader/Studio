import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Image, ImageBackground, View } from 'react-native';
import styles from './Style';
import { header, header2, leftArrow } from '../../images/index';
import Text from '../Text/index';
import { isPlatformAndroid } from '../../lib/utility';
import { fonts } from '../../theme/fonts';

const Header = (props) => {
    const {
        title,
        style,
        titleStyle,
        headerLeft,
        headerRight,
        rightStyle,
        leftStyle,
    } = props;

    return (
        <View style={[styles.header, styles.shadow, style]}>
            {headerLeft || <View style={leftStyle} />}
            <Text children={title} size={18} fontFamily={fonts.bold} style={[styles.title, titleStyle]} />
            {headerRight || <View style={rightStyle} />}
        </View>
    )
}

Header.propTypes = {
    leftIcon: PropTypes.object,
    title: PropTypes.string,
    onBack: PropTypes.func,
    headerStyle: PropTypes.any
}

export default Header