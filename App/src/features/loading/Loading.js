/**
 * Created by jules on 26/01/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
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
import styles from './styles.js';
import backgroundSource from '../../assets/wallpaper.jpg';

@observer
export default class Loading extends Component {

    async componentWillMount() {
        const { store: { session, calendar, ranking, marks, projects } } = this.props;

        if (session.isLogged) {
            session.finishedLoading = false;
            await Promise.all([
                calendar.fetchCalendar(),
                session.userInformation(),
                projects.fetchProjects(),
            ]);
            await Promise.all([
                marks.fetchMarks(session.username),
                ranking.selfRankPosition({ fromCache: true }),
            ]);

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

                    <Image source={backgroundSource}
                           style={{
                               width: 360,
                               height: 615,
                           }}
                    >

                        <View style={{ flex: 1, backgroundColor: 'rgba(45, 45, 45, 0.65)'}}>

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
                            color="#FFFFFF"
                            type="Pulse"
                            size={100}
                        />
                    </View>

                        </View>

                    </Image>

                </Content>
            </Container>
        );
    }
}
