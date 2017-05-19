/**
 * Created by desver_f on 20/05/17.
 */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { observer } from 'mobx-react/native';
import Layout from './Layout';

import store from '../../stores';

const ConnectionError = observer(({ onPress }) => {
    return (
        <Layout store={store}>
            <TouchableOpacity
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#2c3e50',
                }}
                activeOpacity={0.1}
                onPress={onPress}
            >
                <Icon
                    name="ios-trending-down"
                    size={100}
                    style={{ color: '#1b2937' }}
                />
                <Text style={{
                    marginTop: 10,
                    color: '#1b2937',
                    fontSize: 15,
                    textAlign: 'center',
                }}>
                    Your connection timed out.{'\n'}
                    Please click on the screen to retry.
                </Text>
            </TouchableOpacity>
        </Layout>
    );
});

ConnectionError.propTypes = {
    onPress: React.PropTypes.func,
};

export default ConnectionError;
