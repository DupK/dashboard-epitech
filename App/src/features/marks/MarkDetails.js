/**
 * Created by jules on 09/02/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Container,
    Content,
    List,
} from 'native-base';

const styles = StyleSheet.create({

    listContainerStyle: {
        flex: 0.6,
    },

    scoringContainerStyle: {
        backgroundColor: '#39516a',
        flex: 0.4,
    },

    itemStyle: {
        flex: 0.95,
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        fontSize: 13,
    },

    markStyle: {
        flex: 0.05,
        color: '#FFFFFF',
    },

    itemContainerStyle: {
        flexDirection: 'row',
    },

    container: {
        flexDirection: 'row',
        margin: 5,
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },

    name: {
        flex: 0.95,
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        alignSelf: 'center',
    },

    mark: {
        flex: 0.05,
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        alignSelf: 'center',
    },

});

const MarkDetails = ({ mark }) => {

    const items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can', 'Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];

    return (
        <Container>
            <Content contentContainerStyle={{flex:1, backgroundColor: '#2c3e50'}}>

                <View style={styles.listContainerStyle}>

                    <List dataArray={items} renderRow={(data) =>
                        <TouchableOpacity>
                            <View style={styles.container}>
                                <Text style={styles.name}>{data}</Text>
                                <Text style={styles.mark}>12</Text>
                            </View>
                        </TouchableOpacity>
                    } />

                </View>


                <View style={styles.scoringContainerStyle}>

                </View>

            </Content>
        </Container>
    );
};

MarkDetails.propTypes = {
    mark: React.PropTypes.object,
};
MarkDetails.defaultPropos = { mark : null};

export default MarkDetails;