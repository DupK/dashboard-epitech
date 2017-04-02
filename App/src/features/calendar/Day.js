import React, { Component } from 'react';
import moment from 'moment';
import {
    Text,
    Animated,
    Easing,
    TouchableOpacity
} from 'react-native';
import { observer } from 'mobx-react/native';
import styles from './DaySelector.style';

@observer
export default class Day extends Component {

    constructor(props) {
        super(props);
        this.animValue = new Animated.Value(0);
    }

    componentDidMount() {
        const { selected } = this.props;

        if (selected) {
            this.animate(1);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selected !== nextProps.selected) {
            nextProps.selected ? this.animate(1) : this.animate(0);
        }
    }

    animate(toValue) {
        Animated.timing(
            this.animValue,
            {
                toValue: toValue,
                duration: this.props.selectionAnimation.duration,
                easing: Easing.linear
            }
        ).start();
    }

    renderHasEvent() {
        if (!this.props.hasEvent) {
            return null;
        }

        return (
            <Animated.View
                style={{
                    backgroundColor: 'red',
                    height: 4,
                    width: 4,
                    top: 3,
                    borderRadius: 50,
                }}
            />
        );
    }

    render() {
        const { calendarStore: calendar, date, selected } = this.props;
        const animValue = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.props.calendarColor, this.props.highlightColor]
        });
        const animObject = {backgroundColor: animValue};
        const isToday = moment().isSame(date, 'day') && !selected;
        const dateNameColor = isToday ? { color: '#62c462' } : this.props.dateNameStyle;
        const dateNumberColor = isToday ? { color: '#62c462' } : this.props.dateNumberStyle;


        const dateNameStyle = [styles.dateName, dateNameColor];
        const dateNumberStyle = [styles.dateNumber, dateNumberColor];

        return (
            <Animated.View style={[styles.dateContainer, animObject]}>
                <TouchableOpacity onPress={() => calendar.onDateSelected(date)}>
                    <Text style={dateNameStyle}>{date.format('ddd').toUpperCase()}</Text>
                    <Text style={dateNumberStyle}>{date.date()}</Text>
                </TouchableOpacity>
                { this.renderHasEvent() }
            </Animated.View>
        );
    }
}

Day.propTypes = {
    calendarStore: React.PropTypes.object.isRequired,
    date: React.PropTypes.object.isRequired,
    selected: React.PropTypes.bool.isRequired,

    calendarColor: React.PropTypes.string,
    highlightColor: React.PropTypes.string,

    dateNameStyle: React.PropTypes.any,
    dateNumberStyle: React.PropTypes.any,
    weekendDateNameStyle: React.PropTypes.any,
    weekendDateNumberStyle: React.PropTypes.any,

    selectionAnimation: React.PropTypes.object,
    hasEvent: React.PropTypes.bool,
};
