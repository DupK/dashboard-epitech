import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react/native';
import {
    Text,
    View,
    TouchableOpacity,
    Platform
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
import _ from 'lodash';
import IconFA from 'react-native-vector-icons/FontAwesome';
import styles from './styles.js';

@observer
export default class ProjectsList extends Component {

    constructor(props) {
        super(props);

        this.renderProject = this.renderProject.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }

    renderProject(project) {
        const { uiStore } = this.props;
        const parsedStart = moment(project.begin_acti, 'YYYY-MM-DD, HH:mm:ss');
        const parsedEnd = moment(project.end_acti, 'YYYY-MM-DD, HH:mm:ss');
        const projectDuration = parsedEnd.diff(parsedStart, 'days');
        const durationSoFar = moment().diff(parsedStart, 'days');
        const progress = Math.max(1, Math.min((durationSoFar / projectDuration) * 100, 100));

        return (
            <ListItem>
                <TouchableOpacity onPress={() => uiStore.isConnected && Actions.projectDetails({ progress: progress, project: project, title: project.acti_title }) }>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#fafafa',}}>
                        <View style={{ flex: 100,}}>
                            <View style={{flex: 1, flexDirection: 'column',}}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{fontWeight: 'bold', color: '#233445',}}>{ project.acti_title }</Text>
                                    <Text style={{fontSize: 12, color: '#233445',}}> / { project.title_module }</Text>
                                </View>
                                <View style={{ marginTop: 2  }}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                                        <Text style={{color: '#233445', fontSize: 10, marginTop: 5,}}>{ parsedStart.fromNow() }</Text>
                                        <Text style={{color: '#233445', fontSize: 10, margin: 5,}}>{ parsedEnd.fromNow() }</Text>
                                    </View>
                                    <ProgressBar completePercentage={progress}/>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 15, justifyContent: 'center', alignItems: 'flex-end',}}>
                            <Icon name="ios-arrow-forward-outline" style={{fontSize: 14, color: '#233445',}}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </ListItem>
        );
    }

    renderHeader(title, icon) {
        return (
            <View style={Platform.OS === 'ios' ? styles.headerContainerIOS : styles.headerContainerAndroid}>
                <IconFA style={styles.headerIcon} name={ icon } />
                <Text style={styles.headerText}>{ title }</Text>
            </View>
        )
    }

    render() {
        const { projectsStore } = this.props;
        const projects = projectsStore.projects.slice();

        const currentProjects = _.filter(projects, (project) => (
            moment(project.begin_acti, 'YYYY-MM-DD, HH:mm:ss').isBefore(moment())
        ));

        const comingsProjects = _.filter(projects, (project) => (
            moment(project.begin_acti, 'YYYY-MM-DD, HH:mm:ss').isAfter(moment())
        ));

        return (
            <Container>
                <Content contentContainerStyle={{ backgroundColor: '#fafafa' }}>
                    {this.renderHeader('Currents projects', 'hourglass-half')}
                    <List
                        dataArray={currentProjects}
                        renderRow={this.renderProject}>
                    </List>
                    {this.renderHeader('Incoming projects', 'hourglass-start')}
                    <List
                        dataArray={comingsProjects}
                        renderRow={this.renderProject}>
                    </List>
                </Content>
            </Container>
        );
    }
}

ProjectsList.propTypes = {
    projectsStore: React.PropTypes.object.isRequired,
    uiStore: React.PropTypes.object.isRequired,
};