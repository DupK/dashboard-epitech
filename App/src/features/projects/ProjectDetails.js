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
} from 'react-native';
import {
    Icon
} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';

const sections = [
    {
        title: '   Deadline',
        icon: 'flag-checkered',
        content: '',
    },
    {
        title: '   Team',
        icon: 'user',
        content: '',
    },
    {
        title: '   Documents',
        icon: 'file-pdf-o',
        content: '',
    }
];

class ProjectDetails extends Component {

    constructor(props) {
        super(props);

        this._renderBanner = this._renderBanner.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderContent = this._renderContent.bind(this);
        this._renderDescription = this._renderDescription.bind(this);
        this._renderRepositoryName = this._renderRepositoryName.bind(this);
    }

    _renderHeader(sections) {
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
                }} name={sections.icon} />
                    <Text style={{
                        color: "#FFF",
                        flex: 0.6,
                }}>{sections.title}</Text>
            </View>
        )
    }

    _renderContent(sections) {
        return (
            <View>
                <Text></Text>
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

    _renderDescription() {
        return (
            <View>
                <Text style={{
                    color: "#FFF",
                    fontSize: 12,
                    marginLeft: 10,
                    marginTop: 5,
                    fontFamily: "Nunito-ExtraLight",
                }}>Insert description</Text>
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
        const { project } = this.props;

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
                        }}> Information</Text>
                    </View>
                    {this._renderDescription()}
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
                </View>
                <View style={{
                    flex: 0.55,
                    backgroundColor: "#42586E"
                }}>
                    <ScrollView style={{ flex: 1,}}>
                        <Accordion
                            sections={sections}
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

export default ProjectDetails;
