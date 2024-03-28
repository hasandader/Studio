import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './style';

const Button = (props) => {
    const {
        onPress,
        title,
        style,
        titleStyle,
        disabled,
        activeOpacity,
        subChild,
        icon,
        iconTxtStyle
    } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonWraper, style]}
            disabled={disabled}
            activeOpacity={activeOpacity}
        >
            <View style={iconTxtStyle}>
                {icon}
                <Text style={[styles.buttonText, titleStyle]}>
                    {title}
                </Text>
            </View>
            {subChild}
        </TouchableOpacity>
    )
}

Button.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    style: PropTypes.any,
    titleStyle: PropTypes.any,
    disabled: PropTypes.bool,
    activeOpacity: PropTypes.number,
    subChild: PropTypes.any,
}

export default Button