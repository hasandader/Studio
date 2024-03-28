import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import Button from '../../components/Button/index';
import { at, messenger, help, about, categories, leftArrow, rightArrow, backBtn } from '../../images/index';
import { fonts } from '../../theme/fonts';
import Langs from '../../lib/Langs';
import { isArabic } from '../../lib/utility';

export default function CustomersService(props) {

    const arrow = isArabic() ? leftArrow : rightArrow

    return (
        <View style={styles.container}>
            <Header
                title={Langs.t('customersService')}
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
            <Button
                title={Langs.t('helpAndSupport')}
                titleStyle={styles.btnTitle}
                style={[styles.stateBtn, { marginTop: 60 }]}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={messenger} style={[{ width: 17, height: 18 }, styles.iconAlignment1]} resizeMode='contain' />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
                onPress={() => { }}
            />
            <View style={styles.divider} />
            <Button
                title={Langs.t('callUs')}
                titleStyle={styles.btnTitle}
                style={styles.stateBtn}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={help} style={[{ width: 17, height: 18 }, styles.iconAlignment1]} resizeMode='contain' />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
            />
            <View style={styles.divider} />
            <Button
                title={Langs.t('emailUs')}
                titleStyle={styles.btnTitle}
                style={[styles.stateBtn, styles.radius]}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={at} style={[{ width: 17, height: 22 }, styles.iconAlignment1]} />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
            />
        </View>
    )
}