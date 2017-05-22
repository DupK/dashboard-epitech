/**
 * Created by jules on 20/05/2017.
 */

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import IconIO from 'react-native-vector-icons/Ionicons';

const backDropHeight = (Dimensions.get('window').height / 5) - 10;
const styles = StyleSheet.create({

    container: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: backDropHeight,
    },

    text: {
        color: '#FAFAFA',
        fontSize: 12,
        alignSelf: 'center',
    },

    icon: {
        color: '#FAFAFA',
        alignSelf: 'center',
    }

});

export class BackDrop extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.props.message}
                </Text>
                <IconIO name="ios-arrow-down-outline" size={24} style={styles.icon}/>
            </View>
        );
    }
}

BackDrop.propTypes = {
    message: PropTypes.string,
};