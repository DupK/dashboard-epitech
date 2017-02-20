import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
    PanResponder,
    Dimensions,
    LayoutAnimation
} from 'react-native';
import moment from 'moment';
import Day from './Day';
import { observer } from 'mobx-react/native';

@observer
export default class DaySelector extends Component {

    constructor(props) {
        super(props);

        this.pan = new Animated.ValueXY();
    }

    animateFirstLaunchOfCalendar() {
        const { height } = Dimensions.get('window');
        this.pan.setValue({ y: -height });
        Animated.timing(
            this.pan.y,
            {
                toValue: 0,
                duration: 1500,
                easing: Easing.bounce,
                delay: 100,
            }
        ).start();
    }

    componentWillMount() {
        // Hook the pan responder to interpretate gestures.
        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,

            //Prevent panResponder from overriding onPress() callbacks
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > 5;
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return Math.abs(gestureState.dy) > 5;
            },
            onPanResponderGrant: () => {
                this.pan.setOffset({ x: 0, y: this.pan.y._value });
                this.pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([
                null, {dx: 0, dy: this.pan.y},
            ]),
            onPanResponderRelease: (e, { vy }) => {
                this.pan.flattenOffset();
                const { height } = Dimensions.get('window');
                const threshold =  height / 4;
                const dy = this.pan.y._value;


                if (Math.abs(dy) > threshold) {
                    dy < 0 ? this.props.calendarStore.nextWeek() : this.props.calendarStore.previousWeek();

                    Animated.decay(this.pan, {
                        velocity: vy,
                        deceleration: 0.98
                    }).start();

                    this.pan.setValue({ x: 0, y: dy < 0 ? 200 : -200 });

                    Animated.spring(this.pan.y, {
                        toValue: 0,
                    }).start();

                }
                else {
                    Animated.spring(this.pan, {
                        toValue: 0
                    }).start();
                }
            }
        });


        this.animateFirstLaunchOfCalendar();

    }

    getStyle() {
        return {
            flex: 1,
            justifyContent: 'space-around',
            transform: [{ translateY: this.pan.y }],
            opacity: this.pan.y.interpolate({ inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5] }),
        };
    }

    render() {
        const { calendarStore: calendar } = this.props;
        const eventsOfWeek = calendar.hasEventsPerDay;

        const datesRender = calendar.datesForWeek.map((date) => {
            return (
                <View key={date}>
                    <Day
                        key={date}
                        calendarStore={calendar}
                        date={date}
                        selected={calendar.isDateSelected(moment(date))}
                        calendarColor={this.props.calendarColor}
                        highlightColor={this.props.highlightColor}
                        dateNameStyle={this.props.dateNameStyle}
                        dateNumberStyle={this.props.dateNumberStyle}
                        selectionAnimation={this.props.selectionAnimation}
                        hasEvent={eventsOfWeek[date]}
                    />
                </View>
            );
        });

        return (
            <Animated.View
                ref="wrapper" {...this.panResponder.panHandlers}
                style={this.getStyle()}
            >
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    {datesRender}
                </View>
            </Animated.View>
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