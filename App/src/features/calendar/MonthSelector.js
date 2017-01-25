/**
 * Created by Utilisateur on 25/01/2017.
 */

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
import { Button, Icon } from 'native-base';

class MonthSelector extends Component {

    formatCalendarHeader() {
        const datesForWeek = this.props.getDatesForWeek();
        const firstDay = _.first(datesForWeek);
        const lastDay = _.last(datesForWeek);
        const monthFormatting = 'MMMM';


        if (firstDay.month() === lastDay.month()) {
            return firstDay.format(this.props.calendarHeaderFormat);
        }
        if (firstDay.year() !== lastDay.year()) {
            return `${firstDay.format(this.props.calendarHeaderFormat)} / ${lastDay.format(this.props.calendarHeaderFormat)}`;
        }

        return `${monthFormatting.length > 1 ? firstDay.format(monthFormatting) : ''} ${monthFormatting.length > 1 ? '/' : ''} ${lastDay.format(this.props.calendarHeaderFormat)}`;
    }

    render() {
       return (
           <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
               <Button title="previousMonth" transparent onPress={this.props.getPreviousMonth}>
                   <Icon style={{ color: 'white' }} name="ios-arrow-back"/>
               </Button>
               <Text style={{ color: 'white' }}>{ this.formatCalendarHeader() }</Text>
               <Button title="nextMonth" transparent onPress={this.props.getNextMonth}>
                   <Icon style={{ color: 'white' }} name="ios-arrow-forward"/>
               </Button>
           </View>
       );
    }
}

MonthSelector.propTypes = {
    getDatesForWeek: React.PropTypes.func,
    getPreviousMonth: React.PropTypes.func,
    getNextMonth: React.PropTypes.func,
    startingDate: React.PropTypes.object,
    calendarHeaderFormat: React.PropTypes.string,
};

export default MonthSelector;