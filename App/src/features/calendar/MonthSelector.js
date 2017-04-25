/**
 * Created by Utilisateur on 25/01/2017.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIO from 'react-native-vector-icons/Ionicons';
import IconEN from 'react-native-vector-icons/Entypo';
import DayPicker from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    selectorItems: {
        alignSelf: 'center',
    },
    selectorIcons: {
        color: '#FFFFFF',
    }
});

@observer
class MonthSelector extends Component {

    formatCalendarHeader() {
        const { calendarStore: calendar, calendarHeaderFormat } = this.props;
        const datesForWeek = calendar.datesForWeek;
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
        const isToday = calendar.isToday ? '#62c462' : '#FFFFFF';

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    style={styles.selectorItems}
                    title="today"
                    transparent
                    onPress={calendar.promptDatePicker}
                >
                    <IconFA style={styles.selectorIcons} name="calendar" size={20}/>
                </TouchableOpacity>
                <TouchableOpacity
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    style={styles.selectorItems}
                    title="previousMonth"
                    transparent
                    onPress={calendar.previousMonth}
                >
                    <IconIO size={24} style={styles.selectorIcons} name="ios-arrow-back"/>
                </TouchableOpacity>
                <Text style={styles.selectorIcons}>{ this.formatCalendarHeader() }</Text>
                <TouchableOpacity
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    style={styles.selectorItems}
                    title="nextMonth"
                    transparent
                    onPress={calendar.nextMonth}
                >
                    <IconIO size={24} style={styles.selectorIcons} name="ios-arrow-forward"/>
                </TouchableOpacity>
                <TouchableOpacity
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    style={styles.selectorItems}
                    title="today"
                    transparent
                    onPress={calendar.today}
                >
                    <IconEN style={{
                        color: isToday,
                    }} name="location" size={20}/>
                </TouchableOpacity>
                <DayPicker
                    isVisible={calendar.datePickerVisible}
                    onConfirm={calendar.pickDate}
                    onCancel={calendar.promptDatePicker}
                />
            </View>
        );
    }

}

MonthSelector.propTypes = {
    calendarStore: React.PropTypes.object,
    calendarHeaderFormat: React.PropTypes.string,
};

export default MonthSelector;