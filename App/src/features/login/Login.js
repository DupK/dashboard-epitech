import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    Alert,
    ScrollView,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import {
    Container,
    Content,
    Input,
    Button,
} from 'native-base';
import { observable } from 'react-native-mobx';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import backgroundSource from '../../assets/wallpaper.jpg';
import logoSource from '../../assets/epitech.png';
import styles from './styles.js';

@observer
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.login = this.login.bind(this);
    }

    async componentWillMount() {
        const { store: { session } } = this.props;

        await session.login();

        if (session.isLogged) {
            Actions.loading();
        }
    }

    async login() {
        if (!this.state.username.length || !this.state.password.length) {
            return Promise.resolve(false);
        }

        const { store: { ui, session } } = this.props;

        await session.login(this.state.username, this.state.password);

        if (session.isLogged) {
            Actions.loading();
        } else {
            ui.errorState();
        }
    }

    renderUserNotLogged() {
        const { store: { ui } } = this.props;

        if (ui.currentState !== ui.state.error) {
            return null;
        }

        return <Text style={styles.notLoggedMessage}>Could not connect to intranet</Text>;
    }

    render() {
        const { store: { ui } } = this.props;

        return (

            <Container style={styles.container}>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Image source={backgroundSource} style={{ width: 360, height: 615, }} >
                        <View style={{ flex: 100, backgroundColor: 'rgba(45, 45, 45, 0.65)', }}>
                            <View style={{ flex: 20 }}/>
                            <View style={{ flex: 20 }}>
                                <Image source={ logoSource }
                                       style={{
                                           alignSelf: 'center',
                                           justifyContent: 'center',
                                           width: 60,
                                           height: 60,
                                       }}/>
                            </View>
                            <View style={{ flex: 60 }}>
                                <Text style={{
                                    color: '#FFFFFF',
                                    alignSelf: 'center',
                                    marginTop: 10
                                }}>
                                    <Text>Dashboard </Text>
                                    <Text style={{ fontWeight: 'bold' }}>Epitech</Text>
                                </Text>
                            </View>
                            <View style={{ flex: 70, }}>
                                <KeyboardAvoidingView behavior="padding" style={{ flex: 0.22, }}>
                                    <Input
                                        maxLength={40}
                                        keyboardType="email-address"
                                        spellCheck={false}
                                        multiline={false}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255, 255, 255, 1)"
                                        onChangeText={(text) => this.setState({ username: text })}
                                        onSubmitEditing={() => { this.passwordInput._root.focus()} }
                                        style={{
                                            color: '#FFF',
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: 5,
                                            marginLeft: 30,
                                            marginRight: 30,
                                            fontSize: 12,
                                            textAlign: 'center',
                                    }} />
                                </KeyboardAvoidingView>
                                <View style={{ flex: 0.5, }}>
                                    <Input
                                        ref={(input) => this.passwordInput = input}
                                        onChangeText={(text) => this.setState({ password: text })}
                                        onSubmitEditing={this.login}
                                        multiline={false}
                                        maxLength={8}
                                        secureTextEntry
                                        placeholder="Unix Password"
                                        placeholderTextColor="rgba(255, 255, 255, 1)"
                                        style={{
                                            color: '#FFF',
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: 5,
                                            marginLeft: 30,
                                            marginRight: 30,
                                            fontSize: 12,
                                            textAlign: 'center',
                                        }} />
                                    <Button
                                        style={{
                                            backgroundColor: 'rgba(35, 52, 69, 0.7)',
                                            borderWidth: 1,
                                            borderColor: 'rgba(35, 52, 69, 0.7)',
                                            alignSelf: 'center',
                                            width: 300,
                                            borderRadius: 5,
                                            elevation: 0,
                                        }}
                                        title="Login"
                                        onPress={this.login}
                                        disabled={ui.currentState == ui.state.fetching}
                                    >
                                        <Text style={{ color: '#FFF',  fontSize: 12 }}>Login</Text>
                                    </Button>
                                </View>
                                <View style={{ flex: 0.5 }}>
                                </View>
                            </View>
                        </View>
                    </Image>
                </Content>
            </Container>

        );
    }
}
