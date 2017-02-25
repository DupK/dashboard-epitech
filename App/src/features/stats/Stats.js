/**
 * Created by jules on 15/02/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
//noinspection JSUnresolvedVariable
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {
    Container,
    Content,
} from 'native-base';
import styles from './style';

export default class Stats extends Component {

    render() {

        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, backgroundColor: "#233445" }}>
                    <Text>Stats here</Text>
                </Content>
            </Container>
        );
    }
};