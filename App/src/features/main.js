/**
 * Created by jules on 20/01/17.
 */

import React, { Component } from 'react';
import { Router, Scene } from 'react-native-mobx';
import Login from './login/Login';
import Home from './home/Home'
import Calendar from './calendar/Calendar';
import store from '../stores';

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

class Main extends Component {
    render() {
        return (
            <Router store={store} getSceneStyle={getSceneStyle}>
                <Scene key="root">
                    <Scene key="login" hideNavBar component={Login} />
                    <Scene key="home" title="Dashboard" component={Home} hideNavBar={false}/>
                    <Scene initial key="calendar" title="Calendar" component={Calendar} />
                </Scene>
            </Router>
        );
    }
}

export default Main;
