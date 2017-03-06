/**
 * Created by desver_f on 06/03/17.
 */
/**
 * Created by desver_f on 06/03/17.
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

const LogoBox = ({ source }) => {
    return (
        <View style={{
            flex: 50,
            alignItems: 'center',
            zIndex: 0,
        }}>
            <Image source={source}
                   style={{
                       width: 60,
                       height: 60,
                   }}
            />
            <Text style={{
                color: '#FFFFFF',
                marginTop: 10,
            }}>
                <Text>Dashboard&nbsp;</Text>
                <Text style={{ fontWeight: 'bold' }}>Epitech</Text>
            </Text>
        </View>
    );
};

LogoBox.propTypes = {
    source: React.PropTypes.any.isRequired,
};

export default LogoBox;
