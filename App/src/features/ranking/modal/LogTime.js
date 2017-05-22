/**
 * Created by jules on 20/05/2017.
 */

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ProgressBar from "../../projects/ProgressBar";

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        marginLeft: 10,
        marginRight: 10,
    },

    errorText: {
        fontWeight: 'bold',
        fontSize: 10,
        color: '#DA5040',
    },

    legend: {
        color: '#FAFAFA',
        fontSize: 10,
        marginLeft: 10,
        marginBottom: 5,
    }

});

export class LogTime extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.student.nsstat ?
                        <View style={{ height: 30 }}>
                            <Text style={styles.legend}>
                                Presence time on campus ({this.props.student.nsstat.active} hours over {this.props.student.nsstat.nslog_norm} hours)
                            </Text>
                            <ProgressBar
                                completePercentage={
                                    this.props.student.nsstat.active >= this.props.student.nsstat.nslog_norm ?
                                        this.props.student.nsstat.nslog_norm :
                                        this.props.student.nsstat.active
                                }
                                maxPercentage={this.props.student.nsstat.nslog_norm}
                                backgroundColor="#16212C"
                            />
                        </View>
                        :
                        <Text style={styles.errorText}>
                            No recent Log available
                        </Text>
                }
            </View>
        );
    }
}

LogTime.propTypes = {
    student: PropTypes.object,
};