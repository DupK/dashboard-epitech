import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
} from 'react-native';
import {
    Container,
    Content,
    InputGroup,
    Input,
    Icon,
    Button,
    Spinner
} from 'native-base';
import { observable } from 'react-native-mobx';
import { observer } from 'mobx-react/native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2c3e50',
        flex: 1,
    },
});

@observer
export default class LoginDark extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    state = {
        username: '',
        password: '',
    };

    login() {
        this.props.store.login(this.state.username, this.state.password);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text>Login page</Text>
                </Content>
            </Container>
        );
    }
}