/**
 * Created by jules on 26/01/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    ProgressBarAndroid,
} from 'react-native';
import {
    Container,
    Content,
    Icon,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';

const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: "#2c3e50",
        flex: 1,
    },

    titleContainer: {
        flex: 0.5,
        justifyContent: 'flex-end',
    },

    loadingContainer: {
        flex: 0.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    loadingSubContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    mainTitle: {
        alignSelf: 'center',
        fontFamily: 'Nunito-ExtraLight',
        color: "#FFFFFF",
        fontSize: 20,
    },

    title: {
        fontWeight: 'bold',
    },

    fetchingTitle: {
        fontFamily: 'Nunito-ExtraLight',
        color: "#FFFFFF",
        fontSize: 14,
    },

    iconFetching: {
        color: "#FFFFFF",
    },

    progressBarFetch: {
        width: 300,
        height: 40,
    },

    slogan: {
        fontFamily: 'Nunito-ExtraLight',
        fontWeight: "100",
        color: "#FFFFFF",
        fontSize: 13.5,
        alignSelf: 'center',
    },

});

@observer
export default class Loading extends Component {

    async componentWillMount() {
        const { store: { session, calendar } } = this.props;

        if (session.isLogged) {
            await calendar.fetchCalendar();
            Actions.home();
        } else {
            console.error('This should never happen');
        }
    }

    render() {
        return (
            <Container style={ styles.mainContainer }>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <View style={ styles.titleContainer }>
                        <Text style={ styles.mainTitle }>
                            <Text style={ styles.title }>Dashboard</Text>&nbsp;
                            <Text>Epitech</Text>
                        </Text>
                        <Text style={ styles.slogan }>An Epitech Intranet</Text>
                    </View>
                    <View style={ styles.loadingContainer }>
                        <View style={ styles.loadingSubContainer }>
                            <Icon name="md-cloud-download" style={ styles.iconFetching } />
                            <Text style={ styles.fetchingTitle }>&nbsp;
                                Fetching data...
                            </Text>
                        </View>
                        <View>
                            <ProgressBarAndroid
                                style={ styles.progressBarFetch }
                                styleAttr="Horizontal"
                                color="#FFFFFF"
                            />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
