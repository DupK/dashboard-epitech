/**
 * Created by desver_f on 24/01/17.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';
import LoadingIndicator from 'react-native-spinkit';
import { observable } from 'react-native-mobx';
import { WORKING_HOURS, HOUR_SIZE } from './constants'
import DaySelector from './DaySelector';
import MonthSelector from './MonthSelector';
import Hour from './Hour';
import Event from './Event';
import styles from './styles';

import { observer } from 'mobx-react/native';

const CurrentTime = observer(({ isToday }) => {

    if (!isToday) {
        return null;
    }

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
});

CurrentTime.propTypes = {
    isToday: React.PropTypes.bool,
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

    renderCalendar() {
        const { store: { calendar, ui } } = this.props;

        if (ui.currentState === ui.state.fetching) {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    marginLeft: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <LoadingIndicator
                        isVisible={ui.currentState === ui.state.fetching}
                        color="#2c3e50"
                        type="9CubeGrid"
                        size={100}
                    />
                    <Text style={{
                        fontSize: 14,
                        color: "#2c3e50",
                        margin: 15,
                    }}>Loading calendar...</Text>
                </View>
            );
        }

        return (
            <ScrollView style={{flex: 1, backgroundColor: 'white', marginLeft: 5 }}>
                { this.renderHours() }
                { this.renderEvents() }
                <CurrentTime isToday={calendar.isToday}/>
            </ScrollView>
        );
    }

    render() {
        const { store: { calendar } } = this.props;

        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 100, flexDirection: 'row' }}>
                    <View style={{ flex: 0.2, backgroundColor: '#233445' }}>
                        <DaySelector
                            calendarStore={calendar}
                            calendarAnimation={{ duration: 30 }}
                            selectionAnimation={{ duration: 100 }}
                            calendarColor={'#233445'}
                            highlightColor={'#62c462'}
                            dateNumberStyle={{color: '#FFFFFF'}}
                            dateNameStyle={{color: '#FFFFFF'}}
                        />
                    </View>
                    { this.renderCalendar() }
                </View>
                <View style={Platform.OS === 'ios' ? styles.monthSelectorIOS : styles.monthSelectorAndroid}>
                    <MonthSelector
                        calendarHeaderFormat="MMMM YYYY"
                        calendarStore={calendar}
                    />
                </View>
            </View>
        );
    }
}