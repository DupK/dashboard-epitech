/**
 * Created by jules on 04/02/17.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';

const PROJECTS = [
    {
        "title": "NanoTekSpice",
        "title_link": "\/module\/2016\/B-PAV-330\/NCY-4-1\/acti-237811\/",
        "timeline_start": "23\/01\/2017, 00h00",
        "timeline_end": "05\/03\/2017, 23h42",
        "timeline_barre": "42.7409",
        "date_inscription": false,
        "id_activite": "237811",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    },
    {
        "title": "Malloc",
        "title_link": "\/module\/2016\/B-PSU-356\/NCY-4-1\/acti-239404\/",
        "timeline_start": "23\/01\/2017, 08h42",
        "timeline_end": "12\/02\/2017, 23h42",
        "timeline_barre": "85.2525",
        "date_inscription": false,
        "id_activite": "239404",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    },
    {
        "title": "Mission d\u00e9licate: recadrer un coll\u00e8gue",
        "title_link": "\/module\/2016\/B-PRO-360\/NCY-4-1\/acti-238159\/",
        "timeline_start": "30\/01\/2017, 00h00",
        "timeline_end": "12\/02\/2017, 23h42",
        "timeline_barre": "52.1541",
        "date_inscription": false,
        "id_activite": "238159",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    },
    {
        "title": "Trade",
        "title_link": "\/module\/2016\/B-CPE-360\/NCY-4-1\/acti-238810\/",
        "timeline_start": "30\/01\/2017, 08h42",
        "timeline_end": "11\/06\/2017, 23h42",
        "timeline_barre": "7.9799",
        "date_inscription": "11\/04\/2017, 23h42",
        "id_activite": "238810",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    },
    {
        "title": "ALPHA project",
        "title_link": "\/module\/2016\/B-ANG-001\/NCY-0-4\/acti-232939\/",
        "timeline_start": "01\/03\/2017, 09h00",
        "timeline_end": "05\/04\/2017, 23h42",
        "timeline_barre": "26.2808",
        "date_inscription": "12\/02\/2017, 23h42",
        "id_activite": "232939",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    },
    {
        "title": "BETA project",
        "title_link": "\/module\/2016\/B-ANG-001\/NCY-0-4\/acti-232940\/",
        "timeline_start": "01\/02\/2017, 09h00",
        "timeline_end": "05\/03\/2017, 23h42",
        "timeline_barre": "26.2808",
        "date_inscription": "12\/02\/2017, 23h42",
        "id_activite": "232940",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    },
    {
        "title": "GAMMA project",
        "title_link": "\/module\/2016\/B-ANG-001\/NCY-0-4\/acti-232941\/",
        "timeline_start": "01\/02\/2017, 09h00",
        "timeline_end": "05\/03\/2017, 23h42",
        "timeline_barre": "26.2808",
        "date_inscription": "12\/02\/2017, 23h42",
        "id_activite": "232941",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    },
    {
        "title": "DELTA project",
        "title_link": "\/module\/2016\/B-ANG-001\/NCY-0-4\/acti-232942\/",
        "timeline_start": "01\/02\/2017, 09h00",
        "timeline_end": "05\/03\/2017, 23h42",
        "timeline_barre": "26.2808",
        "date_inscription": "12\/02\/2017, 23h42",
        "id_activite": "232942",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    },
    {
        "title": "EPSILON project",
        "title_link": "\/module\/2016\/B-ANG-001\/NCY-0-4\/acti-232943\/",
        "timeline_start": "01\/02\/2017, 09h00",
        "timeline_end": "05\/03\/2017, 23h42",
        "timeline_barre": "26.2808",
        "date_inscription": false,
        "id_activite": "232943",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    },
    {
        "title": "ZITA project",
        "title_link": "\/module\/2016\/B-ANG-001\/NCY-0-4\/acti-232944\/",
        "timeline_start": "01\/02\/2017, 09h00",
        "timeline_end": "05\/03\/2017, 23h42",
        "timeline_barre": "26.2808",
        "date_inscription": "12\/02\/2017, 23h42",
        "id_activite": "232944",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    },
    {
        "title": "Project Guidance",
        "title_link": "\/module\/2016\/B-ANG-001\/NCY-0-4\/acti-232927\/",
        "timeline_start": "06\/02\/2017, 00h00",
        "timeline_end": "12\/03\/2017, 00h00",
        "timeline_barre": "11.6054",
        "date_inscription": "10\/03\/2017, 00h00",
        "id_activite": "232927",
        "soutenance_name": false,
        "soutenance_link": false,
        "soutenance_date": false,
        "soutenance_salle": false
    }
];

//SCALE VALUE
const DAY_IN_PIXEL = 5;

const MONTH_OFFSET = 11;
const PROJECT_LINE_HEIGHT = 12;
const MONTH_BAR_HEIGHT = 20;
const MONTHS = _.map([
    ...moment.monthsShort(),
    'Jan'], (month) => {
    return {
        name: month,
        days: moment(month, 'MMM').daysInMonth()
    }
});
const MONTH_BAR_WIDTH = _.sumBy(MONTHS, (month) => month.days * DAY_IN_PIXEL);

const Month = ({ month }) => {
    return (
        <View style={{
            width: DAY_IN_PIXEL * month.days,
        }}>
            <Text style={{ color: 'white' }}>{ month.name }</Text>
        </View>
    );
};

Month.propTypes = {
    month: React.PropTypes.object,
};

const MonthBar = () =>  {
    const { width } = Dimensions.get('window');

    return (
        <View style={{
            position: 'absolute',
            top: 0,
            height: MONTH_BAR_HEIGHT,
            width: MONTH_BAR_WIDTH + width,
            backgroundColor: '#617487',
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
};

const ProjectLine = ({ projectName, nthProject, start, end }) => {
    const { width } = Dimensions.get('window');
    const parsedStart = moment(start, 'DD-MM-YYYY, HH[h]mm');
    const parsedEnd = moment(end, 'DD-MM-YYYY, HH[h]mm');
    const nbDays = parsedEnd.diff(parsedStart, 'day');
    const timelineStart = parsedStart.diff(moment().startOf('year'), 'day');

    return (
        <View
            style={{
                flexDirection: 'column',
                position: 'absolute',
                height: PROJECT_LINE_HEIGHT * 3,
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
};

ProjectLine.propTypes = {
    nthProject: React.PropTypes.number,
    start: React.PropTypes.string,
    end: React.PropTypes.string,
    projectName: React.PropTypes.string,
};

const VerticalMonthDelimitors = ({ nthMonth }) => {
    const { height, width } = Dimensions.get('window');
    const monthsInPixelBefore = _.sumBy(_.take(MONTHS, nthMonth), (month) => (month.days * DAY_IN_PIXEL));

    return (
        <View
            style={{
                top: MONTH_BAR_HEIGHT,
                position: 'absolute',
                width: 1,
                height,
                left: MONTH_OFFSET + monthsInPixelBefore + width / 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
        />
    );
};

VerticalMonthDelimitors.propTypes = {
    nthMonth: React.PropTypes.number,
};

const Today = () => {
    const { height, width } = Dimensions.get('window');
    const daysSinceStartOfYear = moment().diff(moment().startOf('year'), 'day');
    const dayNumber = moment().format('DD');

    return (
        <View
            style={{
                top: MONTH_BAR_HEIGHT + 10,
                position: 'absolute',
                width: 20,
                height,
                left: MONTH_OFFSET + (daysSinceStartOfYear * DAY_IN_PIXEL) - 10 + width / 2,
            }}
        >
            <View
                style={{
                    position: 'relative',
                    width: 20,
                    height: 20,
                    left: 0,
                    backgroundColor: '#1B3147',
                    borderRadius: 5,
                }}
            >
                <Text style={{ alignSelf: 'center', color: 'white' }}>
                    {dayNumber}
                </Text>
            </View>
            <View
                style={{
                    position: 'relative',
                    width: 1,
                    height,
                    left: 10,
                    backgroundColor: '#1B3147',
                }}
            />
        </View>
    );
};

const SelectedDay = ({ scrollPosition }) => {
    const { height, width } = Dimensions.get('window');
    const todayPosition = scrollPosition / DAY_IN_PIXEL;

    const date = moment().startOf('year').add(todayPosition, 'd');

    return (
        <View
            style={{
                top: MONTH_BAR_HEIGHT + 10,
                position: 'absolute',
                width: 20,
                height,
                left: (width / 2) - 10 + MONTH_OFFSET,
            }}
        >
            <View
                style={{
                    position: 'relative',
                    width: 20,
                    height: 20,
                    left: 0,
                    backgroundColor: '#1B3147',
                    borderRadius: 5,
                }}
            >
                <Text style={{ alignSelf: 'center', color: 'white' }}>
                    {date.format('DD') }
                </Text>
            </View>
            <View
                style={{
                    position: 'relative',
                    width: 1,
                    height,
                    left: 10,
                    backgroundColor: '#1B3147',
                }}
            />
        </View>
    );
};

SelectedDay.propTypes = {
    scrollPosition: React.PropTypes.number,
};

export default class Projects extends Component {

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

        setTimeout(() => {
            this.scrollView.scrollTo({ x: todayPosition, animated: true });
            this.setState({ scrollPosition: todayPosition });
        }, 0);
    }

    handleScroll(e) {
        const currentScrollPosition = e.nativeEvent.contentOffset.x;

        this.setState({
            scrollPosition: currentScrollPosition,
        });
    }

    render() {
        const { height, width } = Dimensions.get('window');
        const viewWidth = MONTH_BAR_WIDTH - ( moment().startOf('year').daysInMonth() * DAY_IN_PIXEL) + width;

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#42586E'
            }}>
                <ScrollView
                    ref={(ref) => this.scrollView = ref}
                    style={{ position: 'absolute' }}
                    horizontal
                    onScroll={this.handleScroll}
                >
                    <ScrollView>
                        <View style={{
                            width: viewWidth,
                            height
                        }}/>

                        <Today/>
                        {
                            _.map(MONTHS, (month, i) => (
                                <VerticalMonthDelimitors key={i} nthMonth={i}/>
                            ))
                        }
                        <MonthBar/>
                        {
                            _.map(PROJECTS, (project, i) => (
                                <ProjectLine
                                    key={i}
                                    start={project.timeline_start}
                                    end={project.timeline_end}
                                    nthProject={i}
                                    projectName={project.title}
                                />
                            ))
                        }

                    </ScrollView>
                </ScrollView>
                <SelectedDay scrollPosition={this.state.scrollPosition}/>
            </View>
        );
    }
};