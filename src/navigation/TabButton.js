import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import styles from './Style';

const TabButton = (props) => {
    const {
        image,
    } = props;

    return (
        <View style={[styles.iconWraper, styles.shadow]}>
            <View style={[styles.buttonWraper, { width: '100%' }]}>
                {image}
            </View>
        </View>
    )
}

TabButton.propTypes = {
    image: PropTypes.any
}

export default TabButton