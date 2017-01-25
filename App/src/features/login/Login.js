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
import backgroundSource from '../../assets/background.png';
import logoSource from '../../assets/logo.png';



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2c3e50',
        flex: 1,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: null,
        height: null,
    },

    logoImage: {
        alignSelf: 'center',
        width: 90,
        height: 90,
        resizeMode: 'contain',
        marginBottom: 20,
    },

    boxTitle: {
        margin: 3,
        alignSelf: 'center',
        fontFamily: 'Nunito-ExtraLight',
        color: "#FFFFFF",
        fontSize: 20,
    },

    title: {
        fontWeight: 'bold',
    },

    subTitle: {

    },

    iconButton: {
        color: "#FFFFFF",
        fontSize: 40,
    },

    iconInputMail: {
        color: "#FFFFFF",
        marginLeft: 13,
    },

    iconInputPwd: {
        color: "#FFFFFF",
        marginLeft: 16,
    },

    pwdInput: {
        fontSize: 13,
        color: "#FFFFFF",
        fontFamily: "Nunito-Light",
        marginLeft: 15,
    },

    mailInput: {
        fontSize: 13,
        color: "#FFFFFF",
        fontFamily: "Nunito-Light",
        marginLeft: 15,
    },

    emptyBox: {
        justifyContent: 'flex-end',
        flex: 0.4,
    },

    forgroundTitleBox: {
        backgroundColor: 'rgba(44, 62, 80, 0.26)',
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

        return null;
    }

    renderFetchingUserInformation() {
        const { store: { ui, authentication } } = this.props;

        if (ui.currentState === ui.state.fetching && authentication.isLogged) {
            return null;
        }

        return null;
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

                        <View style={{ flex: 0.6, justifyContent: 'center'}}>


                            <InputGroup>

                                <Icon name="ios-mail-outline" style={styles.iconInputMail} />
                                <Input
                                    placeholder="Email Address"
                                    placeholderTextColor="#FFFFFF"
                                    style={styles.mailInput}
                                />

                            </InputGroup>

                            <InputGroup>

                                <Icon name="ios-lock-outline" style={styles.iconInputPwd} />
                                <Input
                                    placeholder="Unix Password"
                                    placeholderTextColor="#FFFFFF"
                                    secureTextEntry
                                    style={styles.pwdInput}
                                />

                            </InputGroup>

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
                            { this.renderLoginSpinner() }
                            { this.renderFetchingUserInformation() }

                        </View>
                    </Image>
                </Content>
            </Container>
        );
    }
}
