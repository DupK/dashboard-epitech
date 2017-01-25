/**
 * Created by desver_f on 24/01/17.
 */
import React, { Component, PropTypes as t } from 'react';
import _ from 'lodash';
import moment from 'moment';
import randomColor from 'randomcolor';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    ScrollView,
    Dimensions
} from 'react-native';
import {
    Container,
    Content,
} from 'native-base';
import { observable } from 'react-native-mobx';
import * as Intra from '../../api/intra';

const WORKING_HOURS = _.range(9, 24);
const QUARTER_SIZE = 10;
const HOUR_SIZE = QUARTER_SIZE * 4;

class Hour extends Component {
    render() {
        return (
            <View style={{ height: QUARTER_SIZE * 4 }}>
                <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#dbdbdb' }}>
                    <Text style={{ fontSize: 8, color: '#666666' }}>{this.props.hour} AM</Text>
                </View>
            </View>
        );
    }
}

Hour.propTypes = {
    hour: t.number
};

class Event extends Component {
    render() {
        const { width: screenWidth } = Dimensions.get('window');
        const startDate = moment(this.props.event.start);
        const start = startDate.hours() + (startDate.minutes() / 60) + (startDate.seconds() / 60);
        const eventWidth = (screenWidth * .7) / this.props.nbEvents;

        const eventColor = randomColor({
            hue: 'blue',
            luminosity: 'light',
            alpha: 1,
        });

        return (
            <View style={{
                backgroundColor: eventColor,
                position: 'absolute',
                height: (this.props.event.duration / 15) * QUARTER_SIZE,
                top: ((start * HOUR_SIZE) - (8 * HOUR_SIZE)),
                width: eventWidth,
                left: 30 + ((eventWidth + 1) * (this.props.nthEvent - 1)),
            }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ padding: 3, fontSize: 10, color: 'white' }}>{this.props.event.title} - {moment.duration(this.props.event.duration, 'minutes').humanize()}</Text>
                </View>
            </View>
        );
    }
}

Event.propTypes = {
    event: t.object,
    nthEvent: t.number,
    nbEvents: t.number,
};

export default class Calendar extends Component {

    constructor(props) {
        super(props);

        this.fetchCalendar();
    }

    state = {
        calendar: null,
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

        this.fullCalendar = remappedCalendar;
        this.setState({ calendar: remappedCalendar });
    }

    renderEvents() {
        const { calendar } = this.state;

        if (!calendar) {
            return null;
        }

        return _.flatMap(calendar['07-02-2017'], (events) => {
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

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.2, backgroundColor: 'red' }}/>
                    <ScrollView
                        style={{ flex: 1, backgroundColor: 'white', marginLeft: 5 }}
                    >
                        { this.renderHours() }
                        { this.renderEvents() }
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}