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
    ScrollView,
    Dimensions
} from 'react-native';
import { Container, Content } from 'native-base';
import { observable } from 'react-native-mobx';
import { WORKING_HOURS, HOUR_SIZE } from './constants'
import DaySelector from './DaySelector';
import MonthSelector from './MonthSelector';
import Hour from './Hour';
import Event from './Event';

import { observer } from 'mobx-react/native';

const CurrentTime = () => {
    const { width } = Dimensions.get('window');
    const currentTime = moment();
    const numericTime = currentTime.hours() + (currentTime.minutes() / 60);
    const barColor = 'rgba(255, 0, 0, 0.3)';
    const sphereColor = 'rgb(255, 0, 0)';

    return (
        <View style={{ position: 'absolute', height: 5, top: ((numericTime * HOUR_SIZE) - (8 * HOUR_SIZE))}}>
            <View style={{
                position: 'relative',
                backgroundColor: barColor,
                height: 1,
                width: width,
                left: 20
            }}/>
            <View style={{
                position: 'relative',
                backgroundColor: sphereColor,
                height: 6,
                width: 6,
                left: 20,
                top: -3,
                borderRadius: 50
            }}/>
        </View>
    );
};

@observer
export default class Calendar extends Component {

    renderHours() {
        return WORKING_HOURS.map((hour) => <Hour key={hour} hour={hour}/>)
    }

    renderEvents() {
        const { store: { calendar } } = this.props;

        if (!calendar.calendar) {
            return null;
        }

        const dayFormatted = moment(calendar.selectedDate).format('DD-MM-YYYY');

        return _.flatMap(calendar.calendar[dayFormatted], (events) => {
            let nthEvent = 0;
            return _.map(events, (event) => {
                nthEvent++;
                return <Event
                    key={event.uid}
                    event={event}
                    nbEvents={events.length}
                    nthEvent={nthEvent}
                />;
            });
        });
    }

    render() {
        const { store: { calendar } } = this.props;

        if (!calendar.calendar) {
            return <Text>Loading calendar...</Text>;
        }

        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 7, backgroundColor: '#2c3e50', elevation: 10 }}>
                        <MonthSelector
                            calendarHeaderFormat="MMMM YYYY"
                            calendarStore={calendar}
                        />
                    </View>
                    <View style={{ flex: 100, flexDirection: 'row' }}>
                        <View style={{ flex: 0.2, backgroundColor: '#2c3e50' }}>
                            <DaySelector
                                calendarStore={calendar}
                                calendarAnimation={{ duration: 30 }}
                                selectionAnimation={{ duration: 100 }}
                                calendarColor={'#2c3e50'}
                                highlightColor={'#62c462'}
                                dateNumberStyle={{color: '#FFFFFF'}}
                                dateNameStyle={{color: '#FFFFFF'}}
                            />
                        </View>
                        <ScrollView style={{flex: 1, backgroundColor: 'white', marginLeft: 5 }}>
                            { this.renderHours() }
                            { this.renderEvents() }
                            <CurrentTime/>
                        </ScrollView>
                    </View>
                </Content>
            </Container>
        );
    }
}