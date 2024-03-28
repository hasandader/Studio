import React, { useCallback, useEffect, useState } from 'react';
import { View, Linking, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import styles from './Style';
import Text from '../../components/Text/index';
import Header from '../../components/Header/index';
import { primaryColors } from '../../theme/colors';
import Button from '../../components/Button/index';
import { at, twitter, help, about, categories, leftArrow, rightArrow, backBtn, refund, insurance, instagram } from '../../images/index';
import { fonts } from '../../theme/fonts';
import Langs from '../../lib/Langs';
import { isArabic } from '../../lib/utility';

export default function MyAccount(props) {

    const arrow = isArabic() ? leftArrow : rightArrow;

    return (
        <View style={styles.container}>
            <Header
                title={Langs.t('myAccount')}
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
            {/* <Button
                title={Langs.t('helpCenter')}
                titleStyle={styles.btnTitle}
                style={[styles.stateBtn, { marginTop: 15 }]}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={about} style={[{ width: 18, height: 18 }, styles.iconAlignment1]} />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
                onPress={() => { }}
            />
            <View style={styles.divider} />
            <Button
                title={Langs.t('termsAndConditions')}
                titleStyle={styles.btnTitle}
                style={styles.stateBtn}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={about} style={[{ width: 18, height: 18 }, styles.iconAlignment1]} />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
            />
            <View style={styles.divider} /> */}
            <Button
                title={Langs.t('refundAndReturn')}
                titleStyle={styles.btnTitle}
                style={[styles.stateBtn, styles.radius, { marginTop: 15 }]}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={refund} style={[{ width: 20, height: 19 }, styles.iconAlignment4]} />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
                onPress={() => {
                    props.navigation.navigate('Policies', {
                        url: 'https://www.gheeed.com/return-policy'
                    })
                }}
            />
            <View style={styles.divider} />
            <Button
                title={Langs.t('privacyPolicy')}
                titleStyle={styles.btnTitle}
                style={[styles.stateBtn]}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={insurance} style={[{ width: 16, height: 21 }, styles.iconAlignment1]} />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
                onPress={() => {
                    props.navigation.navigate('Policies', {
                        url: 'https://www.gheeed.com/privacy'
                    })
                }}
            />
            <View style={styles.divider} />
            <Button
                title={Langs.t('instagram')}
                titleStyle={styles.btnTitle}
                style={styles.stateBtn}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={instagram} style={[{ width: 19, height: 19 }, styles.iconAlignment4]} />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
                onPress={() => {
                    Linking.openURL('https://www.instagram.com/gheeed.sa/?igshid=gxnhp2gci6ox')
                        .catch(err => {
                            console.error("Failed opening page because: ", err)
                        })
                }}
            />
            <View style={styles.divider} />
            <Button
                title={Langs.t('twitter')}
                titleStyle={styles.btnTitle}
                style={[styles.stateBtn, styles.radius]}
                iconTxtStyle={styles.iconTxtStyle}
                icon={
                    <Image source={twitter} style={[{ width: 21, height: 17 }, styles.iconAlignment5]} />
                }
                subChild={
                    <Image source={arrow} style={[{ width: 24, height: 15 }, styles.iconAlignment2]} resizeMode='contain' />
                }
                onPress={() => {
                    Linking.openURL('https://twitter.com/gheeed_sa?s=11')
                        .catch(err => {
                            console.error("Failed opening page because: ", err)
                        })
                }}
            />
        </View>
    )
}