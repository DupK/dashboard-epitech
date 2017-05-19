import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, WebView } from 'react-native';
import { observable } from 'react-native-mobx';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingIndicator from 'react-native-spinkit';

import { fetchOffice365Link } from '../../api/intra';
import backgroundSource from '../../assets/fond.jpg';
import Layout from '../../shared/components/Layout';
import BackgroundImageWithOverlay from './BackgroundImage';
import LoginMessage from './LoginMessage';

const LOGIN_STATE = {
    Webview: 'Webview',
    Login: 'Login'
};

@observer
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loginMessage: '',
            loggingIn: false,
            loginState: LOGIN_STATE.Login,
            redirect: '',
        };

        this.fetchUserData = this.fetchUserData.bind(this);
        this.onUrlChange = this.onUrlChange.bind(this);
        this.loginWithOffice365 = this.loginWithOffice365.bind(this);
    }

    async componentWillMount() {
        const { store: { session } } = this.props;

        try {
            const isEverythingCached = await session.hasEverythingCached();

            session.resetSession();

            if (isEverythingCached) {
                await this.retrieveDataFromCache();
            }

        } catch (e) {
            console.error(e);
        }
    }

    async retrieveDataFromCache() {
        const {
            store: { session, calendar, ranking, marks, projects }
        } = this.props;

        try {

            this.setState({
                loggingIn: true,
                loginMessage: 'Retrieving data from cache...'
            });

            //set session first as most of others stores needs fields from it
            await session.retrieveSessionFromCache();

            await Promise.all([
                calendar.retrieveCalendarFromCache(),
                projects.retrieveProjectsFromCache(),
                marks.retrieveMarksFromCache(),
                ranking.selfRankPosition({ fromCache: true }),
            ]);

            Actions.home();
        } catch (e) {
            console.error(e);
        }
    }

    async fetchUserData() {
        const {
            store: { calendar, marks, projects }
        } = this.props;

        try {

            this.setState({ loginMessage: 'Fetching data ...' });

            await Promise.all([
                calendar.fetchCalendar(),
                projects.fetchProjects(),
                marks.fetchMarks(),
            ]);

            this.setState({ loginMessage: '' });
            Actions.home();
        } catch (e) {
            console.error(e);
        }
    }

    async onUrlChange(e) {
        const { store: { session } } = this.props;
        const redirectUri = e.url;

        if (/https:\/\/intra.epitech.eu\/auth\/office365.*/g.test(redirectUri)) {

            this.setState({
                loginState: LOGIN_STATE.Login,
                loginMessage: 'Login in ...',
            });

            await session.loginWithOffice365(redirectUri);
            await this.fetchUserData();
        }
    }

    async loginWithOffice365() {
        const { store: { session } } = this.props;

        try {

            this.setState({
                loggingIn: true,
                loginMessage: 'Redirecting towards Office 365...',
            }, async () => {
                try {
                    let response = await fetchOffice365Link();

                    // Prevent cases when storage is corrupted and user is still logged in
                    if (response && response.ip && response.board) {
                        await session.logout();
                        response = await fetchOffice365Link();
                    }

                    this.setState({
                        loginState: LOGIN_STATE.Webview,
                        redirect: response.office_auth_uri,
                    });
                } catch (e) {
                    console.log('Login.js', e);
                    this.setState({
                        loginState: LOGIN_STATE.Login,
                        redirect: '',
                        loggingIn: false,
                        loginMessage: '',
                    });
                }
            });
        } catch (e) {
            console.error('loginWithOffice365', e);
        }
    }

    renderLoginButton() {
        const { store: { ui } } = this.props;

        return (
            <TouchableOpacity
                style={styles.office365Button}
                onPress={this.loginWithOffice365}
                disabled={!ui.isConnected}

            >
                <Icon name="office" size={30} color="#E74125"/>
                <Text style={{ color: '#FAFAFA', marginLeft: 10 }}>
                    Login with Office&nbsp;
                    <Text style={{ fontWeight: 'bold' }}>365</Text>
                </Text>
            </TouchableOpacity>
        );
    }

    renderLoadingIndicator() {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <LoadingIndicator
                    isVisible={this.state.loggingIn}
                    color="#FAFAFA"
                    type="ThreeBounce"
                    size={60}
                />
            </View>
        );
    }

    renderLoginView() {
        const buttonOrLoadingIndicator = this.state.loggingIn
            ? this.renderLoadingIndicator()
            : this.renderLoginButton();

        return (
            <Layout store={this.props.store}>
                <BackgroundImageWithOverlay
                    source={backgroundSource}
                    colorOverlay="rgba(45, 45, 45, 0)"
                >
                    <View style={{ flex: 0.7 }}/>
                    { buttonOrLoadingIndicator }
                    <View style={{ flex: 0.1 }}>
                        <LoginMessage message={this.state.loginMessage}/>
                    </View>
                </BackgroundImageWithOverlay>
            </Layout>
        );
    }

    renderWebView() {
        return (
            <WebView
                style={{ flex: 1 }}
                source={{ uri: this.state.redirect }}
                onNavigationStateChange={this.onUrlChange}
                javaScriptEnabled
            />
        );
    }

    render() {
        switch (this.state.loginState) {
            case LOGIN_STATE.Login:
                return this.renderLoginView();
            case LOGIN_STATE.Webview:
                return this.renderWebView();
        }
    }
}

const styles = StyleSheet.create({
    office365Button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center',
        backgroundColor: '#1d2b3b'
    },
});
