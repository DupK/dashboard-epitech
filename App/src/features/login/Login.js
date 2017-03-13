import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import {
    Container,
    Content,
} from 'native-base';
import { observable } from 'react-native-mobx';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import backgroundSource from '../../assets/fond.jpg';
import logoSource from '../../assets/epitech.png';

import BackgroundImageWithOverlay from './BackgroundImage';
import LogoBox from './LogoBox';
import LoginMessage from './LoginMessage';
import LoginInput from './LoginInput';
import AnimatedButton from './AnimatedButton';

@observer
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loginMessage: '',
        };

        this.login = this.login.bind(this);
        this.onAnimationEnd = this.onAnimationEnd.bind(this);
        this.onAnimationEndError = this.onAnimationEndError.bind(this);
        this.worthStartingAnimation = this.worthStartingAnimation.bind(this);
    }

    async componentDidMount() {
        try {
            this.animatedButton.animate();
        } catch (e) {
            console.error(e);
        }
    }

    async worthStartingAnimation() {
        const { store: { session } } = this.props;
        const hasAutoLogin = !!(await session.getAutologinFromCache());

        return hasAutoLogin || (this.state.username.length && this.state.password.length);
    }

    async fetchRequiredData() {
        const {
            store: {ui, session, calendar, ranking, marks, projects}
        } = this.props;

        try {
            await Promise.all([
                calendar.fetchCalendar(),
                session.userInformation(),
                projects.fetchProjects(),
            ]);
            await Promise.all([
                marks.fetchMarks(session.username),
                ranking.selfRankPosition({ fromCache: true }),
            ]);

            ui.defaultState();
            return true;
        } catch(e) {
            ui.defaultState();
            console.log(e);
            return false;
        }
    }

    async login() {
        const {
            store: { ui, session }
        } = this.props;

        ui.fetchingState();
        this.setState({loginMessage: 'Login in ...'});

        try {
            await session.login(this.state.username, this.state.password);
            if (session.isLogged) {
                this.setState({ loginMessage: 'Fetching data ...' });

                const response = await this.fetchRequiredData();

                return Promise.resolve(response);
            } else {
                return Promise.resolve(false);
            }
        } catch (_) {
            return Promise.resolve(false);
        }
    }

    onAnimationEndError() {
        this.setState({ loginMessage: ''});
    }

    onAnimationEnd() {
        this.setState({ loginMessage: '' }, () => {
            Actions.home();
        });
    }

    render() {
        const { store: { ui } } = this.props;
        const { width } = Dimensions.get('window');

        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <BackgroundImageWithOverlay
                        source={backgroundSource}
                        colorOverlay="rgba(45, 45, 45, 0)"
                    >
                        <View style={styles.topEmptyBox} />
                        <View style={styles.loginBoxContainer}>
                            <View style={styles.inputsContainer}>
                                <LoginInput
                                    maxLength={40}
                                    placeholder="Email address"
                                    keyboardType="email-address"
                                    editable={ui.currentState !== ui.state.fetchingState}
                                    onChangeText={(text) => this.setState({ username: text })}
                                    onSubmitEditing={() => this.passwordInput.nativeInput.focus() }
                                />
                                <LoginInput
                                    ref={(input) => this.passwordInput = input}
                                    maxLength={8}
                                    placeholder="Unix Password"
                                    secureTextEntry
                                    editable={ui.currentState !== ui.state.fetchingState}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    onSubmitEditing={() => this.animatedButton.animate()}
                                />
                                <AnimatedButton
                                    ref={(button) => this.animatedButton = button}
                                    title="Login"
                                    errorTitle="Could not log in"
                                    width={width - 60}
                                    onPress={this.login}
                                    onAnimationEnd={this.onAnimationEnd}
                                    onAnimationEndError={this.onAnimationEndError}
                                    worthStartingAnimation={this.worthStartingAnimation}
                                />
                            </View>
                            <View style={{ flex: 0.1     }}>
                                <LoginMessage message={this.state.loginMessage} />
                            </View>
                        </View>
                    </BackgroundImageWithOverlay>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    topEmptyBox: {
        flex: 20
    },

    loginBoxContainer: {
        flex: 70,
    },

    inputsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});
