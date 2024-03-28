import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './Style';
import Text from '../Text/index';
import { cancel } from '../../images/index';
import { fonts } from '../../theme/fonts';
import { primaryColors } from '../../theme/colors';
import Langs from '../../lib/Langs';

const RequestCard = (props) => {

    const {
        itemImage,
        price,
        title,
        onDelete,
        brand,
        requestStatus,
        onDetails,
        onPress,
        orderNO,
        orderDate
    } = props;

    return (
        <View style={styles.container} >
            <View style={styles.subContainer}>
                <View style={styles.infoWraper}>
                    <Text children={`${Langs.t('orderNumber')}: ${orderNO}`} size={16} fontFamily={fonts.regular} color={primaryColors.tundora} />
                    <Text children={`${Langs.t('orderDate')}: ${orderDate}`} size={16} fontFamily={fonts.regular} color={primaryColors.tundora} lineHeight={30} />
                    <Text children={price} size={16} fontFamily={fonts.regular} color={primaryColors.santaFe} lineHeight={25} />
                </View>
                <View style={styles.topRow}>
                    <TouchableOpacity onPress={onDetails} style={styles.detailsBtn}>
                        <Text children='التفاصيل'
                            fontFamily={fonts.regular} fontSize={14}
                            color={primaryColors.gray2}
                            textDecorationLine='underline' />
                    </TouchableOpacity>
                    <View style={styles.textWraper}>
                        <Text children={requestStatus} size={16} fontFamily={fonts.regular} color={primaryColors.santaFe}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RequestCard