import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react/native';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Text,
    View,
} from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
    Icon
} from 'native-base';
import ProgressBar from './ProgressBar';

@observer
export default class Projects extends Component {

    constructor(props) {
        super(props);

        this.renderProject = this.renderProject.bind(this);

    }

    renderProject(project) {
        const parsedStart = moment(project.begin_acti, 'YYYY-MM-DD, HH:mm:ss');
        const parsedEnd = moment(project.end_acti, 'YYYY-MM-DD, HH:mm:ss');
        const projectDuration = parsedEnd.diff(parsedStart, 'days');
        const durationSoFar = moment().diff(parsedStart, 'days');
        const progress = Math.max(0, Math.min((durationSoFar / projectDuration) * 100, 100));

        return (
            <ListItem>
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 100,
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            margin: 5,
                        }}>
                            <Text>{ project.acti_title }</Text>
                            <Text>{ project.title_module }</Text>
                            <View style={{ marginTop: 10 }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text>{ parsedStart.fromNow() }</Text>
                                    <Text>{ parsedEnd.fromNow() }</Text>
                                </View>
                                <ProgressBar completePercentage={progress}/>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 15,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}>
                        <Icon name="ios-arrow-forward-outline"/>
                    </View>
                </View>
            </ListItem>
        );
    }

    render() {
        const { store: { projects: projectsStore } } = this.props;
        const projects = projectsStore.projects.slice();

        return (
            <Container>
                <Content>
                    <List
                        dataArray={projects}
                        renderRow={this.renderProject}
                    >
                    </List>
                </Content>
            </Container>
        );
    }
}