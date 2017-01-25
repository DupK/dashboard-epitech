
import React, {Component} from 'react';
import _ from 'lodash';
import {
    Text,
    View,
    Image,
    Animated,
    Easing,
    TouchableOpacity,
    PanResponder,
    Dimensions,
    LayoutAnimation
} from 'react-native';
import moment from 'moment';
import { WEEK_DAYS } from './constants';
import CalendarDay from './Day';

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
                    dy < 0 ? this.props.getNextWeek() : this.props.getPreviousWeek();
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
        if (nextProps.selectedDate === this.props.selectedDate) {
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
        let opacityAnim = 1;
        const datesRender = this.props.getDatesForWeek().map((date, index) => {
            if (this.props.calendarAnimation) {
                opacityAnim = this.animatedValue[index];
            }
            return (
                <Animated.View key={date} style={{opacity: opacityAnim}}>
                    <CalendarDay
                        date={date}
                        key={date}
                        selected={this.props.isDateSelected(moment(date))}
                        onDateSelected={this.props.onDateSelected}
                        calendarColor={this.props.calendarColor}
                        highlightColor={this.props.highlightColor}
                        dateNameStyle={this.props.dateNameStyle}
                        dateNumberStyle={this.props.dateNumberStyle}
                        weekendDateNameStyle={this.props.weekendDateNameStyle}
                        weekendDateNumberStyle={this.props.weekendDateNumberStyle}
                        selection={this.props.selection}
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
    calendarAnimation: React.PropTypes.object,
    selectionAnimation: React.PropTypes.object,

    calendarColor: React.PropTypes.string,
    highlightColor: React.PropTypes.string,
    dateNameStyle: React.PropTypes.any,
    dateNumberStyle: React.PropTypes.any,
    weekendDateNameStyle: React.PropTypes.any,
    weekendDateNumberStyle: React.PropTypes.any,

    startingDate: React.PropTypes.any,
    selectedDate: React.PropTypes.any,
    getPreviousWeek: React.PropTypes.func,
    getNextWeek: React.PropTypes.func,
    getDatesForWeek: React.PropTypes.func,
    onDateSelected: React.PropTypes.func,
    isDateSelected: React.PropTypes.func,
};