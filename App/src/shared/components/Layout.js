/**
 * Created by desver_f on 25/03/17.
 */

import React from 'react';
import { Dimensions, StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
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
            <StatusBar
                hidden={true}
            />
            {
                loading && <LoadingIndicator size={16} color="#FFFFFF" type="Circle"/>
            }
            <Text
                style={{
                    color: '#FAFAFA',
                    fontSize: 13,
                    marginLeft: 10,
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

@observer
class Layout extends React.Component {

    getStatusBarColor() {
        const { store: { ui } } = this.props;

        switch (ui.currentState) {
            case ui.state.refreshingData:
                return '#62c462';
            case ui.state.noInternet:
                return '#F44336';
            default:
                return '#FAFAFA';
        }
    }

    getStatusBarTitle() {
        const { store: { ui } } = this.props;

        switch (ui.currentState) {
            case ui.state.refreshingData:
                return 'Your profile is being refreshed automatically...';
            case ui.state.noInternet:
                return 'You\'re offline. Please enable your internet connection.';
            default:
                return '';
        }
    }

    renderStatusBar() {
        const { store: { ui } } = this.props;

        if (!ui.shouldShowStatusBar) {
            return null;
        }

        return (
            <AlertBar
                message={this.getStatusBarTitle()}
                backgroundColor={this.getStatusBarColor()}
                loading={ui.currentState === ui.state.refreshingData}
            />
        );
    }

    render() {
        return (
            <View style={styles.layoutContainer}>
                { this.renderStatusBar() }
                { this.props.children }
            </View>
        );
    }
}

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