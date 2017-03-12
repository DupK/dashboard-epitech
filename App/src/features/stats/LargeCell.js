/**
 * Created by jules on 12/03/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component, PropTypes } from 'react';
//noinspection JSUnresolvedVariable
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#233445',
        height: 250,
        marginLeft: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 5,
    },

    headerContainer: {
        height: 25,
        backgroundColor: '#16212C',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
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
        alignSelf: 'center',
        justifyContent: 'center',
    }
});

class LargeCell extends Component {
    render() {
        return (
            <Animated.View style={styles.container}>
                <View style={styles.headerContainer}>
                    <IconMC name={this.props.iconHeader} style={styles.iconHeader}/>
                    <Text style={styles.textHeader}>{this.props.textHeader}</Text>
                </View>
                <View style={styles.childrenContainer}>
                    {this.props.children}
                </View>
            </Animated.View>
        );
    }
}

LargeCell.PropTypes = {
    iconHeader: PropTypes.string,
    textHeader: PropTypes.string,
    children: PropTypes.element.isRequired,
};

export default LargeCell;