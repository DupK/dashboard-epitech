/**
 * Created by jules on 20/01/17.
 */

import React, { Component } from 'react';
import { Navigator } from 'react-native';
import { Container, Content } from 'native-base';

import HeaderLight from './header/header_light';
import routes from './routes';

class Main extends Component {

    renderScene(route, navigator) {
        return (
            <Container>
                <Content style={{ flex: 1 }}>
                    <HeaderLight />
                    { routes[route.name](navigator) }
                </Content>
            </Container>
        );
    }

    render() {
        return (
            <Navigator
                style={{ flex: 1 }}
                initialRoute={{ name: 'login' }}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }

}

export default Main;