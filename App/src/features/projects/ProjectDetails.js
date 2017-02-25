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
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from './ProgressBar';
import Accordion from 'react-native-collapsible/Accordion';
import LoadingIndicator from 'react-native-spinkit';
import styles from './styles';
import _ from "lodash";
import { observer } from 'mobx-react/native';

const BASE_URL = 'https://intra.epitech.eu';

const Team = ({ teams }) => {
    return (
        <View style={{ flex: 1 }}>
            {
                 _.map(teams, (team, i) => (
                     <View key={i} style={{
                         borderBottomWidth: 1,
                         borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                     }}>
                         <View style={{ flexDirection: 'column' }}>
                             <Text style={{
                                 fontSize: 12,
                                 color: '#FFF',
                                 fontFamily: 'Nunito-Light',
                                 margin: 5,
                                 fontWeight: '100',
                             }}>
                                 { team.title }
                             </Text>
                             <View style={{ flexDirection: 'row' }}>
                            <Image style={{
                                borderWidth: 1,
                                borderRadius: 8,
                                margin: 5,
                            }} source={{ uri: team.master.picture, width: 30, height: 30 }} />
                             {
                                 _.map(team.members, (member, i) => (
                                         <Image key={i}
                                                style={{
                                                    alignSelf: 'center',
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                    margin: 5,
                                                    borderColor: member.status == 'confirmed' ? 'rgba(255, 255, 255, 0)' : '#f44336',
                                                }}
                                                source={{uri: member.picture, width: 30, height: 30}}/>
                                 ))
                             }
                             </View>
                         </View>
                     </View>
                ))
            }
        </View>
    );
};

Team.propTypes = {
    teams: React.PropTypes.object,
};

const Document = ({ documents }) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            flex: 1,
            margin: 10,
        }}>
            {
                _.map(documents, (document, i) => (
                    <TouchableOpacity key={i}>
                        <View style={{
                            margin: 10,
                            width: 100,
                        }}>
                            <IconMCI style={{
                                alignSelf: 'center',
                                color: '#FFF',
                            }} name="file-pdf-box" size={22} />
                            <Text style={{
                                alignSelf: 'center',
                                color: '#FFF',
                                fontSize: 12,
                                fontFamily: 'Nunito-ExtraLight',
                                margin: 5,
                            }}>{_.truncate(document.title, {length: 15, separator: '...'})}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
};

Document.propTypes = {
    documents: React.PropTypes.object,
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

    _generateSections(projects) {
        const team = {
            title: 'Team',
            icon: 'user',
            content: <Team teams={ projects.details.registered } />
        };
        const document = {
            title: 'Documents',
            icon: 'dropbox',
            content: <Document documents={ projects.files } />
        }
        return [team, document];
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
                backgroundColor: "#233445",
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
                        paddingBottom: 10,
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
                    flex: 0.25,
                    backgroundColor: "#233445",
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
                        {this._renderDescription(projects.projectDetails.details.description)}
                    </ScrollView>

                </View>
        <View style={{
                    flex: 0.75,
                    backgroundColor: "#2c3e50"
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
