import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import {
    Container,
    Content,
    InputGroup,
    Input,
    Icon,
    Button,
} from 'native-base';
import { observable } from 'react-native-mobx';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import backgroundSource from '../../assets/background.png';
import logoSource from '../../assets/logo.png';
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
                <Content contentContainerStyle={{
                    flex: 1
                }}>
                    <Image source={backgroundSource} style={styles.backgroundImage}>

                        <View style={styles.emptyBox}>

                            <Image source={logoSource} style={styles.logoImage} />

                            <View style={styles.forgroundTitleBox}>

                                <Text style={styles.boxTitle}>
                                    <Text style={styles.title}>Dashboard</Text>
                                    <Text style={styles.subTitle}> Epitech</Text>
                                </Text>

                            </View>

                        </View>

                        <View style={{flex: 0.15}}/>

                        <View  style={{ flex: 0.45, justifyContent: 'center'}}>
                            <InputGroup>

                                <Icon name="ios-mail-outline" style={styles.iconInputMail} />
                                <Input
                                    maxLength={40}
                                    keyboardType="email-address"
                                    spellCheck={false}
                                    multiline={false}
                                    placeholder="Email Address"
                                    placeholderTextColor="#FFFFFF"
                                    style={styles.mailInput}
                                    onChangeText={(text) => this.setState({ username: text })}
                                    onSubmitEditing={() => { this.passwordInput._root.focus()} }
                                />

                            </InputGroup>

                            <InputGroup>

                                <Icon name="ios-lock-outline" style={styles.iconInputPwd} />
                                <Input
                                    ref={(input) => this.passwordInput = input}
                                    multiline={false}
                                    maxLength={8}
                                    placeholder="Unix Password"
                                    placeholderTextColor="#FFFFFF"
                                    secureTextEntry
                                    style={styles.pwdInput}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    onSubmitEditing={this.login}
                                />

                            </InputGroup>

                            { this.renderUserNotLogged() }

                            <Button
                                title="Login"
                                transparent
                                large
                                style={{ alignSelf: 'center', marginTop: 25 }}
                                onPress={this.login}
                                disabled={ui.currentState == ui.state.fetching}
                            >
                                <Icon name="md-finger-print" style={styles.iconButton} />
                            </Button>
                        </View>
                    </Image>
                </Content>
            </Container>
        );
    }
}
