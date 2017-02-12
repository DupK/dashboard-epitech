/**
 * Created by jules on 09/02/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
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
import styles from './styles.js';

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