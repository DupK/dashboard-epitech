/**
 * Created by jules on 20/05/2017.
 */

/**
 * Created by jules on 20/05/2017.
 */

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        height: 30,
        backgroundColor: '#16212C',
        elevation: 3,
    },

    icon: {
        color: '#62c462',
        marginLeft: 10,
        marginRight: 10,
        alignSelf: 'center'
    },

    text: {
        color: '#FAFAFA',
        fontSize: 11,
        alignSelf: 'center'
    }

});

export class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <IconMC name='brightness-1' size={9} style={styles.icon}/>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

Header.propTypes = {
    text: PropTypes.string,
};