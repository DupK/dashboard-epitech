/**
 * Created by jules on 04/02/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
//noinspection JSUnresolvedVariable
import {
    AppRegistry,
    StyleSheet,
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

const styles = StyleSheet.create({

    headerContainer: {
        backgroundColor: '#2c3e50',
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerArrow: {
        alignSelf: 'center',
        margin: 20,
    },

    headerIcon: {
        color: '#FFFFFF',
    },

    bodyContainer: {
        flex: 0.9,
    },

    header: {
        backgroundColor: '#2c3e50',
        height: 35,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 3,
        borderLeftColor: '#62c462',
    },

    headerText: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-Light',
        marginLeft: 10,
    },

    subHeaderText: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },

    content: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255, 255, 255, 0.3)',
    },

    textContent: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        marginLeft: 10,
        fontSize: 13,
    },

    markContent: {
        color: '#FFFFFF',
        fontFamily: 'Nunito-ExtraLight',
        marginRight: 10,
    },

});

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

    _renderHeader(section) {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{section.title}</Text>
                </View>
                <View style={styles.subHeaderText} />
            </View>
        );
    }

    _renderContent(section) {
        return (
            <TouchableOpacity onPress={() => Actions.markDetails({ mark: section })}>
                <View style={styles.content}>
                    <Text style={styles.textContent}> {section.content}</Text>
                    <Text style={styles.markContent}> {section.mark}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{flex:1, backgroundColor: '#39516a'}}>
                    <View style={styles.headerContainer}>
                        <Button
                            style={styles.headerArrow}
                            title="prev"
                            onPress={_.noop()}
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
                            onPress={_.noop()}
                            transparent
                        >
                            <Icon style={styles.headerIcon} name="ios-arrow-forward"/>
                        </Button>
                    </View>
                    <View style={styles.bodyContainer}>
                        <ScrollView>
                            <Accordion
                                sections={section}
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