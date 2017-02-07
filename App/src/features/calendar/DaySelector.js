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

        this.state = {
            pan: new Animated.ValueXY(),
        };
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
                this.state.pan.setOffset({ x: 0, y: this.state.pan.y._value });
                this.state.pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event([
                null, {dx: 0, dy: this.state.pan.y},
            ]),
            onPanResponderRelease: (e, { vy }) => {
                this.state.pan.flattenOffset();
                const { height } = Dimensions.get('window');
                const threshold =  height / 4;
                const dy = this.state.pan.y._value;


                if (Math.abs(dy) > threshold) {
                    dy < 0 ? this.props.calendarStore.getNextWeek() : this.props.calendarStore.getPreviousWeek();

                    Animated.decay(this.state.pan, {
                        velocity: vy,
                        deceleration: 0.98
                    }).start();

                    this.state.pan.setValue({ x: 0, y: dy < 0 ? 200 : -200 });

                    Animated.spring(this.state.pan.y, {
                        toValue: 0,
                    }).start();

                }
                else {
                    Animated.spring(this.state.pan, {
                        toValue: 0
                    }).start();
                }
            }
        });
    }

    getStyle() {
        const { pan } = this.state;
        const [translateX, translateY] = [pan.x, pan.y];

        return {
            flex: 1,
            justifyContent: 'space-around',
            transform: [{ translateX }, { translateY }],
            opacity: pan.y.interpolate({ inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5] })
        };
    }

    render() {
        const { calendarStore: calendar } = this.props;

        const datesRender = calendar.getDatesForWeek().map((date) => {
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
                        weekendDateNameStyle={this.props.weekendDateNameStyle}
                        weekendDateNumberStyle={this.props.weekendDateNumberStyle}
                        selectionAnimation={this.props.selectionAnimation}
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