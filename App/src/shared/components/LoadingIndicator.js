/**
 * Created by desver_f on 20/05/17.
 */

import React from 'react';
import Spinkit from 'react-native-spinkit';
import { StyleSheet, Text, View } from 'react-native';

const LoadingIndicator = ({ isVisible, message }) => {
    return (
        <View style={styles.loadingIndicator}>
            <Spinkit
                isVisible={isVisible}
                color="#FAFAFA"
                type="Bounce"
                size={100}
            />
            <Text style={styles.message}>
                { message }
            </Text>
        </View>
    );
};

LoadingIndicator.propTypes = {
    isVisible: React.PropTypes.bool,
    message: React.PropTypes.string,
};

const styles = StyleSheet.create({
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#233445',
    },
    message: {
        color: 'white',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center',
    },
});

export default LoadingIndicator;
