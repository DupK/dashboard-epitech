/**
 * Created by jules on 20/01/17.
 **/

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-mobx';
import Login from './login/Login';
import Home from './home/Home'
import Calendar from './calendar/Calendar';
import Loading from './loading/Loading';
import News from './news/News';
import Projects from './projects/Projects';
import Marks from './marks/Marks';
import MarkDetails from './marks/MarkDetails';
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
        style.marginTop = computedProps.hideNavBar ? 0 : 54;
    }
    return style;
};

const getHeaderStyle = () => {
    return { backgroundColor: '#2c3e50', }
};

const getTitleStyle = () => {
    return { color: '#FFFFFF', fontFamily: 'Nunito-Light', marginTop: -3}
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
                        key="login"
                        hideNavBar={true}
                        component={Login}
                        type="reset"
                    />

                    <Scene
                        key="home"
                        title="Home"
                        hideNavBar={false}
                        component={Home}
                        panHandlers={null}
                        hideBackImage={true}
                        onBack={_.noop}
                        onRight={_.noop}
                        rightButtonImage={ require('../assets/reload.png')}
                        rightButtonIconStyle={getImageStyle()}
                    />

                    <Scene
                        key="calendar"
                        title="Calendar"
                        component={Calendar}
                        panHandlers={null}
                    />

                    <Scene
                        key="loading"
                        title="Loading"
                        hideNavBar={true}
                        component={Loading}
                    />

                    <Scene
                        key="news"
                        title="News"
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
                        initial
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
                        title="Token"
                        hideNavBar={false}
                        component={Token}
                    />

                </Scene>
            </Router>
        );
    }
}

export default Main;
