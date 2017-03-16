/**
 * Created by Utilisateur on 15/03/2017.
 */

import React from 'react';
import { View, StyleSheet } from "react-native";

import { observer } from 'mobx-react/native';

const RegisterBox = observer(({ children }) => {
    return (
        <View style={styles.container}>
            { children }
        </View>
    );
});

RegisterBox.proTypes = {
    children: React.PropTypes.node,
};

const styles = StyleSheet.create({
    container: {
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
    textContainer: {
        fontSize: 14,
        color: '#FAFAFA',
    }
});

export default RegisterBox;


