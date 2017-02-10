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

const DAY_IN_PIXEL = 5;
const WEEK_IN_PIXEL = DAY_IN_PIXEL * 7;
const MONTH_IN_PIXEL = WEEK_IN_PIXEL * 4;

const PROJECT_LINE_HEIGHT = 12;

const YEAR_BAR_HEIGHT = 20;
const MONTHS_BAR_HEIGHT = 20;
const CALENDAR_HEIGHT = MONTHS_BAR_HEIGHT;

const currentYear = moment();
const nextYear = moment().add(1, 'Y');

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const Month = ({ month }) => {
    return (
        <View style={{
            width: MONTH_IN_PIXEL,
        }}>
            <Text style={{ color: 'white' }}>{ month }</Text>
        </View>
    );
};

Month.propTypes = {
    month: React.PropTypes.string,
};

const YearBar = ({ scrollPosition }) => {
    const { width } = Dimensions.get('window');
    const year = scrollPosition < (MONTH_IN_PIXEL * 12)
        ? currentYear.format('YYYY')
        : nextYear.format('YYYY');

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            height: YEAR_BAR_HEIGHT,
            width: width,
            backgroundColor: '#617487',
        }}>
            <Text style={{ color: 'white' }}>{year}</Text>
        </View>
    );
};

YearBar.propTypes = {
    scrollPosition: React.PropTypes.number,
};

const MonthBar = () =>  {
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            height: MONTHS_BAR_HEIGHT,
            width: (MONTH_IN_PIXEL * 12) * 2,
            backgroundColor: '#617487',
        }}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                { _.map(MONTHS, (month) => <Month key={month} month={month}/>) }
                { _.map(MONTHS, (month) => <Month key={month} month={month}/>) }
            </View>
        </View>
    );
};

const ProjectLine = ({ projectName, nthProject, start, end }) => {
    const parsedStart = moment(start, 'DD-MM-YYYY, HH[h]mm');
    const parsedEnd = moment(end, 'DD-MM-YYYY, HH[h]mm');
    const nbWeeks = parsedEnd.diff(parsedStart, 'day') / 7;
    const timelineStart = parsedStart.diff(moment().startOf('year'), 'day') / 7;

    return (
        <View
            style={{
                flexDirection: 'column',
                position: 'absolute',
                height: PROJECT_LINE_HEIGHT * 3,
                width: (MONTH_IN_PIXEL * 12) * 2,
                top: 40 + (CALENDAR_HEIGHT + ((PROJECT_LINE_HEIGHT + 25) * nthProject)),
                left: timelineStart * WEEK_IN_PIXEL,
            }}
        >
            <Text style={{ color: 'white', position: 'relative', fontSize: 10 }}>
                { projectName }
            </Text>
            <View style={{
                position: 'relative',
                top: (PROJECT_LINE_HEIGHT / 2) - 3,
                height: PROJECT_LINE_HEIGHT,
                width: nbWeeks * WEEK_IN_PIXEL,
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
    const { height } = Dimensions.get('window');

    return (
        <View
            style={{
                top: CALENDAR_HEIGHT,
                position: 'absolute',
                width: 1,
                height,
                left: 11 + (nthMonth * MONTH_IN_PIXEL),
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
        />
    );
};

VerticalMonthDelimitors.propTypes = {
    nthMonth: React.PropTypes.number,
};

const Today = () => {
    const { height } = Dimensions.get('window');

    return (
        <View>

        </View>
    );
};

export default class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scrollPosition: 0,
        };

    }

    render() {
        const { height } = Dimensions.get('window');

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#42586E'
            }}>
                <ScrollView
                    style={{ position: 'absolute' }}
                    horizontal
                >
                    <ScrollView>
                        <View style={{
                            width: (MONTH_IN_PIXEL * 12) * 2,
                            height
                        }}/>

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
            </View>
        );
    }
};