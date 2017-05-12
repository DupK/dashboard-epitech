/**
 * Created by jules on 24/03/17.
 */

import React, { PropTypes } from 'react';
import { observer } from 'mobx-react/native';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Link = observer((props) => {

    const _handleUrl = () => {
        Linking.canOpenURL(props.url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(props.url);
                }
            });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={_handleUrl}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.description}>{props.description}</Text>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)"
    },

    title: {
        fontWeight: 'bold',
        color: '#FAFAFA',
        fontSize: 13,
    },

    description: {
        color: '#FAFAFA',
        fontSize: 11,
    },

});

Link.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
};

export default Link;