/**
 * Created by desver_f on 16/02/17.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

class ProjectDetails extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Details</Text>
            </View>
        );
    }
}

ProjectDetails.propTypes = {
    project: React.PropTypes.object,
};
