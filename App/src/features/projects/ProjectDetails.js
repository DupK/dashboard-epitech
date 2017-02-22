/**
 * Created by desver_f on 16/02/17.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    Icon
} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import LoadingIndicator from 'react-native-spinkit';
import styles from './styles';
import _ from "lodash";
import { observer } from 'mobx-react/native';

const Deadline = ({ deadline }) => {
    return (
        <View>
            <Text>deadline</Text>
        </View>
    );
};

Deadline.propTypes = {
    deadline: React.PropTypes.object,
};

const Team = ({ team }) => {
    return (
        <View style={{ flex: 1, borderWidth: 1, borderColor: 'red' }}>
            {
                 _.map(team, (currentTeam) => (
                     <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.3)' }}>
                        <Text style={{
                            margin: 5,
                            fontSize: 12,
                            fontFamily: 'Nunito-ExtraLight',
                            color: '#FFF',
                        }}>{ currentTeam.title }</Text>
                         <View style={{ flexDirection: 'row' }}>
                            <Image style={{ borderRadius: 40, margin: 8 }} source={{ uri: currentTeam.master.picture, width: 40, height: 40 }} />
                             {
                                 _.map(currentTeam.members, (members) => (
                                     <Image style={{borderRadius: 40, margin: 8}}
                                            source={{uri: members.picture, width: 30, height: 30}}/>
                                 ))
                             }
                         </View>
                     </View>
                ))
            }
        </View>
    );
};

Team.propTypes = {
    team: React.PropTypes.object,
};

const Document = ({ document }) => {
    return (
        <View>
            <Text>Document</Text>
        </View>
    );
};

Document.propTypes = {
    document: React.PropTypes.object,
};

@observer
class ProjectDetails extends Component {

    constructor(props) {
        super(props);

        this._renderBanner = this._renderBanner.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderContent = this._renderContent.bind(this);
        this._renderDescription = this._renderDescription.bind(this);
        this._renderRepositoryName = this._renderRepositoryName.bind(this);
        this._renderLoadingScreen = this._renderLoadingScreen.bind(this);
        this._generateSections = this._generateSections.bind(this);
    }

    async componentWillMount() {
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

    _generateSections() {
        const { store: { projects } } = this.props;
        const deadline = {
            title: 'Deadline',
            icon: 'flag-checkered',
            content: <Deadline deadline={ projects.projectDetails } />
        };
        const team = {
            title: 'Team',
            icon: 'user',
            content: <Team team={ projects.projectDetails.registered } />
        };
        const document = {
            title: 'Documents',
            icon: 'file-pdf-o',
            content: <Document document={ projects.projectDetails }/>
        }
        return [deadline, team, document];
    }

    _renderLoadingScreen() {
        const { store: { ui } } = this.props;

        return (
            <View style={styles.loadingContainer}>
                <LoadingIndicator
                    isVisible={ui.currentState === ui.state.fetching}
                    color="#FFFFFF"
                    type="Bounce"
                    size={100}
                />
                <Text style={styles.loadingText}>Loading project details...</Text>
            </View>
        );
    }

    _renderHeader(section) {
        const { title, icon } = section;
        return (
            <View style={{
                height: 70,
                backgroundColor: "#2c3e50",
                flexDirection: 'row',
                marginBottom: 2,
                borderBottomWidth: 0.5,
                borderTopWidth: 0.5,
                alignItems: 'center',
            }}>
                <View style={{
                    flex: 0.05,
                }} />
                <IconFA style={{
                    color: "#FFF",
                    fontSize: 24,
                    flex: 0.1,
                }} name={icon} />
                    <Text style={{
                        color: "#FFF",
                        flex: 0.6,
                }}>{title}</Text>
            </View>
        )
    }

    _renderContent(section) {
        const { content } = section;

        return (
            <View>
                { content }
            </View>
        )
    }

    _renderBanner(registered) {
        const notification = registered ? "  You are registered to this project" : "  You are not registered for this project";
        return (
            <View style={{
                flex: 0.05,
                flexDirection: 'row',
                backgroundColor: registered ? "#62c462" : "#f44336",
                justifyContent: 'center'
            }}>
                <Icon style={{
                    color: "#FFF",
                }} name={ registered ? "ios-checkmark" : "ios-close"} />
                <Text style={{
                    fontWeight: "bold",
                    color: "#FFF",
                    fontSize: 12,
                    alignSelf: 'center'
                }}>{notification}</Text>
            </View>
        )
    }

    _renderDescription(description) {
        return (
                <View>
                    <Text style={{
                        color: "#FFF",
                        fontSize: 12,
                        marginLeft: 10,
                        marginTop: 5,
                        fontFamily: "Nunito-ExtraLight",
                    }}>{description}</Text>
                </View>
        )
    }

    _renderRepositoryName() {
        return (
            <View>
                <Text style={{
                    color: "#FFF",
                    fontSize: 12,
                    marginTop: 5,
                    fontFamily: "Nunito-ExtraLight",
                }}>cpp_nanotekspice</Text>
            </View>
        )
    }

    render() {
        const { store : { projects, ui } } = this.props;
        const { project } = this.props;

        if (ui.currentState === ui.state.fetching) {
            return this._renderLoadingScreen();
        }

        return (
            <View style={{
                flex: 1
            }}>
                {this._renderBanner(project.registered)}
                <View style={{
                    flex: 0.4,
                    backgroundColor: "#2c3e50",
                    elevation: 10,
                }}>
                    <ScrollView>
                        <View style={{
                            flexDirection: 'row',
                            marginLeft: 8,
                            marginTop: 12,
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 12,
                                fontFamily: "Nunito-Light",
                                color: "#FFF",
                            }}> Information :</Text>
                        </View>
                        {this._renderDescription(projects.projectDetails.description)}
                        <View style={{
                            marginLeft: 10,
                            marginTop: 12,
                        }}>
                            <Text style={{
                                fontWeight: "bold",
                                fontSize: 12,
                                fontFamily: "Nunito-Light",
                                color: "#FFF",
                            }}>Repository name :</Text>
                            {this._renderRepositoryName()}
                        </View>
                    </ScrollView>

                </View>
        <View style={{
                    flex: 0.55,
                    backgroundColor: "#42586E"
                }}>
                    <ScrollView style={{ flex: 1,}}>
                        <Accordion
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
