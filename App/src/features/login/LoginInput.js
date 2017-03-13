/**
 * Created by desver_f on 06/03/17.
 */
/**
 * Created by desver_f on 06/03/17.
 */
/**
 * Created by desver_f on 06/03/17.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput
} from 'react-native';

class LoginInput extends Component {

    render() {
        return (
            <TextInput
                { ...this.props }
                ref={(input) => this.nativeInput = input}
                style={[styles.input, this.props.style]}
                placeholderTextColor="rgba(255, 255, 255, 1)"
                underlineColorAndroid="transparent"
                multiline={false}
                spellCheck={false}
            />
        );
    }
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0)',
        color: '#FFF',
        borderRadius: 5,
        marginLeft: 30,
        marginRight: 30,
        fontSize: 11,
        textAlign: 'center',
        height: 35,
        marginBottom: 5,
    }
});

export default LoginInput;
