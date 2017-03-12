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
import IconFA from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#16212C',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        elevation: 2,
    },

    icon: {
        color: '#62c462',
        fontSize: 12,
        marginLeft: 8,
    },

    text: {
        color: '#FAFAFA',
        fontSize: 11,
        margin: 5,
    }
});

class Header extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Animated.View style={styles.container}>
                <IconFA name={this.props.icon} style={styles.icon} />
                <Text style={styles.text}>
                    {this.props.title}
                </Text>
            </Animated.View>
        );
    }
}

Header.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
};

export default Header;