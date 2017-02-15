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
    Container,
    Content,
    List,
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

    renderComment() {
        const { store: { marks } } = this.props;

        return (
            <Text style={{ color: 'white' }}>
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

        return (mark.user_title === marks.selectedMark.user_title) ? '#39516a' : '#2c3e50';
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
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 5,
                                marginRight: 10,
                            }}
                            source={{ uri: mark.picture }}
                        />
                        <Text style={styles.name}>{mark.user_title}</Text>
                    </View>
                    <Text style={[styles.mark]}>{Math.round(mark.note * 100) / 100}</Text>
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
                    type="9CubeGrid"
                    size={100}
                />
                <Text style={styles.loadingText}>Loading marks...</Text>
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
            <Container>
                <Content contentContainerStyle={{flex: 1, backgroundColor: '#2c3e50'}}>
                    <View style={{
                        borderBottomWidth: 1,
                        borderBottomColor: 'white',
                    }}>
                        { this.renderRow(selfMark) }
                    </View>
                    <View style={styles.listContainerStyle}>
                        <List
                            dataArray={marks.projectMarks.slice()}
                            renderRow={this.renderRow}
                        />
                    </View>
                    <View style={styles.scoringContainerStyle}>
                        <ScrollView>{ this.renderComment() }</ScrollView>
                    </View>
                </Content>
            </Container>
        );
    }
}

MarkDetails.propTypes = {
    mark: React.PropTypes.object,
};

MarkDetails.defaultPropos = {
    mark: [],
};

export default MarkDetails;