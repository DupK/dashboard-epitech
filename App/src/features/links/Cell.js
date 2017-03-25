/**
 * Created by jules on 25/03/17.
 */

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react/native';
import {
    StyleSheet,
} from 'react-native';
import { Col, Row } from "react-native-easy-grid";
import IconIO from 'react-native-vector-icons/Ionicons';

@observer
class Cell extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col size={0.5} style={styles.iconCol}>
                    <IconIO name={this.props.icon} size={30} style={styles.icon}/>
                </Col>
                <Col size={3} style={styles.childrenCol}>
                    {this.props.children}
                </Col>
            </Row>
        );
    }
};

const styles = StyleSheet.create({

    iconCol : {
        backgroundColor: '#233445',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0,
        borderBottomColor: 'rgba(255, 255, 255, 1)',
        elevation: 15
    },

    icon: {
        color: 'rgba(255, 255, 255, 0.1)'
    },

    childrenCol: {
        backgroundColor: '#233445',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },

});

Cell.propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
};

Cell.defaultProps = {
    icon : 'ios-git-branch',
    color: '#FFFFFF',
}

export default Cell;