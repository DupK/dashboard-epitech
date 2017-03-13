/**
 * Created by jules on 12/03/17.
 */

import React, { Component, PropTypes } from 'react';
//noinspection JSUnresolvedVariable
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#233445',
        height: 150,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 5,
    },

    headerContainer: {
        height: 25,
        backgroundColor: '#16212C',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 0,
    },

    iconHeader: {
        color: '#62c462',
        fontSize: 6,
        marginLeft: 8,
    },

    textHeader: {
        color: '#FAFAFA',
        fontSize: 11,
        marginLeft: 5,
    },

    childrenContainer: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        marginTop: 1,
    },
});

class Cell extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <IconMC name={this.props.iconHeader} style={styles.iconHeader}/>
                    <Text style={styles.textHeader}>{this.props.textHeader}</Text>
                </View>
                <View style={styles.childrenContainer}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

Cell.propTypes = {
    iconHeader: PropTypes.string,
    textHeader: PropTypes.string,
};

export default Cell;