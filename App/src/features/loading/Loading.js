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
    BackAndroid
} from 'react-native';
import {
    Container,
    Content,
} from 'native-base';
import LoadingIndicator from 'react-native-spinkit';
import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';

const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: "#2c3e50",
        flex: 1,
    },

    titleContainer: {
        flex: 1,
        justifyContent: 'center',
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

    slogan: {
        fontFamily: 'Nunito-ExtraLight',
        fontWeight: "100",
        color: "#FFFFFF",
        fontSize: 13.5,
        alignSelf: 'center',
    },

    loadingText: {
        fontFamily: 'Nunito-ExtraLight',
        fontSize: 14,
        marginTop: 20,
        color: 'white',
    }

});

@observer
export default class Loading extends Component {

    async componentWillMount() {
        const { store: { session, calendar, ranking } } = this.props;

        if (session.isLogged) {
            session.finishedLoading = false;
            await Promise.all([
                calendar.fetchCalendar(),
                session.userInformation(),
            ]);
            await ranking.selfRankPosition({ fromCache: true });

            session.finishedLoading = true;
            Actions.home();
        } else {
            console.error('This should never happen');
        }
    }

    render() {
        const { store: { session } } = this.props;

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
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}>
                        <LoadingIndicator
                            isVisible={!session.finishedLoading}
                            color="white"
                            type="9CubeGrid"
                            size={100}
                        />
                        <Text style={styles.loadingText}>Loading your data... Please wait.</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}
