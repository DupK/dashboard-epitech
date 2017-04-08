/**
 * Created by jules on 24/03/17.
 */

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react/native';
import {
    Text,
    View,
    Linking,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

@observer
class Link extends Component {

    constructor(props) {
        super(props);
        this._handleUrl = this._handleUrl.bind(this);
    }

    _handleUrl() {
        Linking.canOpenURL(this.props.url).then(supported => {
            if (supported) {
                Linking.openURL(this.props.url);
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._handleUrl}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.description}>{this.props.description}</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

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