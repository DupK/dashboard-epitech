/**
 * Created by jules on 12/03/17.
 */

import React, { Component, PropTypes } from 'react';
//noinspection JSUnresolvedVariable
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({

    containerLeft: {
        marginTop: 10,
        marginLeft: 10,
        height: 150,
        flex: 0.5,
        backgroundColor: "#233445",
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 5,
    },

    containerRight: {
        margin: 10,
        marginLeft: 10,
        height: 150,
        flex: 0.5,
        backgroundColor: "#233445",
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0)',
        borderRadius: 5,
    },

    headerContainer: {
        height: 25,
        backgroundColor: "#16212C",
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
    },

    iconHeader: {
        color: '#62c462',
        fontSize: 6,
        marginLeft: 8,
    },

    textHeader: {
        color: '#FAFAFA',
        fontSize: 11,
        marginLeft: 5,
    },

    gaugeContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    textLegend: {
        fontFamily: 'Arial',
        color: '#FAFAFA',
        fontWeight: 'bold',
        fontSize: 10,
    }

});

class HalfCell extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.leftCell ? styles.containerLeft : styles.containerRight}>
                <View style={styles.headerContainer}>
                    <IconMC name={this.props.iconHeader} style={styles.iconHeader}/>
                    <Text style={styles.textHeader}>{this.props.titleHeader}</Text>
                </View>
                <View style={styles.gaugeContainer}>
                    {this.props.children}
                </View>
                <View style={styles.legendContainer}>
                    <Text style={styles.textLegend}>{this.props.dataLegend}</Text>
                </View>
            </View>
        )
    }
}

HalfCell.PropTypes = {
    iconHeader: PropTypes.string,
    titleHeader: PropTypes.string,
    dataLegend: PropTypes.number,
    leftCell: PropTypes.bool,
};

export default HalfCell;