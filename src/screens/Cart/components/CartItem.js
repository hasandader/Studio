import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './Style';
import Text from '../../../components/Text/index';
import { cancel } from '../../../images/index';
import { fonts } from '../../../theme/fonts';
import { primaryColors } from '../../../theme/colors';

const CartItem = (props) => {

    const {
        itemImage,
        price,
        title,
        total,
        onIncrease,
        ondecrease,
        onDelete,
        brand,
        oldPrice,
        onPress,
        resizeMode
    } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={itemImage} style={styles.cartImage} resizeMode={resizeMode} />
            <View style={styles.subContainer}>
                <View style={styles.topRow}>
                    <TouchableOpacity style={styles.iconWraper} onPress={onDelete}>
                        <Image source={cancel} style={styles.icon} />
                    </TouchableOpacity>
                    <View style={styles.textWraper}>
                        <Text children={title} size={16} fontFamily={fonts.regular} color={primaryColors.tundora} />
                        <Text children={brand} size={16} fontFamily={fonts.regular} color={primaryColors.gray} />
                    </View>
                </View>
                <View style={styles.topRow}>
                    <View style={styles.controlBox}>
                        <TouchableOpacity style={styles.smallBtns} onPress={onIncrease}>
                            <Text children='+' fontFamily={fonts.regular} fontSize={25} color={primaryColors.scorpion}
                                lineHeight={20}
                            />
                        </TouchableOpacity>
                        <Text children={total} fontFamily={fonts.regular} fontSize={16} color={primaryColors.scorpion}
                            lineHeight={25}
                        />
                        <TouchableOpacity style={styles.smallBtns} onPress={ondecrease}>
                            <Text children='-' fontFamily={fonts.regular} fontSize={30} color={primaryColors.scorpion}
                                lineHeight={24}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textWraper}>
                        <Text children={oldPrice} size={14} fontFamily={fonts.light} color={primaryColors.gray}
                            textDecorationLine='line-through'
                        />
                        <Text children={price} size={16} fontFamily={fonts.regular} color={primaryColors.santaFe} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CartItem