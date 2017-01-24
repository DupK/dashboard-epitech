/**
 * Created by desver_f on 23/01/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
} from 'react-native';
import { observer } from 'mobx-react/native';

@observer
class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //const { store } = this.props;

        return (
            <View>
                <Text>Welcome home, bitch.</Text>
            </View>
        );
    }
}

export default Home;