/**
 * Created by Utilisateur on 15/03/2017.
 */

import React from 'react';
import { View, StyleSheet, Platform } from "react-native";

import { observer } from 'mobx-react/native';

const RegisterBox = observer(({ children }) => {
    return (
        <View style={Platform.OS === 'ios' ? styles.containerIOS : styles.containerAndroid}>
            { children }
        </View>
    );
});

RegisterBox.proTypes = {
    children: React.PropTypes.node,
};

const styles = StyleSheet.create({
    containerAndroid: {
        flex: 0.3,
        margin: 10,
        marginBottom: 15,
        paddingLeft: 15,
        elevation: 3,
        backgroundColor: '#233445',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerIOS: {
        flex: 0.3,
        margin: 10,
        marginBottom: 15,
        paddingLeft: 15,
        backgroundColor: '#233445',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 1.5,
        shadowOpacity: 0.5,
    },
    textContainer: {
        fontSize: 14,
        color: '#FAFAFA',
    }
});

export default RegisterBox;


