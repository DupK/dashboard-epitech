/**
 * Created by Utilisateur on 15/03/2017.
 */

import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { observer } from 'mobx-react/native';

const RegisterText = observer(({ children }) => {
    return (
        <Text style={styles.container}>
            { children }
        </Text>
    );
});

RegisterText.proTypes = {
    children: React.PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
    container: {
        fontSize: 14,
        color: '#FAFAFA',
    }
});

export default RegisterText;
