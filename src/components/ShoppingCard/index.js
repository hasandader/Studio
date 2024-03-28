import React from 'react';
import { View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Style';
import { deviceHeight, deviceWidth } from '../../lib/utility';
import { primaryColors } from '../../theme/colors';
import Text from '../Text/index';
import { fonts } from '../../theme/fonts';

const ShoppingCard = (props) => {
    const {
        onPress,
        image,
        onAdd,
        onAddToWishlist,
        firstIcon,
        secondIcon,
        price,
        title,
        containerStyle,
        imageStyle,
        resizeMode,
        buttonStyle,
        likeStyle,
        addStyle
    } = props;

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
                <ImageBackground source={image} style={[styles.imageBackground, imageStyle]} resizeMode={resizeMode}>
                    <TouchableOpacity style={[styles.cartBtn, likeStyle]} onPress={onAddToWishlist}>
                        <Image source={secondIcon} style={styles.icon2} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.addBtn, addStyle]} onPress={onAdd}>
                        <Image source={firstIcon} style={styles.icon} />
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
            <Text children={price} fontSize={15} fontFamily={fonts.regular}
                color={primaryColors.santaFe} style={styles.txtAlign} />
            <Text children={title} fontSize={15} fontFamily={fonts.regular}
                color={primaryColors.shark} style={styles.txtAlign} />
        </View>
    )
}

export default ShoppingCard