/**
 * Created by jules on 20/05/2017.
 */

/**
 * Created by jules on 20/05/2017.
 */

import React, { Component, PropTypes } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

const gpaPosition = Dimensions.get('window').width / 8;
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
    },

    picture: {
        height: 40,
        width: 40,
        margin: 10,
        borderRadius: 20
    },

    textContainer: {
        flexDirection: 'column',
        alignSelf: 'center',
    },

    campus: {
        color: '#FAFAFA',
        fontSize: 10,
        fontStyle: 'italic',
    },

    login: {
        color: '#FAFAFA',
        fontSize: 10,
    },

    gpa: {
        alignSelf: 'center',
        marginLeft: gpaPosition,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#62c462',
    },

});

export class Resume extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Image source={{uri: this.props.student.picture}} style={styles.picture} />
                    <View style={styles.textContainer}>
                        <Text style={styles.campus}>
                            Promo {this.props.student.promo} / Campus of {this.props.student.groups[0].title}
                        </Text>
                        <Text style={styles.login}>
                            {this.props.student.login}
                        </Text>
                    </View>
                    <Text style={styles.gpa}>
                        {this.props.student.gpa[0].gpa}
                    </Text>
                </View>
                { this.props.children }
            </View>
        );
    }
}

Resume.propTypes = {
    student: PropTypes.object,
};