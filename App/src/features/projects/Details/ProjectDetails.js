/**
 * Created by desver_f on 16/02/17.
 */

import React, { Component } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIO from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import styles from '../styles';
import { Document, Team } from './Sections';
import { observer } from 'mobx-react/native';
import ConnectionError from '../../../shared/components/ConnectionError';
import LoadingIndicator from '../../../shared/components/LoadingIndicator';

@observer
class ProjectDetails extends Component {

    constructor(props) {
        super(props);

        this._renderBanner = this._renderBanner.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderContent = this._renderContent.bind(this);
        this._renderDescription = this._renderDescription.bind(this);
        this._renderLoadingScreen = this._renderLoadingScreen.bind(this);
        this._generateSections = this._generateSections.bind(this);
        this._renderTeamRules = this._renderTeamRules.bind(this);
        this.fetchProjectDetails = this.fetchProjectDetails.bind(this);
    }

    async componentWillMount() {
        await this.fetchProjectDetails();
    }

    async fetchProjectDetails() {
        const {
            project: {
                scolaryear: year,
                codemodule,
                codeinstance: instance,
                codeacti: activity,
            },
            store: { projects }
        } = this.props;

        await projects.fetchProjectDetails(year, codemodule, instance, activity);
    }

    _generateSections(projects) {
        const team = {
            title: 'Team',
            icon: 'user-circle-o',
            content: <Team teams={ projects.details } />
        };
        const document = {
            title: `Documents (${projects.files.length})`,
            icon: 'dropbox',
            content: <Document documents={ projects.files } />
        };

        return [team, document];
    }

    _renderLoadingScreen() {
        const { store: { ui } } = this.props;

        return (
            <LoadingIndicator
                isVisible={ui.currentState === ui.state.fetching}
                message="Loading project details..."
            />
        );
    }

    _renderHeader(section) {
        const { title, icon } = section;

        return (
            <View style={Platform.OS === 'ios' ? styles.headerDetailsContainerIOS : styles.headerDetailsContainerAndroid} >
                <View style={styles.headerDetailsSubContainer} />
                <IconFA style={styles.headerDetailsIcon} name={icon} />
                <Text style={styles.headerDetailsText}>{title}</Text>
            </View>
        )
    }

    _renderContent(section) {
        const { content } = section;

        return (<View>{ content }</View>)
    }

    _renderBanner(registered) {
        const notification = registered ? "  You are registered to this project" : "  You are not registered for this project";

        return (
            <View style={{   flexDirection: 'row', backgroundColor: registered ? "#62c462" : "#f44336", justifyContent: 'center'}}>
                <IconIO size={24} style={styles.bannerDetailsIcon} name={ registered ? "ios-checkmark" : "ios-close"} />
                <Text style={styles.bannerDetailsText}>{notification}</Text>
            </View>
        )
    }

    _renderDescription(description) {
        const projectDescription = description.length ? description : "No description available for this project";

        return ( <View><Text style={styles.descriptionDetailsText}>{projectDescription}</Text></View> );
    }

    _renderTeamRules(details) {
        if (details.nb_max === details.nb_min) {
            return (
                <Text style={{fontWeight: '100'}}>{details.nb_max} student(s)</Text>
            )
        }
        else {
            return (
                <Text style={{fontWeight: '100'}}>{details.nb_min} - {details.nb_max} students</Text>
            )
        }
    }

    render() {
        const { store : { projects, ui } } = this.props;
        const { project } = this.props;

        if (ui.currentState === ui.state.error) {
            return (
                <ConnectionError onPress={this.fetchProjectDetails}/>
            );
        }

        if (ui.currentState === ui.state.fetching) {
            return this._renderLoadingScreen();
        }

        return (
            <View style={{ flex: 1 }}>
                {this._renderBanner(project.registered)}
                <View style={Platform.OS === 'ios' ? styles.detailsContainerIOS : styles.detailsContainerAndroid}>
                    <ScrollView>
                        <View style={styles.detailsSubContainer}>
                            <Text style={styles.detailsText}> Information :</Text>
                        </View>
                        {this._renderDescription(projects.projectDetails.details.description)}
                        <Text style={{ color: '#FAFAFA', fontSize: 12, marginLeft: 10, marginTop: 10, fontWeight: 'bold' }}>Team details : {this._renderTeamRules(projects.projectDetails.details)}</Text>
                    </ScrollView>
                </View>
            <View style={{ flex: 0.45, backgroundColor: "#203040" }}>
                    <ScrollView style={{ flex: 1, marginBottom: 10 }}>
                        <Accordion
                            underlayColor="#203040"
                            sections={this._generateSections(projects.projectDetails)}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

ProjectDetails.propTypes = {
    project: React.PropTypes.object,
};

ProjectDetails.defaultProps = {
    project: [],
};

export default ProjectDetails;
