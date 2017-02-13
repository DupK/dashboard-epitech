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
    MONTH_BAR_WIDTH,
    DAY_IN_PIXEL,
    MONTH_BAR_HEIGHT,
    MONTH_OFFSET,
    MONTHS,
    PROJECT_LINE_HEIGHT,
} from './constants';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';

const computeViewHeight = (nbProjects) => {
    const { height } = Dimensions.get('window');
    const projectLinesHeight = 40 + (MONTH_BAR_HEIGHT + ((PROJECT_LINE_HEIGHT + 25) * nbProjects)) + 10;

    return (projectLinesHeight > height) ? projectLinesHeight : height;
};

const Month = observer(({ month }) => {
    return (
        <View style={{
            width: DAY_IN_PIXEL * month.days,
        }}>
            <Text style={{ color: 'white' }}>{ month.name }</Text>
        </View>
    );
});

Month.propTypes = {
    month: React.PropTypes.object,
};

const MonthBar = observer(() =>  {
    const { width } = Dimensions.get('window');

    return (
        <View style={{
            position: 'absolute',
            top: 0,
            height: MONTH_BAR_HEIGHT,
            width: MONTH_BAR_WIDTH + width,
            backgroundColor: '#617487',
            zIndex: 10,
        }}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
                left: width / 2,
            }}>
                { _.map(MONTHS, (month, i) => <Month key={i} month={month}/>) }
            </View>
        </View>
    );
});

const ProjectLine = observer(({ projectName, nthProject, start, end }) => {
    const { width } = Dimensions.get('window');
    const parsedStart = moment(start, 'YYYY-MM-DD, HH:mm:ss');
    const parsedEnd = moment(end, 'YYYY-MM-DD, HH:mm:ss');
    const nbDays = parsedEnd.diff(parsedStart, 'day');
    const timelineStart = parsedStart.diff(moment().startOf('year'), 'day');

    return (
        <View
            style={{
                flexDirection: 'column',
                position: 'absolute',
                height: PROJECT_LINE_HEIGHT,
                width: 500,
                top: 40 + (MONTH_BAR_HEIGHT + ((PROJECT_LINE_HEIGHT + 25) * nthProject)),
                left: MONTH_OFFSET + (timelineStart * DAY_IN_PIXEL) + width / 2,
            }}
        >
            <Text style={{ color: 'white', position: 'relative', fontSize: 10 }}>
                { projectName }
            </Text>
            <View style={{
                position: 'relative',
                top: (PROJECT_LINE_HEIGHT / 2) - 3,
                height: PROJECT_LINE_HEIGHT,
                width: nbDays * DAY_IN_PIXEL,
                borderRadius: 30,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}/>
        </View>
    );
});

ProjectLine.propTypes = {
    nthProject: React.PropTypes.number,
    start: React.PropTypes.string,
    end: React.PropTypes.string,
    projectName: React.PropTypes.string,
};

const VerticalMonthDelimitors = observer(({ nthMonth, viewHeight }) => {
    const { width } = Dimensions.get('window');
    const monthsInPixelBefore = _.sumBy(_.take(MONTHS, nthMonth), (month) => (month.days * DAY_IN_PIXEL));

    return (
        <View
            style={{
                top: MONTH_BAR_HEIGHT,
                position: 'absolute',
                width: 1,
                height: viewHeight,
                left: MONTH_OFFSET + monthsInPixelBefore + width / 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
        />
    );
});

VerticalMonthDelimitors.propTypes = {
    nthMonth: React.PropTypes.number,
    viewHeight: React.PropTypes.number,
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
            }}
        >
            <View
                style={{
                    position: 'relative',
                    width: 20,
                    height: 20,
                    left: 0,
                    backgroundColor: colorBox,
                    borderRadius: 5,
                }}
            >
                <Text style={{ alignSelf: 'center', color: colorBoxText }}>
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
        const daysSinceStartOfYear = moment().diff(moment().startOf('year'), 'day');
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

    renderMonthTimeline() {
        return <MonthBar/>;
    }

    renderMonthVerticalBars(viewHeight) {
        return _.map(MONTHS, (month, i) => (
            <VerticalMonthDelimitors
                key={i}
                nthMonth={i}
                viewHeight={viewHeight}
            />
        ));
    }

    renderTodayIndicator(viewHeight) {
        const { width } = Dimensions.get('window');
        const daysSinceStartOfYear = moment().diff(moment().startOf('year'), 'day');
        const dayNumber = moment().format('DD');
        const position = MONTH_OFFSET + (daysSinceStartOfYear * DAY_IN_PIXEL) - 10 + width / 2;

        return <DayIndicator
            dayNumber={dayNumber}
            position={position}
            colorBar="#ffffff"
            colorBox="#ffffff"
            colorBoxText="#1B3147"
            viewHeight={viewHeight}
        />;
    }

    renderSelectedDayIndicator() {
        const { width } = Dimensions.get('window');
        const todayPosition = this.state.scrollPosition / DAY_IN_PIXEL;
        const dayNumber = moment().startOf('year').add(todayPosition, 'd').format('DD');
        const position = (width / 2) - 10 + MONTH_OFFSET;

        return <DayIndicator
            dayNumber={dayNumber}
            position={position}
            colorBar="#1B3147"
            colorBox="#1B3147"
        />;
    }

    renderProjectsLines() {
        const { projectsStore } = this.props;

        return  _.map(projectsStore.projects.slice(), (project, i) => (
            <ProjectLine
                key={i}
                start={project.begin_acti}
                end={project.end_acti}
                nthProject={i}
                projectName={project.acti_title}
            />
        ));
    }


    render() {
        const { width } = Dimensions.get('window');
        const { projectsStore } = this.props;
        const viewWidth = MONTH_BAR_WIDTH - (moment().startOf('year').daysInMonth() * DAY_IN_PIXEL) + width;
        const viewHeight = computeViewHeight(projectsStore.projects.length);

        return (
            <View style={{
                flex: 1,
            }}>
                <ScrollView
                    ref={(scrollView) => this.scrollView = scrollView}
                    style={{
                        flex: 1,
                        backgroundColor: '#42586E'
                    }}
                    horizontal
                    onScroll={this.handleScroll}
                >
                    { this.renderMonthTimeline() }
                    <ScrollView>
                        <View style={{
                            width: viewWidth,
                            height: viewHeight,
                        }}/>
                        { this.renderTodayIndicator(viewHeight) }
                        { this.renderMonthVerticalBars(viewHeight) }
                        { this.renderProjectsLines() }
                    </ScrollView>
                </ScrollView>
                { this.renderSelectedDayIndicator() }
            </View>
        );
    }
};

ProjectsTimeline.propTypes = {
    projectsStore: React.PropTypes.object,
};
