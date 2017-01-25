import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    Easing,
    TouchableOpacity
} from 'react-native';
import styles from './DaySelector.style';

export default class CalendarDay extends Component {

    constructor(props) {
        super(props);
        this.animValue = new Animated.Value(0);
    }

    componentDidMount() {
        if (this.props.selected) {
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

    render() {
        const animValue = this.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.props.calendarColor, this.props.highlightColor]
        });
        const animObject = {backgroundColor: animValue};


        let dateNameStyle = [styles.dateName, this.props.dateNameStyle];
        let dateNumberStyle = [styles.dateNumber, this.props.dateNumberStyle];
        if (this.props.date.isoWeekday() === 7) {
            dateNameStyle = [styles.weekendDateName, this.props.weekendDateNameStyle];
            dateNumberStyle = [styles.weekendDateNumber, this.props.weekendDateNumberStyle];
        }

        return (
            <Animated.View style={[styles.dateContainer, animObject]}>
                <TouchableOpacity onPress={this.props.onDateSelected.bind(this, this.props.date)}>
                    <Text style={dateNameStyle}>{this.props.date.format('ddd').toUpperCase()}</Text>
                    <Text style={dateNumberStyle}>{this.props.date.date()}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

CalendarDay.propTypes = {
    date: React.PropTypes.object.isRequired,
    onDateSelected: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool.isRequired,

    calendarColor: React.PropTypes.string,
    highlightColor: React.PropTypes.string,

    dateNameStyle: React.PropTypes.any,
    dateNumberStyle: React.PropTypes.any,
    weekendDateNameStyle: React.PropTypes.any,
    weekendDateNumberStyle: React.PropTypes.any,

    selection: React.PropTypes.string,
    selectionAnimation: React.PropTypes.object
};
