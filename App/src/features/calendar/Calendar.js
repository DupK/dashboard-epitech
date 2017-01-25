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
import { WEEK_DAYS, WORKING_HOURS, HOUR_SIZE } from './constants'
import DaySelector from './DaySelector';
import MonthSelector from './MonthSelector';
import Hour from './Hour';
import Event from './Event';

import * as Intra from '../../api/intra';


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

export default class Calendar extends Component {

    constructor(props) {
        super(props);

        this.getPreviousWeek = this.getPreviousWeek.bind(this);
        this.getNextWeek = this.getNextWeek.bind(this);
        this.getDatesForWeek = this.getDatesForWeek.bind(this);
        this.onDateSelected = this.onDateSelected.bind(this);
        this.isDateSelected = this.isDateSelected.bind(this);
        this.getPreviousMonth = this.getPreviousMonth.bind(this);
        this.getNextMonth = this.getNextMonth.bind(this);
    }

    async componentWillMount() {
        await this.fetchCalendar();
    }

    state = {
        calendar: null,
        selectedDate: moment(),
        startingDate: moment(),
    };

    groupByOverlappingRanges(ranges) {
        const endDatesValues = ranges.map((r) => moment(r.end).unix()).sort((a, b) => a - b);
        const datesRanges = ranges.sort((a, b) => moment(a.start).unix() - moment(b.start).unix());

        let i = 0, j = 0, n = datesRanges.length, active = 0;
        let groups = [], cur = [];
        while (true) {
            if (i < n && moment(datesRanges[i].start).unix() < endDatesValues[j]) {
                cur.push(datesRanges[i++]);
                ++active
            } else if (j < n) {
                ++j;
                if (--active == 0) {
                    groups.push(cur);
                    cur = []
                }
            } else break
        }
        return groups
    }

    async fetchCalendar() {
        const rawCalendar = await Intra.fetchCalendar();

        const remappedCalendar = _(rawCalendar)
            .filter((event) => event.start && event.module_registered === true)
            .map((event) => ({
                title: event.acti_title,
                type: event.type_title,
                module: event.titlemodule,
                start: event.start,
                end: event.end,
                room: event.room,
                duration: moment(event.end).diff(moment(event.start), 'minutes'),
                uid: event.codeevent,
            }))
            .groupBy((event) => moment(event.start, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY'))
            .toPairs()
            .map(([date, events]) => {
                const eventsGroupedByOverlappingTimes = this.groupByOverlappingRanges(events);

                return [
                    date,
                    eventsGroupedByOverlappingTimes
                ];
            })
            .fromPairs()
            .value();

        this.setState({ calendar: remappedCalendar });
    }

    renderEvents() {
        const { calendar, selectedDate } = this.state;
        const dayFormatted = moment(selectedDate).format('DD-MM-YYYY');

        if (!calendar) {
            return null;
        }

        return _.flatMap(calendar[dayFormatted], (events) => {
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

    renderHours() {
        return WORKING_HOURS.map((hour) => <Hour key={hour} hour={hour}/>)
    }

    //Set startingDate to the previous week
    getPreviousWeek() {
        this.setState({startingDate: this.state.startingDate.subtract(1, 'w')});
    }

    //Set startingDate to the next week
    getNextWeek() {
        this.setState({startingDate: this.state.startingDate.add(1, 'w')});
    }

    getPreviousMonth() {
        this.setState({startingDate: this.state.startingDate.subtract(1, 'M')});
    }

    getNextMonth() {
        this.setState({startingDate: this.state.startingDate.add(1, 'M')});
    }

    //Using isoWeekday so that it will start from Monday
    getDatesForWeek() {
        const startDate = moment(this.state.startingDate);

        return WEEK_DAYS.map((day, i) => moment(startDate.isoWeekday(i + 1)));
    }

    onDateSelected(date) {
        this.setState({selectedDate: moment(date)});
    }

    isDateSelected(date) {
        return date.isSame(this.state.selectedDate, 'day');
    }

    render() {

        if (!this.state.calendar) {
            return <Text>Loading calendar...</Text>;
        }

        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 7, backgroundColor: '#0062ce', elevation: 10 }}>
                        <MonthSelector
                            calendarHeaderFormat="MMMM YYYY"
                            startingDate={this.state.startingDate}
                            getDatesForWeek={this.getDatesForWeek}
                            getNextMonth={this.getNextMonth}
                            getPreviousMonth={this.getPreviousMonth}
                        />
                    </View>
                    <View style={{ flex: 100, flexDirection: 'row' }}>
                        <View style={{ flex: 0.2, backgroundColor: '#0062ce' }}>
                            <DaySelector
                                calendarAnimation={{duration: 30}}
                                selectionAnimation={{duration: 100}}
                                calendarColor={'#0062ce'}
                                highlightColor={'#0075dc'}
                                dateNumberStyle={{color: '#FFFFFF'}}
                                dateNameStyle={{color: '#FFFFFF'}}
                                startingDate={this.state.startingDate}
                                selectedDate={this.state.selectedDate}
                                getDatesForWeek={this.getDatesForWeek}
                                getNextWeek={this.getNextWeek}
                                getPreviousWeek={this.getPreviousWeek}
                                isDateSelected={this.isDateSelected}
                                onDateSelected={this.onDateSelected}
                            />
                        </View>
                        <ScrollView
                            style={{ flex: 1, backgroundColor: 'white', marginLeft: 5 }}
                        >
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