/**
 * Created by desver_f on 25/03/17.
 */

import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { observer } from 'mobx-react/native';

const AlertBar = observer(({ message, backgroundColor }) => {
    const { width } = Dimensions.get('window');

    return (
        <View style={{
            width,
            height: 22,
            backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
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
                return 'You\'re currently offline. Please enable your internet connection.';
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
                color="#FAFAFA"
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
    }
});

export default Layout;