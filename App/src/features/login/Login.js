import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    Image,
    Alert,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Animated,
    Easing,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import {
    Container,
    Content,
    Button,
} from 'native-base';
import { observable } from 'react-native-mobx';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import backgroundSource from '../../assets/wallpaper.jpg';
import logoSource from '../../assets/epitech.png';
import styles from './styles.js';

const AnimatedButton = Animated.createAnimatedComponent(Button);

@observer
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            animating: false,
            loginMessage: '',
        };

        this.buttonWidth = new Animated.Value(0);
        this.buttonScale = new Animated.Value(0);

        this.login = this.login.bind(this);
    }

    async componentWillMount() {
        const { store: { session } } = this.props;
        this.buttonWidth.setValue(0);
        this.buttonScale.setValue(0);

        //  await session.login();

        if (session.isLogged) {
            //Actions.loading();
        }
    }

    login() {

        if (!this.state.username.length || !this.state.password.length) {
            return Promise.resolve(false);
        }

        const {
            store: { ui, session, calendar, ranking, marks, projects }
        } = this.props;

        ui.fetchingState();

        Animated.timing(
            this.buttonWidth,
            {
                toValue: 1,
                duration: 400,
                easing: Easing.linear
            }
        ).start(() => {
            this.setState({ animating: true, loginMessage: 'Login in ...' }, async () => {
                await session.login(this.state.username, this.state.password);

                if (session.isLogged) {
                    this.setState({ loginMessage: 'Fetching data ...' });

                    await Promise.all([
                        calendar.fetchCalendar(),
                        session.userInformation(),
                        projects.fetchProjects(),
                    ]);
                    await Promise.all([
                        marks.fetchMarks(session.username),
                        ranking.selfRankPosition({ fromCache: true }),
                    ]);

                    this.setState({ animating: false, loginMessage: '' }, () => {
                        Animated.timing(
                            this.buttonScale,
                            {
                                toValue: 1,
                                duration: 600,
                                easing: Easing.in(Easing.quad)
                            }
                        ).start(() => ui.defaultState() || Actions.home());
                    });
                } else {
                    ui.errorState();
                }
            });
        });
    }

    render() {
        const { store: { ui } } = this.props;
        const { width } = Dimensions.get('window');

        const buttonWidth = this.buttonWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [width - 60, 40],
        });

        const textOpacity = this.buttonWidth.interpolate({
            inputRange: [0, 0.3],
            outputRange: [1, 0],
        });

        const buttonRadius = this.buttonWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [5, 50],
        });

        const buttonScale = this.buttonScale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 300],
        });

        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Image source={backgroundSource}
                           style={{ width: null, height: null, flex: 1 }}
                           resizeMode='cover'>
                        <View style={{ flex: 1, backgroundColor: 'rgba(45, 45, 45, 0.65)', }}>
                            <View style={{ flex: 20 }}/>
                            <View style={{
                                flex: 50,
                                alignItems: 'center',
                                zIndex: 0,
                            }}>
                                <Image source={ logoSource }
                                       style={{
                                           width: 60,
                                           height: 60,
                                       }}
                                />
                                <Text style={{
                                    color: '#FFFFFF',
                                    marginTop: 10,
                                }}>
                                    <Text>Dashboard&nbsp;</Text>
                                    <Text style={{ fontWeight: 'bold' }}>Epitech</Text>
                                </Text>
                            </View>
                            <View style={{
                                flex: 70,
                            }}>
                                <View
                                    behavior="padding"
                                    style={{
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <TextInput
                                        maxLength={40}
                                        keyboardType="email-address"
                                        spellCheck={false}
                                        multiline={false}
                                        placeholder="Email address"
                                        placeholderTextColor="rgba(255, 255, 255, 1)"
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => this.setState({ username: text })}
                                        onSubmitEditing={() => this.passwordInput.focus() }
                                        style={{
                                            color: '#FFF',
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: 5,
                                            marginLeft: 30,
                                            marginRight: 30,
                                            fontSize: 12,
                                            textAlign: 'center',
                                            height: 35,
                                        }} />
                                    <TextInput
                                        ref={(input) => this.passwordInput = input}
                                        onChangeText={(text) => this.setState({ password: text })}
                                        onSubmitEditing={this.login}
                                        multiline={false}
                                        maxLength={8}
                                        secureTextEntry
                                        placeholder="Unix Password"
                                        placeholderTextColor="rgba(255, 255, 255, 1)"
                                        underlineColorAndroid="transparent"
                                        style={{
                                            color: '#FFF',
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            borderRadius: 5,
                                            marginLeft: 30,
                                            marginRight: 30,
                                            fontSize: 12,
                                            textAlign: 'center',
                                            height: 35,
                                            marginTop: 5,
                                        }} />
                                    <AnimatedButton
                                        style={{
                                            backgroundColor: 'rgba(35, 52, 69, 1)',
                                            borderWidth: 1,
                                            borderColor: 'rgba(35, 52, 69, 0.7)',
                                            alignSelf: 'center',
                                            width: buttonWidth,
                                            borderRadius: buttonRadius,
                                            transform: [{ scale: buttonScale }],
                                            marginTop: 20,
                                        }}
                                        title="Login"
                                        onPress={this.login}
                                        disabled={ui.currentState == ui.state.fetching}
                                    >
                                        {
                                            !this.state.animating
                                                ? (
                                                    <Animated.Text
                                                        style={{
                                                            color: '#FFF',
                                                            fontSize: 12,
                                                            opacity: textOpacity
                                                        }}>
                                                        Login
                                                    </Animated.Text>
                                                )
                                                : (
                                                    <ActivityIndicator
                                                        animating={this.state.animating}
                                                        color="#FFFFFF"
                                                    />
                                                )
                                        }
                                    </AnimatedButton>
                                </View>
                                <View style={{ flex: 0.6 }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontFamily: 'Nunito-Light',
                                            fontSize: 15,
                                            alignSelf: 'center',
                                            marginTop: 15,
                                        }}
                                    >
                                        { this.state.loginMessage }
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Image>
                </Content>
            </Container>
        );
    }
}
