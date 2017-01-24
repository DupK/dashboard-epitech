/**
 * Created by desver_f on 24/01/17.
 */
import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
} from 'react-native';
import {
    Container,
    Content,
} from 'native-base';
import { observable } from 'react-native-mobx';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import * as Intra from '../../api/intra';

// 96 x 15min in one day

export default class Calendar extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        calendar: null,
    };

    async fetchCalendar() {
        console.log('fetch calendar');
        const rawCalendar = await Intra.fetchCalendar();
        const myActivities = _(rawCalendar)
            .filter((event) => event.module_registered === true)
            .value();
        //.orderBy((event) => moment(event.))

        console.log(myActivities);
    }

    render() {

        this.fetchCalendar();

        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.2, backgroundColor: 'red' }}>

                    </View>
                    <View style={{ flex: 0.7, backgroundColor: 'green' }}>

                    </View>
                </Content>
            </Container>
        );
    }
}