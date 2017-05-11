import React, { PropTypes as t } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-mobx';
import { observer } from 'mobx-react/native';
import moment from 'moment';

import { HOUR_SIZE, QUARTER_SIZE } from './constants';
import { wasRegistered } from './utils';

const Event = observer((props) => {
    const { event, nbRows, currentRow, uiStore, smallEvent } = props;
    const { width: screenWidth } = Dimensions.get('window');
    const startDate = moment(event.start);
    const start = startDate.hours() + (startDate.minutes() / 60);
    const eventWidth = (screenWidth * .75) / nbRows;
    const color = wasRegistered(event.registered) ? '#62c462' : '#B9B9B9';
    const eventTitleSize = smallEvent ? 8 : 10;
    const eventHourSize = smallEvent ? 7 : 8;

    return (
        <TouchableOpacity
            onPress={() => uiStore.isConnected && Actions.activity({ title: event.title, event })}
            style={{
                backgroundColor: color,
                position: 'absolute',
                height: (event.duration / 15) * QUARTER_SIZE,
                top: ((start * HOUR_SIZE) - (8 * HOUR_SIZE)),
                width: eventWidth,
                left: 25 + ((eventWidth + 1) * (currentRow - 1)),
                borderBottomWidth: 1,
                borderBottomColor: 'white',
            }}
        >
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={{ padding: 3, fontSize: eventTitleSize, color: 'white' }}>
                <Text style={{ fontWeight: 'bold' }}>{event.title}</Text>&nbsp;&nbsp;
                    <Text style={{ fontSize: eventHourSize }}>
                        {moment(event.start) .format('HH:mm')} - {moment(event.end) .format('HH:mm')}
                    </Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
});

Event.propTypes = {
    event: t.object.isRequired,
    currentRow: t.number.isRequired,
    nbRows: t.number.isRequired,
    uiStore: t.object.isRequired,
    smallEvent: t.bool.isRequired,
};

export default Event;