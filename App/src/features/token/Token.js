/**
 * Created by jules on 12/02/17.
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

export default class Token extends Component {

    render() {

        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, backgroundColor: "#233445" }}>
                    <Text>Token here</Text>
                </Content>
            </Container>
        );
    }
};