/**
 * Created by jules on 20/01/17.
 **/

import React, { Component } from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import { Router, Scene } from 'react-native-mobx';
import Login from './login/Login';
import Home from './home/Home';
import Calendar from './calendar/Calendar';
import Activity from './calendar/Activity/Activity';
import AvailableSlots from './calendar/Activity/slots/AvailableSlots';
import News from './news/News';
import Projects from './projects/Projects';
import ProjectDetails from './projects/Details/ProjectDetails';
import PDFViewer from './projects/Details/PDFViewer';
import Marks from './marks/Marks';
import MarkDetails from './marks/MarkDetails';
import Stats from './stats/Stats';
import Token from './token/Token';
import Ranking from './ranking/Ranking';
import Links from './links/Links';
import Documents from './documents/Documents';

import store from '../stores';
import _ from 'lodash';

const styles = StyleSheet.create({
    headerAndroid: {
        backgroundColor: '#233445',
        elevation: 5,
        borderBottomWidth: 0,
    },

    headerIOS: {
        backgroundColor: '#233445',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 1.5,
        shadowOpacity: 0.5,
        borderBottomWidth: 0,
    },
});

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : Platform.OS === 'android' ? 54 : 64;
    }
    return style;
};

const getTitleStyle = () => {
    return { color: '#FFFFFF', marginTop: -3 }
};

const getImageStyle = () => {
    return { width: 20, height: 20, marginRight: 5 }
};

/*
 * type 'reset' on Login Scene forces all scenes to unmount when logging out.
 * This prevents mobx from re-rendering Home scene when logging in again (by changing variable that Home observes)
 * even though the scene is not in foreground, and therefore causing the app to crash.
 */

class Main extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <Router
                    store={store}
                    getSceneStyle={getSceneStyle}
                    navigationBarStyle={Platform.OS === 'ios' ? styles.headerIOS : styles.headerAndroid}
                    titleStyle={getTitleStyle()}
                    backButtonImage={ require(`../assets/left-arr.png`) }
                >

                    <Scene key="root">

                        <Scene
                            initial
                            key="login"
                            hideNavBar={true}
                            component={Login}
                            type="reset"
                        />

                        <Scene
                            key="home"
                            component={Home}
                            panHandlers={null}
                            hideBackImage={true}
                            hideNavBar
                            onBack={_.noop}
                            onRight={_.noop}
                            type="reset"
                            statusBarStyle="light-content"
                        />

                        <Scene
                            key="calendar"
                            title="Calendar"
                            hideNavBar={false}
                            component={Calendar}
                            panHandlers={null}
                        />

                        <Scene
                            key="activity"
                            hideNavBar={false}
                            component={Activity}
                        />

                        <Scene
                            key="availableSlots"
                            hideNavBar={false}
                            component={AvailableSlots}
                        />

                        <Scene
                            key="news"
                            title="Notifications"
                            hideNavBar={false}
                            component={News}
                        />

                        <Scene
                            key="projects"
                            title="Projects"
                            hideNavBar={false}
                            component={Projects}
                        />

                        <Scene
                            key="projectDetails"
                            title="projects-details"
                            hideNavBar={false}
                            component={ProjectDetails}
                        />

                        <Scene
                            key="pdf"
                            title="pdf"
                            hideNavBar={false}
                            component={PDFViewer}
                        />

                        <Scene
                            key="marks"
                            title="Marks"
                            hideNavBar={false}
                            component={Marks}
                        />

                        <Scene
                            key="markDetails"
                            title="marks-details"
                            hideNavBar={false}
                            component={MarkDetails}
                            onRight={() => store.marks.sort()}
                            rightButtonImage={require('../assets/sort.png')}
                            rightButtonIconStyle={getImageStyle()}
                        />

                        <Scene
                            key="ranking"
                            title="Ranking"
                            hideNavBar={false}
                            component={Ranking}
                            onRight={() => {
                                if (store.ui.isConnected) {
                                    return store.ranking.computePromotion({ refreshCache: true })
                                }
                            }}
                            rightButtonImage={require('../assets/reload.png')}
                            rightButtonIconStyle={getImageStyle()}
                        />

                        <Scene
                            key="token"
                            title="Tokens"
                            hideNavBar={false}
                            component={Token}
                        />

                        <Scene
                            key="stats"
                            title="Statistics"
                            hideNavBar={false}
                            component={Stats}
                        />

                        <Scene
                            key="links"
                            title="Links"
                            hideNavBar={false}
                            component={Links}
                        />

                        <Scene
                            key="documents"
                            title="Documents"
                            hideNavBar={false}
                            component={Documents}
                        />

                    </Scene>
                </Router>
            </View>
        );
    }
}

export default Main;
