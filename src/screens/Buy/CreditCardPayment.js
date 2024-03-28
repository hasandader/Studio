import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { backBtn } from '../../images/index';
import styles from './Style';
import { WebView } from 'react-native-webview';

export default function CreditCardPayment(props) {

    const url = props.navigation.state.params && props.navigation.state.params.url

    return (
        <>
            <View style={{ backgroundColor: 'white', height: 30 }} />
            <WebView
                source={{
                    html: `<style>
.buttons{
    display:flex;
    height:100%;
    width:100%;
}
.right{
    width:100%;
    display: flex;
  justify-content: center;
}
.buttons input{
    padding: 3px 15px;
    background-color: #8b4c40fa;
    margin-top: 50;
    border:none;
    width:50%;
    min-height:5rem;
    border-radius: 6px;
    text-align: center;
    color: #fff;
    font-size: 30px;
}
</style>`+ " " + `${url}`
                }}
                style={{ marginTop: 20 }}
            />
        </ >
    )
}
