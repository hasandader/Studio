import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import styles from './Style';
import LinearGradient from 'react-native-linear-gradient';
import { gradient } from '../../images/index';

function Button(props) {
    const {
        onPress,
        title,
        image,
        style,
        titleStyle,
        imageStyle,
        disabled,
        activeOpacity = 0.7,
        subChild,
        imageWraper,
        gradients,
        resizeMode
    } = props;

    const withGradient = (children) => (
        <ImageBackground source={gradient} style={[styles.image, imageStyle]}>
            {children}
        </ImageBackground>
    )

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonWraper, style]}
            disabled={disabled}
            activeOpacity={activeOpacity}
        >
            <ImageBackground source={image} style={[styles.image, imageWraper]} resizeMode={resizeMode} >
                {
                    gradients ?
                        withGradient(
                            <>
                                <Text style={[styles.buttonText, titleStyle]}>
                                    {title}
                                </Text>
                                {subChild}
                            </>
                        )
                        :
                        <>
                            <Text style={[styles.buttonText, titleStyle]}>
                                {title}
                            </Text>
                            {subChild}
                        </>
                }
            </ImageBackground>
        </TouchableOpacity>
    )
}

Button.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    image: PropTypes.any,
    style: PropTypes.any,
    titleStyle: PropTypes.any,
    imageStyle: PropTypes.any,
    disabled: PropTypes.bool,
    activeOpacity: PropTypes.number,
    subChild: PropTypes.any,
}

export default Button