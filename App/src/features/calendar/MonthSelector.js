/**
 * Created by Utilisateur on 25/01/2017.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'native-base';
import { observer } from 'mobx-react/native';

@observer
class MonthSelector extends Component {

    formatCalendarHeader() {
        const { calendarStore: calendar, calendarHeaderFormat } = this.props;
        const datesForWeek = calendar.getDatesForWeek();
        const firstDay = _.first(datesForWeek);
        const lastDay = _.last(datesForWeek);
        const monthFormatting = 'MMMM';

        if (firstDay.month() === lastDay.month()) {
            return firstDay.format(calendarHeaderFormat);
        }
        if (firstDay.year() !== lastDay.year()) {
            return `${firstDay.format(calendarHeaderFormat)} / ${lastDay.format(calendarHeaderFormat)}`;
        }

        return `${monthFormatting.length > 1 ? firstDay.format(monthFormatting) : ''} ${monthFormatting.length > 1 ? '/' : ''} ${lastDay.format(calendarHeaderFormat)}`;
    };


    render() {
        const { calendarStore: calendar } = this.props;

        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Button title="previousMonth" transparent onPress={calendar.getPreviousMonth}>
                    <Icon style={{ color: 'white' }} name="ios-arrow-back"/>
                </Button>
                <Text style={{ color: 'white' }}>{ this.formatCalendarHeader() }</Text>
                <Button title="nextMonth" transparent onPress={calendar.getNextMonth}>
                    <Icon style={{ color: 'white' }} name="ios-arrow-forward"/>
                </Button>
            </View>
        );
    }

}

MonthSelector.propTypes = {
    calendarStore: React.PropTypes.object,
    calendarHeaderFormat: React.PropTypes.string,
};

export default MonthSelector;