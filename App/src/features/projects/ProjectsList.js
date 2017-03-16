import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react/native';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
    Icon
} from 'native-base';
import ProgressBar from './ProgressBar';
import { Actions } from 'react-native-router-flux';

@observer
export default class ProjectsList extends Component {

    constructor(props) {
        super(props);

        this.renderProject = this.renderProject.bind(this);

    }

    renderProject(project) {
        const parsedStart = moment(project.begin_acti, 'YYYY-MM-DD, HH:mm:ss');
        const parsedEnd = moment(project.end_acti, 'YYYY-MM-DD, HH:mm:ss');
        const projectDuration = parsedEnd.diff(parsedStart, 'days');
        const durationSoFar = moment().diff(parsedStart, 'days');
        const progress = Math.max(1, Math.min((durationSoFar / projectDuration) * 100, 100));

        return (
            <ListItem>
                <TouchableOpacity onPress={() => Actions.projectDetails({ progress: progress, project: project, title: project.acti_title }) }>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: '#fafafa',
                    }}>
                        <View style={{
                            flex: 100,
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                            }}>

                                <View style={{ flexDirection: 'row' }}>

                                    <Text style={{
                                        fontWeight: 'bold',
                                        color: '#233445',
                                    }}>{ project.acti_title }</Text>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#233445',
                                    }}> / { project.title_module }</Text>

                                </View>

                                <View style={{ marginTop: 2  }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                        <Text style={{
                                            color: '#233445',
                                            fontSize: 10,
                                            marginTop: 5,
                                        }}>{ parsedStart.fromNow() }</Text>
                                        <Text style={{
                                            color: '#233445',
                                            fontSize: 10,
                                            margin: 5,
                                        }}>{ parsedEnd.fromNow() }</Text>
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
                            <Icon name="ios-arrow-forward-outline" style={{
                                fontSize: 14,
                                color: '#233445',
                            }}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </ListItem>
        );
    }

    render() {
        const { projectsStore } = this.props;
        const projects = projectsStore.projects.slice();

        return (
            <Container>
                <Content contentContainerStyle={{ backgroundColor: '#fafafa', }}>
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

ProjectsList.propTypes = {
    projectsStore: React.PropTypes.object,
};