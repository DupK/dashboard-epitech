import React, { Component, PropTypes as t } from 'react';
import { View, Text } from 'react-native';
import { QUARTER_SIZE } from './constants';

class Hour extends Component {
    render() {
        return (
            <View style={{ height: QUARTER_SIZE * 4 }}>
                <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#dbdbdb' }}>
                    <Text style={{ fontSize: 8, color: '#666666' }}>{this.props.hour}</Text>
                </View>
            </View>
        );
    }
}

Hour.propTypes = {
    hour: t.string
};

export default Hour;