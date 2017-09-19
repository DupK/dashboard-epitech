/**
 * Created by desver_f on 13/02/17.
 */

/**
 * Created by desver_f on 04/02/17.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { observer } from 'mobx-react/native';
import {
    DAY_IN_PIXEL,
    MONTH_BAR_HEIGHT,
    MONTH_BAR_OFFSET,
    MONTH_OFFSET,
    PROJECT_LINE_HEIGHT,
} from './constants';
import { Dimensions, ScrollView, Text, View, Platform } from 'react-native';

const computeTimelineHeight = (nbProjects) => {
    const { height } = Dimensions.get('window');
    const projectLinesHeight = 40 + (MONTH_BAR_HEIGHT + ((PROJECT_LINE_HEIGHT + 25) * nbProjects)) + 10;
    const headerHeight = Platform.OS === 'android' ? 54 : 64;
    const bottomBarHeight = 50;
    const timeLineHeight = height - headerHeight - MONTH_BAR_HEIGHT - bottomBarHeight - 5;

    return (projectLinesHeight > timeLineHeight) ? projectLinesHeight : timeLineHeight;
};

const Month = observer(({ month }) => {
    return (
        <View style={{ width: DAY_IN_PIXEL * month.days }}>
            <Text style={{ color: 'white' }}>{ month.name }</Text>
        </View>
    );
});

Month.propTypes = {
    month: React.PropTypes.object,
};

const MonthBar = observer(({ barWidth, months }) =>  {
    const { width } = Dimensions.get('window');

    return (
        <View style={{
            position: 'absolute',
            top: 0,
            height: MONTH_BAR_HEIGHT,
            width: barWidth + width,
            backgroundColor: 'rgba(98, 196, 98, 0.9)',
            zIndex: 10,
            elevation: 5,
        }}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
                left: MONTH_BAR_OFFSET,
            }}>
                { _.map(months, (month, i) => <Month key={i} month={month}/>) }
            </View>
        </View>
    );
});

MonthBar.propTypes = {
    barWidth: React.PropTypes.number,
    months: React.PropTypes.array,
};

export const ProjectLine = observer(({ dateTimeFormat, timelineMomentStart, projectName, nthProject, start, end, color }) => {
    const parsedStart = moment(start, dateTimeFormat);
    const parsedEnd = moment(end, dateTimeFormat);
    const nbDays = parsedEnd.diff(parsedStart, 'day');
    const projectStart = parsedStart.diff(timelineMomentStart, 'day');

    return (
        <View
            style={{
                flexDirection: 'column',
                position: 'absolute',
                height: PROJECT_LINE_HEIGHT,
                width: 500,
                top: 40 + (MONTH_BAR_HEIGHT + ((PROJECT_LINE_HEIGHT + 25) * nthProject)),
                left: MONTH_OFFSET + (projectStart * DAY_IN_PIXEL) + MONTH_BAR_OFFSET,
            }}
        >
            <Text style={{ color: 'rgba(35, 52, 69, 0.9)', position: 'relative', fontSize: 10, fontWeight: 'bold' }}>
                { projectName }
            </Text>
            <View style={{
                position: 'relative',
                top: (PROJECT_LINE_HEIGHT / 2) - 3,
                height: PROJECT_LINE_HEIGHT,
                width: nbDays * DAY_IN_PIXEL,
                borderRadius: 30,
                backgroundColor: color,
            }}/>
        </View>
    );
});

ProjectLine.propTypes = {
    nthProject: React.PropTypes.number,
    start: React.PropTypes.string,
    end: React.PropTypes.string,
    projectName: React.PropTypes.string,
    color: React.PropTypes.string,
    timelineMomentStart: React.PropTypes.instanceOf(moment),
    dateTimeFormat: React.PropTypes.string,
};

const VerticalMonthDelimitors = observer(({ months, nthMonth, viewHeight }) => {
    const monthsInPixelBefore = _.sumBy(_.take(months, nthMonth), (month) => (month.days * DAY_IN_PIXEL));

    return (
        <View
            style={{
                top: MONTH_BAR_HEIGHT,
                position: 'absolute',
                width: 1,
                height: viewHeight,
                left: MONTH_OFFSET + monthsInPixelBefore + MONTH_BAR_OFFSET,
                backgroundColor: 'rgba(35, 52, 69, 0.1)',
                zIndex: 1,
            }}
        />
    );
});

VerticalMonthDelimitors.propTypes = {
    nthMonth: React.PropTypes.number,
    viewHeight: React.PropTypes.number,
    months: React.PropTypes.array,
};

const DayIndicator = observer(({ dayNumber, position, colorBar, colorBox, colorBoxText, viewHeight }) => {

    return (
        <View
            style={{
                top: MONTH_BAR_HEIGHT + 10,
                position: 'absolute',
                width: 20,
                height: viewHeight,
                left: position,
                zIndex: 1,
            }}
        >
            <View
                style={{
                    position: 'relative',
                    width: 20,
                    height: 20,
                    left: 0,
                    backgroundColor: colorBox,
                    borderRadius: 50,
                }}
            >
                <Text style={{ alignSelf: 'center', color: colorBoxText, fontSize: 12, marginTop: 1 }}>
                    { dayNumber }
                </Text>
            </View>
            <View
                style={{
                    position: 'relative',
                    width: 1,
                    height: viewHeight,
                    left: 10,
                    backgroundColor: colorBar,
                }}
            />
        </View>
    );
});

DayIndicator.propTypes = {
    dayNumber: React.PropTypes.string,
    position: React.PropTypes.number,
    colorBar: React.PropTypes.string,
    colorBox: React.PropTypes.string,
    colorBoxText: React.PropTypes.string,
    viewHeight: React.PropTypes.number,
};

DayIndicator.defaultProps = {
    viewHeight: Dimensions.get('window').height,
    colorBoxText: 'white',
};

@observer
export default class ProjectsTimeline extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scrollPosition: 0,
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        const daysSinceStartOfYear = moment().diff(this.props.momentStart, 'day');
        const todayPosition = (daysSinceStartOfYear * DAY_IN_PIXEL);

        //Horrible work-around for the scrollTo method to work properly on DidMount.
        setTimeout(() => {
            this.scrollView.scrollTo({ x: todayPosition, animated: true });
            this.setState({ scrollPosition: todayPosition });
        }, 0);
    }

    handleScroll(e) {
        this.setState({ scrollPosition: e.nativeEvent.contentOffset.x });
    }

    renderMonthVerticalBars(months, viewHeight) {
        return _.map(months, (month, i) => (
            <VerticalMonthDelimitors
                key={i}
                nthMonth={i}
                viewHeight={viewHeight}
                months={months}
            />
        ));
    }

    renderTodayIndicator(viewHeight) {
        const daysSinceStartOfTimeline = moment().diff(this.props.momentStart, 'day');
        const dayNumber = moment().format('DD');
        const position = MONTH_OFFSET + (daysSinceStartOfTimeline * DAY_IN_PIXEL) - 10 + MONTH_BAR_OFFSET;

        return <DayIndicator
            dayNumber={dayNumber}
            position={position}
            colorBar="rgba(44, 62, 80, 0.9)"
            colorBox="rgba(44, 62, 80, 0.9)"
            colorBoxText="#FAFAFA"
            viewHeight={viewHeight}
        />;
    }

    renderSelectedDayIndicator() {
        const todayPosition = this.state.scrollPosition / DAY_IN_PIXEL;
        const dayNumber = moment(this.props.momentStart).add(todayPosition, 'd').format('DD');
        const position = (MONTH_BAR_OFFSET) - 10 + MONTH_OFFSET;

        return <DayIndicator
            dayNumber={dayNumber}
            position={position}
            colorBar="rgba(98, 196, 98, 0.9)"
            colorBox="rgba(98, 196, 98, 0.9)"
        />;
    }

    renderProjectsLines() {
        const { items, renderItemsLines } = this.props;

        return _.map(items, renderItemsLines);
    }

    computeAvailableMonths() {
        const startTime = moment(this.props.momentStart);
        const endTime = moment(this.props.momentEnd);
        const monthsBasedOnTimeRange = [];

        while (startTime.isBefore(endTime)) {
            monthsBasedOnTimeRange.push({
                name: startTime.format('MMM'),
                days: startTime.daysInMonth()
            });
            startTime.add(1, 'month');
        }

        return monthsBasedOnTimeRange;
    }

    computeMonthBarWidth() {
        const availableMonths = this.computeAvailableMonths();

        return _.sumBy(availableMonths, (month) => month.days * DAY_IN_PIXEL);
    }

    render() {
        const { width } = Dimensions.get('window');
        const monthBarWidth = this.computeMonthBarWidth();
        const availableMonths = this.computeAvailableMonths();
        const viewWidth = monthBarWidth - (this.props.momentStart.daysInMonth() * DAY_IN_PIXEL) + width;
        const viewHeight = computeTimelineHeight(this.props.items.length);

        return (
            <View style={{
                flex: 1,
            }}>
                <ScrollView
                    ref={(scrollView) => this.scrollView = scrollView}
                    style={{
                        flex: 1,
                        backgroundColor: '#FAFAFA'
                    }}
                    horizontal
                    onScroll={this.handleScroll}
                    scrollEventThrottle={30}
                >
                    <MonthBar
                        barWidth={monthBarWidth}
                        months={availableMonths}
                    />
                    <ScrollView>
                        <View style={{
                            width: viewWidth,
                            height: viewHeight,
                        }}/>
                        { this.renderTodayIndicator(viewHeight) }
                        { this.renderMonthVerticalBars(availableMonths, viewHeight) }
                        { this.renderProjectsLines() }
                    </ScrollView>
                </ScrollView>
                { this.renderSelectedDayIndicator() }
            </View>
        );
    }
};

ProjectsTimeline.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
        start: React.PropTypes.string,
        end: React.PropTypes.end,
    })),
    renderItemsLines: React.PropTypes.func,
    momentStart: React.PropTypes.instanceOf(moment),
    momentEnd: React.PropTypes.instanceOf(moment),
};
