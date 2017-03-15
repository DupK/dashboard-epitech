import React, { Component, PropTypes as t } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-mobx';

import { QUARTER_SIZE, HOUR_SIZE } from './constants';
import { wasRegistered } from './utils';

class Event extends Component {
    render() {
        const { event, nbEvents, nthEvent } = this.props;
        const { width: screenWidth } = Dimensions.get('window');
        const startDate = moment(event.start);
        const start = startDate.hours() + (startDate.minutes() / 60);
        const eventWidth = (screenWidth * .7) / nbEvents;
        const color = wasRegistered(event.registered) ? '#62c462' : '#B9B9B9';

        return (
            <TouchableOpacity
                onPress={() => Actions.activity({ title: event.title, event })}
                style={{
                    backgroundColor: color,
                    position: 'absolute',
                    height: (event.duration / 15) * QUARTER_SIZE,
                    top: ((start * HOUR_SIZE) - (8 * HOUR_SIZE)),
                    width: eventWidth,
                    left: 30 + ((eventWidth + 1) * (nthEvent - 1)),
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                }}
            >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ padding: 3, fontSize: 10, color: 'white' }}>
                        <Text style={{ fontWeight: 'bold' }}>{event.title}</Text>&nbsp;&nbsp;
                        <Text style={{ fontSize: 8 }}>{moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}</Text>
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

Event.propTypes = {
    event: t.object,
    nthEvent: t.number,
    nbEvents: t.number,
};

export default Event;