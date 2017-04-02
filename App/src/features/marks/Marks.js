/**
 * Created by jules on 04/02/17.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import {
    Button,
    Icon,
} from 'native-base';
import _ from "lodash";
import Accordion from 'react-native-collapsible/Accordion';
import { Actions } from 'react-native-router-flux';
import styles from './styles.js';
import { observer } from 'mobx-react/native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const gradeColors = {
    A: '#62c462',
    B: '#62c462',
    C: '#62c462',
    D: '#62c462',
    E: '#F44336',
    '-': '#FFD783',
};

@observer
export default class Marks extends Component {

    constructor(props) {
        super(props);

        this.nextSemester = this.nextSemester.bind(this);
        this.previousSemester = this.previousSemester.bind(this);
    };

    _renderHeader(module) {
        const title = module.title;
        const grade = module.grade;

        return (
            <View>
                <View style={[Platform.OS === 'ios' ? styles.headerIOS : styles.headerAndroid, { borderLeftColor: gradeColors[grade] }]}>
                    <Text style={styles.moduleText}>{title}</Text>
                    <Text style={styles.gradeText}>{grade}</Text>
                </View>
                <View style={styles.subHeaderText} />
            </View>
        );
    }

    _renderContent(module) {
        return (
            <View>
                {
                    module.marks.length
                        ? (
                            _.map(module.marks, (mark, i) => (
                                <TouchableOpacity
                                    key={`${mark.date}-${i}`}
                                    onPress={() => Actions.markDetails({ mark, title: mark.title })}
                                >
                                    <View style={Platform.OS === 'ios' ? styles.contentIOS : styles.contentAndroid}>
                                        <Text style={styles.textContent}> {mark.title}</Text>
                                        <Text style={styles.markContent}> {mark.note}</Text>
                                        <IconMC style={styles.iconContent} size={14} name="chevron-right"/>
                                    </View>
                                </TouchableOpacity>
                            )))
                        : (

                        <View style={Platform.OS === 'ios' ? styles.contentIOS : styles.contentAndroid}>
                                <Text style={styles.textContent}> {module.title}</Text>
                                <Text style={styles.markContent}> {module.grade}</Text>
                            </View>
                        )
                }
            </View>
        );
    }

    getOrdinalNumber(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;

        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    nextSemester() {
        const { store: { marks } } = this.props;
        const { nbSemester, currentSemester } = marks;

        marks.setCurrentSemester((currentSemester >= nbSemester) ? 1 : currentSemester + 1);
    }

    previousSemester() {
        const { store: { marks } } = this.props;
        const { nbSemester, currentSemester } = marks;

        marks.setCurrentSemester((currentSemester <= 1) ? nbSemester : currentSemester - 1);
    }

    render() {
        const { store: { marks } } = this.props;
        const { marksBySemesters, currentSemester, nbSemester } = marks;

        const semesterId = (currentSemester < nbSemester)
            ? `B${currentSemester}`
            : 'Others';
        const semesterText = (currentSemester < nbSemester)
            ? `${this.getOrdinalNumber(currentSemester)} semester`
            : 'Others';

        return (
            <View style={{ flex: 1, backgroundColor: '#233445' }}>
                <View style={styles.bodyContainer}>
                    <ScrollView>
                        <Accordion
                            underlayColor="#233445"
                            sections={marksBySemesters[semesterId].slice()}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                        />
                    </ScrollView>
                </View>
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
                        { semesterText }
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
            </View>
        );
    }
};