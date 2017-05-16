import React, { Component } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react/native';
import {
    Text,
    View,
    TouchableOpacity,
    Platform,
    ScrollView,
    ListView,
} from 'react-native';
import ProgressBar from './ProgressBar';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIO from 'react-native-vector-icons/Ionicons';
import styles from './styles.js';

@observer
export default class ProjectsList extends Component {

    constructor(props) {
        super(props);

        this.renderProject = this.renderProject.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderAerProjects = this.renderAerProjects.bind(this);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    renderProject(project) {
        const { uiStore } = this.props;
        const parsedStart = moment(project.begin_acti, 'YYYY-MM-DD, HH:mm:ss');
        const parsedEnd = moment(project.end_acti, 'YYYY-MM-DD, HH:mm:ss');
        const projectDuration = parsedEnd.diff(parsedStart, 'days');
        const durationSoFar = moment().diff(parsedStart, 'days');
        const progress = Math.max(1, Math.min((durationSoFar / projectDuration) * 100, 100));

        return (
           <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.2)'}}>
                <TouchableOpacity onPress={() => uiStore.isConnected && Actions.projectDetails({ progress: progress, project: project, title: project.acti_title }) }>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#fafafa',}}>
                        <View style={{ flex: 100,}}>
                            <View style={{flex: 1, flexDirection: 'column',}}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#233445',}}>{ project.acti_title }</Text>
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
                            <IconIO name="ios-arrow-forward-outline" style={{fontSize: 14, color: '#233445',}}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderHeader(title, icon) {
        return (
            <View key={title} style={Platform.OS === 'ios' ? styles.headerContainerIOS : styles.headerContainerAndroid}>
                <IconFA style={styles.headerIcon} name={ icon } />
                <Text style={styles.headerText}>{ title }</Text>
            </View>
        )
    }

    renderAerProjects(projects) {
        return [
            this.renderHeader('AER projects', 'life-bouy'),
            <ListView
                key="aer"
                dataSource={this.ds.cloneWithRows(projects)}
                renderRow={this.renderProject}>
            </ListView>
        ];
    }

    render() {
        const { projectsStore } = this.props;
        const projects = projectsStore.projects.slice();

        const currentProjects = _.filter(projects, (project) => (
            moment(project.begin_acti, 'YYYY-MM-DD, HH:mm:ss').isBefore(moment()) && project.rights.includes('student')
        ));

        const comingsProjects = _.filter(projects, (project) => (
            moment(project.begin_acti, 'YYYY-MM-DD, HH:mm:ss').isAfter(moment()) && project.rights.includes('student')
        ));

        const aerProjects = _.filter(projects, (project) => (
            project.rights.includes('assistant')
        ));

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                    {this.renderHeader('Currents projects', 'hourglass-half')}
                    <ListView
                        dataSource={this.ds.cloneWithRows(currentProjects)}
                        renderRow={this.renderProject}>
                    </ListView>
                    {this.renderHeader('Incoming projects', 'hourglass-start')}
                    <ListView
                        dataSource={this.ds.cloneWithRows(comingsProjects)}
                        renderRow={this.renderProject}>
                    </ListView>
                    { aerProjects.length !== 0 && this.renderAerProjects(aerProjects) }
            </ScrollView>
        );
    }
}

ProjectsList.propTypes = {
    projectsStore: React.PropTypes.object.isRequired,
    uiStore: React.PropTypes.object.isRequired,
};