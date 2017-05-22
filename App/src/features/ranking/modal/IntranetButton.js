/**
 * Created by jules on 20/05/2017.
 */

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking,
} from 'react-native';

const styles = StyleSheet.create({

    button: {
        height: 30,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#16212C',
        justifyContent: 'center',
        elevation: 1,
    },

    text: {
        color: '#FAFAFA',
        fontSize: 10,
        alignSelf: 'center',
    }

});

export class IntranetButton extends Component {

    constructor(props) {
        super(props);

        this._redirectIntranet = this._redirectIntranet.bind(this);
    }

    _redirectIntranet(student) {
        Linking.canOpenURL(this.props.autologin + '/user/' + student).then((supported) => {
            if (supported) {
                Linking.openURL(this.props.autologin + '/user/' + student);
            }
        });
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this._redirectIntranet(this.props.login)} style={styles.button}>
                <Text style={styles.text}>View full profile on Intranet</Text>
            </TouchableOpacity>
        );
    }
}

IntranetButton.propTypes = {
    login: PropTypes.string,
    autologin: PropTypes.string,
};