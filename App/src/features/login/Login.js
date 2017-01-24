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
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2c3e50',
        flex: 1,
    },
});

@observer
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    state = {
        username: '',
        password: '',
    };

    async login() {
        const { store: { ui, authentication, session } } = this.props;

        ui.fetchingState();
        await authentication.login(this.state.username, this.state.password);
        if (authentication.isLogged) {
            await session.fetchBaseInformation();
            ui.defaultState();
            Actions.home();
        }
    }

    renderLoginSpinner() {
        const { store: { ui } } = this.props;

        if (ui.currentState !== ui.state.fetching) {
            return null;
        }

        return <Spinner/>
    }

    renderFetchingUserInformation() {
        const { store: { ui, authentication } } = this.props;

        if (ui.currentState === ui.state.fetching && authentication.isLogged) {
            return <Text>Retrieving all information...</Text>;
        }

        return null;
    }

    render() {
        const { store: { ui } } = this.props;

        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: 'red',
                    flexDirection: 'column',
                    borderWidth: 1
                }}>
                    <Text>Login page</Text>
                    <Button
                        title="Login"
                        style={{ alignSelf: 'center', marginTop: 20 }}
                        onPress={this.login}
                        disabled={ui.currentState == ui.state.fetching}
                    >
                        Login
                    </Button>
                    { this.renderLoginSpinner() }
                    { this.renderFetchingUserInformation() }
                </Content>
            </Container>
        );
    }
}