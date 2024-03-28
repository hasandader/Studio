import React, { Component } from 'react';
import { View, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { backBtn } from '../../images/index';
import styles from './Style';
import { WebView } from 'react-native-webview';
import { primaryColors } from '../../theme/colors';

export default function Policies(props) {

    const url = props.navigation.state.params && props.navigation.state.params.url

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ backgroundColor: 'white', height: 30 }} />
            <TouchableOpacity style={styles.back} onPress={() => props.navigation.pop()}>
                <Image source={backBtn} style={{ width: 22, height: 10 }} />
            </TouchableOpacity>
            <WebView source={{ uri: url }}
                onLoadStart={() => <View style={styles.activityIndicator}>
                    <ActivityIndicator size="large" color={primaryColors.gray} />
                </View>}
            />
        </View >
    )
}
