/**
 * Created by jules on 20/01/17.
 **/

import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Router, Scene } from 'react-native-mobx';
import Login from './login/Login';
import Home from './home/Home'
import Calendar from './calendar/Calendar';
import Activity from './calendar/Activity/Activity';
import AvailableSlots from './calendar/Activity/slots/AvailableSlots';
import News from './news/News';
import Projects from './projects/Projects';
import ProjectDetails from './projects/ProjectDetails';
import Marks from './marks/Marks';
import MarkDetails from './marks/MarkDetails';
import Stats from './stats/Stats';
import Token from './token/Token';
import Ranking from './ranking/Ranking';
import store from '../stores';
import _ from 'lodash';

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

const getHeaderStyle = () => {
    return { backgroundColor: '#233445', elevation: 5, borderBottomWidth: 0 }
};

const getTitleStyle = () => {
    return { color: '#FFFFFF', marginTop: -3}
};

const getImageStyle = () => {
    return { width: 20, height: 20, marginRight: 5}
};

/*
* type 'reset' on Login Scene forces all scenes to unmount when logging out.
* This prevents mobx from re-rendering Home scene when logging in again (by changing variable that Home observes)
* even though the scene is not in foreground, and therefore causing the app to crash.
*/

class Main extends Component {
    render() {
        return (
            <Router
                store={store}
                getSceneStyle={getSceneStyle}
                navigationBarStyle={getHeaderStyle()}
                titleStyle={getTitleStyle()}
                backButtonImage={ require(`../assets/left-arr.png`)}
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
                        onRight={() => store.ranking.computePromotion({ refreshCache: true })}
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

                </Scene>
            </Router>
        );
    }
}

export default Main;
