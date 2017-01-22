import React, { Component, PropTypes as t } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
} from 'react-native';
import { Container, Content, InputGroup, Input, Icon, Button } from 'native-base';

const login_style = StyleSheet.create({

    container: {
        backgroundColor: '#2c3e50',
        flex: 1
    }

});

export default class LoginDark extends Component {

    state = {
        username: '',
        password: '',
    };

    connect() {
       // await connec(username, password);

        this.props.navigator.push({ name: 'home' });
    }

    renderUsername() {
        if (this.state.username && this.state.password) {
            return <Text>{this.state.username}</Text>;
        }

        return null;
    }

    render() {

        return (
            <Container style={login_style.container}>
                <Content>
                    <InputGroup>
                        <Icon name='ios-home'/>
                        <Input onChangeText={(text) => this.setState({ username: text })}/>
                    </InputGroup>
                    <InputGroup>
                        <Icon name='ios-home'/>
                        <Input
                            secureTextEntry
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                    </InputGroup>

                    <Button onPress={this.connect.bind(this)}>Connect</Button>
                    { this.renderUsername() }
                </Content>
            </Container>

        );

    }

}

LoginDark.propTypes = {
    navigator: t.any,
};
