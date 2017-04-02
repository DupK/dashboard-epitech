/**
 * Created by jules on 02/04/2017.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import IconSL from 'react-native-vector-icons/SimpleLineIcons';
import IconIO from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#233445',
    },

    iconContainerAndroid: {
        flex: 0.15,
        backgroundColor: '#233445',
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconContainerIos: {
        flex: 0.15,
        backgroundColor: '#233445',
        zIndex: 1,
        shadowColor: '#1b2636',
        shadowOffset: {
            width: 3,
            height: 0
        },
        shadowRadius: 0,
        shadowOpacity: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        color: '#FAFAFA',
    },

    touchableContainer: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#233445',
        borderBottomWidth: 0.2,
        borderBottomColor: 'rgba(255, 255, 255, 1)',
    },

    textContainer: {
        flex: 0.9,
        justifyContent: 'center',
        marginLeft: 15,
    },

    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FAFAFA',
    },

    description: {
        fontSize: 11,
        color: '#FAFAFA',
    },

    arrowContainer: {
        flex: 0.10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    arrow: {
        color: '#FAFAFA',
    },

});

class Cell extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={Platform.OS === 'ios' ? styles.iconContainerIos : styles.iconContainerAndroid}>
                    <IconIO name={this.props.icon} size={25} style={styles.icon}/>
                </View>
                <TouchableOpacity onPress={this.props.onPress} style={styles.touchableContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.description}>{this.props.description}</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <IconSL name="arrow-right" style={styles.arrow} size={8}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

Cell.propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    icon: React.PropTypes.string,
    onPress: React.PropTypes.func,
};

export default Cell;