import React from 'react';
import moment from 'moment';
import { observer } from 'mobx-react/native';
import { ListView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from './ProgressBar';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIO from 'react-native-vector-icons/Ionicons';
import styles from './styles.js';

const ProjectsList = observer((props) => {

    const { projectsStore, uiStore } = props;
    const projects = projectsStore.projects.slice();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const currentProjects = _.filter(projects, (project) => (
        moment(project.begin_acti, 'YYYY-MM-DD, HH:mm:ss')
            .isBefore(moment()) && project.rights.includes('student')
    ));
    const comingsProjects = _.filter(projects, (project) => (
        moment(project.begin_acti, 'YYYY-MM-DD, HH:mm:ss')
            .isAfter(moment()) && project.rights.includes('student')
    ));
    const aerProjects = _.filter(projects, (project) => (
        project.rights.includes('assistant')
    ));

    function renderProject(project) {
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

    function renderHeader(title, icon) {
        return (
            <View key={title} style={Platform.OS === 'ios' ? styles.headerContainerIOS : styles.headerContainerAndroid}>
                <IconFA style={styles.headerIcon} name={ icon } />
                <Text style={styles.headerText}>{ title }</Text>
            </View>
        )
    }

    function renderAerProjects(projects) {
        return [
            renderHeader('AER projects', 'life-bouy'),
            <ListView
                key="aer"
                dataSource={ds.cloneWithRows(projects)}
                renderRow={renderProject}>
            </ListView>
        ];
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            {renderHeader('Currents projects', 'hourglass-half')}
            <ListView
                dataSource={ds.cloneWithRows(currentProjects)}
                renderRow={renderProject}>
            </ListView>
            {renderHeader('Incoming projects', 'hourglass-start')}
            <ListView
                dataSource={ds.cloneWithRows(comingsProjects)}
                renderRow={renderProject}>
            </ListView>
            { aerProjects.length !== 0 && renderAerProjects(aerProjects) }
        </ScrollView>
    );
});

ProjectsList.propTypes = {
    projectsStore: React.PropTypes.object.isRequired,
    uiStore: React.PropTypes.object.isRequired,
};

export default ProjectsList;