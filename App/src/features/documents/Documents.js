/**
 * Created by jules on 28/04/2017.
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Layout from '../../shared/components/Layout';
import IconIO from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 8,
        backgroundColor: '#233445',
    },

    cell: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        margin: 8,
        padding: 10,
        backgroundColor: '#203040',
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

    alternativeContainer: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 60,
        justifyContent: 'center',
    },

    alternativeIcon: {
        color: '#203040',
        alignSelf: 'center',
    },

    alternativeText: {
        marginTop: 10,
        color:'#203040',
        alignSelf: 'center',
        fontSize: 15
    },
});

@observer
export default class Documents extends Component {

    constructor(props) {
        super(props);
        this._renderIcon = this._renderIcon.bind(this);
    }

    _renderIcon(title) {
        if (/Bulletin/g.test(title))
            return 'ios-bookmarks-outline';
        else if (/Convention/g.test(title))
            return 'ios-briefcase-outline';
        else
            return 'ios-copy-outline';
    }

    render() {
        const { store: { session } } = this.props;
        const documents = session.userProfile.documents.slice();

        return (
            <Layout store={this.props.store}>
                <ScrollView style={styles.container}>
                    {
                        documents.length > 0 ?
                        documents.map((document, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => Actions.pdf({ title: document.title, pdfUrl: document.fullpath })}
                                style={styles.cell}>
                                    <View style={styles.iconContainer}>
                                        <IconIO name={this._renderIcon(document.title)} size={30} style={styles.icon} />
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>{_.truncate(document.title, { length: 50, seperator: '...'})}</Text>
                                        <Text style={styles.date}>{moment(document.ctime).format('LL')}</Text>
                                        <Text style={styles.author}>Upload by {document.modifier.title}</Text>
                                    </View>
                            </TouchableOpacity>
                        )) :
                            <View style={styles.alternativeContainer}>
                                <IconIO
                                    name="ios-folder-open-outline"
                                    size={100}
                                    style={styles.alternativeIcon}
                                />
                                <Text style={styles.alternativeText}>
                                    No documents available
                                </Text>
                            </View>
                    }
                </ScrollView>
            </Layout>
        );
    }
};
