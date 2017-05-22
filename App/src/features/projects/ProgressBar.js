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
        height: 8,
        borderRadius: 5,
        borderWidth: 0,
        borderColor: "#ffffff",
        marginBottom: 3
    },
});

const ProgressBar = ({
    progressColor,
    borderColor,
    backgroundColor,
    completePercentage,
    maxPercentage,
}) => {
    const incompletePercentage = Math.abs(maxPercentage - completePercentage);

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
    progressColor: "#62c462",
    backgroundColor: "rgba(35, 52, 69, 1)",
    borderColor: "#ffffff",
    completePercentage: 50,
    maxPercentage: 100,
};

export default ProgressBar;