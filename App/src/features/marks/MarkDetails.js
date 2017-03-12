/**
 * Created by jules on 09/02/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    List,
    Icon,
} from 'native-base';
import LoadingIndicator from 'react-native-spinkit';
import { observer } from 'mobx-react/native';
import styles from './styles.js';

@observer
class MarkDetails extends Component {

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
    }

    async componentWillMount() {
        const {
            mark: { year, codeModule, instance, activity },
            store: { marks }
        } = this.props;

        marks.selectMark(null);
        await marks.fetchProjectNotes(year, codeModule, instance, activity);
    }

    formatName(name) {
        return name
            .split(' ')
            .map(_.capitalize)
            .join(' ');
    }

    formatMark(mark) {
        return Math.round(mark * 100) / 100;
    }

    renderComment() {
        const { store: { marks } } = this.props;

        return (
            <Text style={{ color: 'white', fontSize: 11, }}>
                {
                    marks.selectedMark
                        ? marks.selectedMark.comment
                        : 'Select a user'
                }
            </Text>
        );
    }

    rowColor(mark) {
        const { store: { marks } } = this.props;

        if (!marks.selectedMark) {
            return '#2c3e50';
        }

        return (mark.login === marks.selectedMark.login) ? '#233445' : '#2c3e50';
    }

    renderRow(mark) {
        const { store: { marks } } = this.props;

        return (
            <TouchableOpacity onPress={() => marks.selectMark(mark)}>
                <View
                    style={[styles.container, {
                        backgroundColor: this.rowColor(mark),
                        borderRadius: 5,
                    }]}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: mark.picture }}
                        />
                        <Text style={styles.name}>{ this.formatName(mark.user_title) }</Text>
                    </View>
                    <Text style={[styles.mark]}>{this.formatMark(mark.note)}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderSelf(mark) {
        const { store: { marks } } = this.props;

        return (
            <TouchableOpacity
                onPress={() => marks.selectMark(mark)}
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                }}
            >
                <View style={styles.selfContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: mark.picture }}
                        />
                        <Text style={styles.name}>{ this.formatName(mark.user_title) }</Text>
                    </View>
                    <Text style={[styles.mark]}>{this.formatMark(mark.note)}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderLoadingScreen() {
        const { store: { ui } } = this.props;

        return (
            <View style={styles.loadingContainer}>
                <LoadingIndicator
                    isVisible={ui.currentState === ui.state.fetching}
                    color="#FFFFFF"
                    type="Pulse"
                    size={100}
                />
            </View>
        );
    }

    renderArrowDown() {
        const { store: { marks } } = this.props;

        if (marks.arrowDownHidden) {
            return null;
        }

        return (
            <View style={{ position: 'absolute', bottom: 0, left: 40, right: 0 }}>
                <Icon style={{ color: 'white', fontSize: 20, alignSelf: 'center' }} name="ios-arrow-down"/>
            </View>
        );
    }

    render() {
        const { store: { marks, ui } } = this.props;

        if (ui.currentState === ui.state.fetching) {
            return this.renderLoadingScreen();
        }

        const selfMark = marks.selfMark;

        return (
            <View style={{flex: 1, backgroundColor: '#2c3e50'}}>
                <View style={styles.selfRow}>{ this.renderSelf(selfMark) }</View>
                <View style={styles.listContainerStyle}>
                    <List
                        dataArray={marks.projectMarks.slice()}
                        renderRow={this.renderRow}
                        onScroll={() => marks.hideArrowDown()}
                    />
                    { this.renderArrowDown() }
                </View>
                <View style={styles.scoringContainerStyle}>
                    <View style={styles.studentMarkContainer}>
                        <Text style={styles.studentMarkText}>
                            { this.formatName(marks.selectedMark.user_title) }
                        </Text>
                        <Text style={styles.studentMarkText}>
                            {this.formatMark(marks.selectedMark.note)}
                        </Text>
                    </View>
                    <ScrollView>{ this.renderComment() }</ScrollView>
                </View>
            </View>
        );
    }
}

MarkDetails.propTypes = {
    mark: React.PropTypes.object,
};

MarkDetails.defaultProps = {
    mark: [],
};

export default MarkDetails;