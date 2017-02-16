import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PropTypes,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 100,
        flexDirection: 'row',
        height: 13,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ffffff",
        marginBottom: 3
    },
});

const ProgressBar = ({
    progressColor,
    borderColor,
    backgroundColor,
    completePercentage,
}) => {
    const incompletePercentage = Math.abs(100 - completePercentage);

    return (
        <View style={[styles.container, { backgroundColor: progressColor, borderColor }]}>
            <View style={[{ flex: completePercentage }]}/>
            <View style={[{
                flex: incompletePercentage,
                backgroundColor,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
            }]}/>
        </View>
    );
};

ProgressBar.propTypes = {
    progressColor: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    borderColor: React.PropTypes.string,
    completePercentage: React.PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
    progressColor: "#2c3e50",
    backgroundColor: "#597895",
    borderColor: "#ffffff",
    completePercentage: 50,
};

export default ProgressBar;