/**
 * Created by desver_f on 25/03/17.
 */

import React from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import LoadingIndicator from 'react-native-spinkit';
import { observer } from 'mobx-react/native';

const AlertBar = observer(({ message, backgroundColor, loading }) => {
    const { width } = Dimensions.get('window');

    return (
        <View style={{
            width,
            backgroundColor,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
        }}>
            <StatusBar hidden={true} barStyle="light-content" />
            {
                loading && <LoadingIndicator size={12} color="#FAFAFA" type="Circle"/>
            }
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                    color: '#FAFAFA',
                    fontSize: 12,
                    marginLeft: loading ? 10 : 0,
                }}
            >
                { message }
            </Text>
        </View>
    );
});

AlertBar.propTypes = {
    message: React.PropTypes.string.isRequired,
    backgroundColor: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired,
};

const Layout = observer(({ store, children }) => {

    const { ui } = store;

    function getStatusBarColor() {

        switch (ui.currentState) {
            case ui.state.refreshingData:
                return '#56ab56';
            case ui.state.noInternet:
                return '#F44336';
            default:
                return '#FAFAFA';
        }
    }

    function getStatusBarTitle() {
        switch (ui.currentState) {
            case ui.state.refreshingData:
                return 'Your profile is being refreshed...';
            case ui.state.noInternet:
                return 'You\'re offline. Please enable your internet connection.';
            default:
                return '';
        }
    }

    function renderStatusBar() {
        if (!ui.shouldShowStatusBar) {
            return null;
        }

        return (
            <AlertBar
                message={getStatusBarTitle()}
                backgroundColor={getStatusBarColor()}
                loading={ui.currentState === ui.state.refreshingData}
            />
        );
    }

    return (
        <View style={styles.layoutContainer}>
            { renderStatusBar() }
            { children }
        </View>
    );
});

Layout.propTypes = {
    children: React.PropTypes.node,
    store: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    layoutContainer: {
        flex: 1,
    },
});

export default Layout;