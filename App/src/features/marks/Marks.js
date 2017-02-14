/**
 * Created by jules on 04/02/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
//noinspection JSUnresolvedVariable
import {
    AppRegistry,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Icon,
} from 'native-base';
import _ from "lodash";
import Accordion from 'react-native-collapsible/Accordion';
import { Actions } from 'react-native-router-flux';
import styles from './styles.js';
import MARKS from './data';

const section = [
    {
        title: 'B4 - Memory Unix',
        content: 'Malloc',
        mark: '12',
    },
    {
        title: 'B4 - System Unix',
        content: 'myFtp',
        mark: '12',
    },
    {
        title: 'B4 - Internship',
        content: 'myUnd',
        mark: '12',
    },
    {
        title: 'B4 - Memory Unix',
        content: 'Malloc',
        mark: '12',
    },
    {
        title: 'B4 - System Unix',
        content: 'myFtp',
        mark: '12',
    },
];

export default class Marks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nbSemester: 0,
            currentSemester: 0,
            marks: {},
        };

        this.nextSemester = this.nextSemester.bind(this);
        this.previousSemester = this.previousSemester.bind(this);
    };

    componentWillMount() {
        this.parseMarks();
    }


    _renderHeader(semester) {
        const [, semesterMarks] = semester;
        const title = _.first(semesterMarks).title;

        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                <View style={styles.subHeaderText} />
            </View>
        );
    }

    _renderContent(semester) {
        const [, semesterMarks] = semester;

        console.log('semesterMarks', semesterMarks);

        return (
            <TouchableOpacity onPress={() => Actions.markDetails({ mark: section })}>
                <View>
                    {
                        _.map(semesterMarks, (marks, i) => (
                            _.map(marks, (mark, j) => (
                                <View key={`${i}-${j}`} style={styles.content}>
                                    <Text style={styles.textContent}> {mark.title}</Text>
                                    <Text style={styles.markContent}> {mark.final_note}</Text>
                                </View>
                            ))
                        ))

                    }
                </View>
            </TouchableOpacity>
        );
    }


    parseMarks() {
        const notes = _(MARKS.notes)
            .filter((note) => _.startsWith(note.titlemodule, 'B'))
            .groupBy((note) => note.codemodule)
            .value();

        const marks = _(MARKS.modules)
            .filter((module) => _.startsWith(module.title, 'B'))
            .groupBy((module) => module.title.substring(0, 2))
            .toPairs()
            .map(([semester, modules]) => {
                const modulesWithMark = _(modules)
                    .groupBy((module) => module.codemodule)
                    .toPairs()
                    .map(([codemodule, modules]) => {
                        const newModule = _.map(modules, (module) =>({
                            marks: _.filter(notes[codemodule], (note) => note.codeinstance === module.codeinstance),
                            grade: module.grade,
                            date: module.date_ins,
                            title: module.title,
                        }));

                        return [
                            codemodule,
                            _.uniq(newModule),
                        ]
                    })
                    .value();

                return [
                    semester,
                    modulesWithMark,
                ];
            })
            .fromPairs()
            .value();

        console.log(marks);

        this.setState({
            marks,
            nbSemester: _.size(marks),
        })
    }

    nextSemester() {
        const { nbSemester, currentSemester } = this.state;
        const nextSemester = (currentSemester > nbSemester) ? 0 : currentSemester + 1;

        this.setState({ currentSemester: nextSemester });
    }

    previousSemester() {
        const { nbSemester, currentSemester } = this.state;
        const previousSemester = (currentSemester < 0) ? nbSemester : currentSemester - 1;

        this.setState({ currentSemester: previousSemester });
    }

    render() {
        const { marks, currentSemester } = this.state;

        return (
            <Container>
                <Content contentContainerStyle={{flex:1, backgroundColor: '#39516a'}}>
                    <View style={styles.headerContainer}>
                        <Button
                            style={styles.headerArrow}
                            title="prev"
                            onPress={this.previousSemester}
                            transparent
                        >
                            <Icon style={styles.headerIcon} name="ios-arrow-back"/>
                        </Button>
                        <Text style={styles.headerIcon}>
                            First semester
                        </Text>
                        <Button
                            style={styles.headerArrow}
                            title="next"
                            onPress={this.nextSemester}
                            transparent
                        >
                            <Icon style={styles.headerIcon} name="ios-arrow-forward"/>
                        </Button>
                    </View>
                    <View style={styles.bodyContainer}>
                        <ScrollView>
                            <Accordion
                                sections={marks[`B${currentSemester}`]}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                            />
                        </ScrollView>
                    </View>
                </Content>
            </Container>
        );
    }
};