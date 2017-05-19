/**
 * Created by jules on 28/04/2017.
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Layout from '../../shared/components/Layout';
import IconIO from 'react-native-vector-icons/Ionicons';
import * as Intra from '../../api/intra';
import { Actions } from 'react-native-router-flux';
import LoadingIndicator from '../../shared/components/LoadingIndicator';
import ConnectionError from '../../shared/components/ConnectionError';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 8,
        backgroundColor: '#2c3e50',
    },

    cell: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        margin: 8,
        padding: 10,
        backgroundColor: '#233445',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 1.5,
        shadowOpacity: 0.5,
    },

    iconContainer: {
        flex: 0.15,
        justifyContent: 'center',
    },

    icon: {
        color: '#FFF',
        alignSelf: 'center',
    },

    textContainer: {
        flex: 0.85,
        paddingLeft: 10,
        justifyContent: 'center',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 10,
        color: '#FAFAFA',
    },

    date: {
        fontSize: 10,
        color: '#FAFAFA',
    },

    author: {
        fontStyle: 'italic',
        fontSize: 10,
        color: '#FAFAFA',
    },

    noDocumentContainer: {
        flex: 1,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center',
    },

    alternativeIcon: {
        color: '#203040',
    },

    alternativeText: {
        marginTop: 10,
        color:'#203040',
        fontSize: 15
    },

});

@observer
export default class Documents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            documents: null,
        };

        this._renderIcon = this._renderIcon.bind(this);
        this.fetchDocuments = this.fetchDocuments.bind(this);
    }

    async componentWillMount() {
        await this.fetchDocuments();
    }

    async fetchDocuments() {
        const { store: { session, ui } } = this.props;

        if (ui.isConnected) {

            ui.fetchingState();
            const documents = await Intra.fetchDocuments(session.userProfile.login);
            ui.defaultState();

            if (ui.currentState !== ui.state.error) {
                this.setState({ documents: documents.error ? [] : documents });
            }
        } else {
            this.setState({ documents: [] });
        }
    }

    _renderIcon(title) {
        if (/Bulletin/g.test(title))
            return 'ios-bookmarks-outline';
        else if (/Convention/g.test(title))
            return 'ios-briefcase-outline';
        else
            return 'ios-copy-outline';
    }

    _renderDocuments() {
        const { store: { ui } } = this.props;

        return (
            <ScrollView style={styles.container}>
                {
                    this.state.documents.map((document, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => ui.isConnected && Actions.pdf({ title: document.title, pdfUrl: document.fullpath })}
                            style={styles.cell}
                        >
                            <View style={styles.iconContainer}>
                                <IconIO name={this._renderIcon(document.title)} size={30} style={styles.icon}/>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>
                                    {_.truncate(document.title, { length: 50, seperator: '...' })}
                                </Text>
                                <Text style={styles.date}>{moment(document.ctime).format('LL')}</Text>
                                <Text style={styles.author}>Uploaded by {document.modifier.title}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        );
    }

    _renderNoDocument() {
        return (
            <View style={styles.noDocumentContainer}>
                <IconIO
                    name="ios-folder-open-outline"
                    size={100}
                    style={styles.alternativeIcon}
                />
                <Text style={styles.alternativeText}>
                    No documents available
                </Text>
            </View>
        );
    }

    renderLoadingIndicator() {
        return (
            <LoadingIndicator
                isVisible={!this.state.documents}
                message="Loading documents..."
            />
        );
    }

    render() {
        const { store: { ui } } = this.props;

        if (ui.currentState === ui.state.error) {
            return (
                <ConnectionError onPress={this.fetchDocuments}/>
            );
        }

        if (!this.state.documents || ui.currentState === ui.state.fetchingState) {
            return this.renderLoadingIndicator();
        }

        return (
            <Layout store={this.props.store}>
                {
                    this.state.documents.length > 0
                        ? this._renderDocuments()
                        : this._renderNoDocument()
                }
            </Layout>
        );
    }
};
