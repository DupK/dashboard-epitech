/**
 * Created by jules on 25/03/17.
 */

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react/native';
import {
    StyleSheet, Platform, View
} from 'react-native';
import IconIO from 'react-native-vector-icons/Ionicons';

@observer
class Cell extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={Platform.OS === 'ios' ? styles.iconContainerIos : styles.iconContainerAndroid}>
                    <IconIO name={this.props.icon} size={25} style={styles.icon}/>
                </View>
                {this.props.children}
            </View>
        );
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#233445',
    },

    iconContainerAndroid: {
        flex: 0.20,
        backgroundColor: '#233445',
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconContainerIos: {
        flex: 0.20,
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

});

Cell.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
};

Cell.defaultProps = {
    icon : 'ios-git-branch',
    color: '#FFFFFF',
}

export default Cell;