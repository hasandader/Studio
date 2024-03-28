import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Button from '../../components/Button/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import { deviceWidth, deviceHeight } from '../../lib/utility';
import { backBtn } from '../../images/index';
import CartItem from '../Cart/components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { categories } from '../../images/index';
import { fonts } from '../../theme/fonts';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

export default function CardInput(props) {

    return (
        <View style={styles.container1}>
            <Header
                title='الشراء'
                headerRight={
                    <TouchableOpacity style={styles.button} onPress={() => { props.navigation.navigate('Categories') }}>
                        <Image source={categories} style={{ width: 22, height: 22 }} />
                    </TouchableOpacity>
                }
                headerLeft={
                    <TouchableOpacity style={styles.backBtn} onPress={() => { props.navigation.pop() }}>
                        <Image source={backBtn} style={{ width: 22, height: 10 }} resizeMode='contain' />
                    </TouchableOpacity>
                }
                leftStyle={styles.button}
                style={styles.header}
            />

            <View style={{ marginTop: 25 }} />

            <CreditCardInput
                onChange={form => console.log(form)}
                allowScroll={true}
            />

            <View style={[styles.row, { marginTop: 60 }]}>
                <Text children='160.00 ر.س' fontFamily={fonts.regular} fontSize={17} color={primaryColors.tundora} />
                <Text children='السعر' fontFamily={fonts.regular} fontSize={17} color={primaryColors.approxGray} />
            </View>
            <View style={styles.row}>
                <Text children='5%' fontFamily={fonts.regular} fontSize={17} color={primaryColors.tundora} />
                <Text children='الخصم' fontFamily={fonts.regular} fontSize={17} color={primaryColors.approxGray} />
            </View>
            <View style={styles.divider} />
            <View style={[styles.row, { marginTop: 10, marginBottom: 18 }]}>
                <Text children='10.00 ر.س' fontFamily={fonts.regular} fontSize={17} color={primaryColors.tundora} />
                <Text children='الشحن' fontFamily={fonts.regular} fontSize={17} color={primaryColors.approxGray} />
            </View>
            <View style={styles.divider} />
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text children='162.00 ر.س' fontFamily={fonts.regular} fontSize={17} color={primaryColors.tundora} />
                <Text children='المجمل' fontFamily={fonts.regular} fontSize={17} color={primaryColors.tundora} />
            </View>

            <Button
                title='ادفع 162 ريال'
                titleStyle={styles.btnTxt}
                style={styles.buyBtn}
                onPress={() => { }}
            />

        </View>
    )
}