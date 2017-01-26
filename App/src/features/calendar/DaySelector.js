import React, { Component } from 'react';
import _ from 'lodash';
import {
    View,
    Animated,
    Easing,
    PanResponder,
    Dimensions,
    LayoutAnimation
} from 'react-native';
import moment from 'moment';
import { WEEK_DAYS } from './constants';
import Day from './Day';
import { observer } from 'mobx-react/native';

@observer
export default class DaySelector extends Component {

    constructor(props) {
        super(props);

        this.resetAnimation();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.animate = this.animate.bind(this);
        this.resetAnimation = this.resetAnimation.bind(this);
    }

    slide(dy) {
        this.refs.wrapper.setNativeProps({
            style: {
                top: dy,
            }
        })
    }

    componentWillMount() {
        // Hook the pan responder to interpretate gestures.
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > 5;
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > 5;
            },
            onPanResponderMove: (evt, gestureState) => {
                this.slide(gestureState.dy);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded

                const {height } = Dimensions.get('window');
                const threshold =  _.min([height / 3, 150]);
                const dy = gestureState.dy;

                if (Math.abs(dy) > threshold) {
                    // Animate to the outside of the device the current scene.
                    dy < 0 ? this.props.calendarStore.getNextWeek() : this.props.calendarStore.getPreviousWeek();
                    this.slide(0);
                } else {
                    // Otherwise cancel the animation.
                    LayoutAnimation.spring();
                    this.slide(0);
                }
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
                LayoutAnimation.spring();
                this.slide(0)
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },
        });
    }

    componentDidMount() {
        this.animate();
    }

    componentWillUpdate(nextProps) {
        const { calendarStore: prevCalendar } = this.props;
        const { calendarStore: nextCalendar } = nextProps;

        if (nextCalendar.selectedDate === prevCalendar.selectedDate) {
            this.resetAnimation();
            this.animate();
        }
    }

    resetAnimation() {
        this.animatedValue = [];
        WEEK_DAYS.forEach((value) => {
            this.animatedValue[value] = new Animated.Value(0);
        });
    }

    animate() {
        if (this.props.calendarAnimation) {
            const animations = WEEK_DAYS.map((item) => {
                return Animated.timing(
                    this.animatedValue[item],
                    {
                        toValue: 1,
                        duration: this.props.calendarAnimation.duration,
                        easing: Easing.inOut
                    }
                );
            });

            Animated.sequence(animations).start();
        }
    }

    render() {
        const { calendarStore: calendar, calendarAnimation } = this.props;

        let opacityAnim = 1;
        const datesRender = calendar.getDatesForWeek().map((date, index) => {
            if (calendarAnimation) {
                opacityAnim = this.animatedValue[index];
            }
            return (
                <Animated.View key={date} style={{opacity: opacityAnim}}>
                    <Day
                        key={date}
                        calendarStore={calendar}
                        date={date}
                        selected={calendar.isDateSelected(moment(date))}
                        calendarColor={this.props.calendarColor}
                        highlightColor={this.props.highlightColor}
                        dateNameStyle={this.props.dateNameStyle}
                        dateNumberStyle={this.props.dateNumberStyle}
                        weekendDateNameStyle={this.props.weekendDateNameStyle}
                        weekendDateNumberStyle={this.props.weekendDateNumberStyle}
                        selectionAnimation={this.props.selectionAnimation}
                    />
                </Animated.View>
            );
        });

        return (
            <View
                ref="wrapper" {...this._panResponder.panHandlers}
                style={{ flex: 1, justifyContent: 'space-around' }}
            >
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    {datesRender}
                </View>
            </View>
        );
    }
}

DaySelector.propTypes = {
    calendarStore: React.PropTypes.object,
    calendarAnimation: React.PropTypes.object,
    selectionAnimation: React.PropTypes.object,

    calendarColor: React.PropTypes.string,
    highlightColor: React.PropTypes.string,
    dateNameStyle: React.PropTypes.any,
    dateNumberStyle: React.PropTypes.any,
    weekendDateNameStyle: React.PropTypes.any,
    weekendDateNumberStyle: React.PropTypes.any,
};