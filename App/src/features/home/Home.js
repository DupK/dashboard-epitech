/**
 * Created by desver_f on 23/01/17.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
    Text,
    View,
    ScrollView,
    Animated,
    RefreshControl,
    Platform
} from 'react-native';
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import scrollStyle from './styles';
import Cell from './Cell';

import Layout from '../../shared/components/Layout';
import refreshApplicationData from '../../shared/RefreshApplication';

const HEADER_MAX_HEIGHT = 180;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 64 : 54;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

@observer
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            refreshing: false,
        };
        this.onRefresh = this.onRefresh.bind(this);
    }

    menu = {
        news: () => Actions.news(),
        projects: () => Actions.projects(),
        calendar: () => Actions.calendar(),
        marks: () => Actions.marks(),
        ranking: () => Actions.ranking(),
        tokens: () => Actions.token(),
        stats: () => Actions.stats(),
        links: () => Actions.links(),
        documents: () => Actions.documents(),
        logout: async () => {
            await this.props.store.session.logout();
            this.props.store.ui.defaultState();
            Actions.login();
        }
    };

    async componentWillMount() {
        const { store: { ui, session } } = this.props;

        if (ui.isConnected && session.loggedFromCache) {
            await this.refreshData();
        }
    }

    renderScrollView() {
        const {
            store: {
                session,
                calendar,
                ranking,
                projects,
                marks,
                tokens,
            }
        } = this.props;

        const nextEvent = calendar.nextEvent;
        const lastNews = _(session.summary.news.slice())
            .orderBy((news) => moment(news.date, 'YYYY-MM-DD HH:mm:ss'))
            .last();
        const lastMark = marks.lastMark;
        const tokenDescription = tokens.nbTokens
            ? `You have ${tokens.nbTokens} tokens to validate`
            : 'There is no token to validate';
        const nextProject = projects.firstEndingProject;

        return (
            <View style={scrollStyle.scrollViewContent}>
                <Cell
                    title="Notifications"
                    description={lastNews.title}
                    icon="ios-pulse-outline"
                    onPress={this.menu.news}
                    color="#233445"
                />
                <Cell
                    title="Calendar"
                    description={nextEvent}
                    icon="ios-calendar-outline"
                    onPress={this.menu.calendar}
                    color="#233445"
                />
                <Cell
                    title="Projects"
                    description={nextProject}
                    icon="ios-cafe-outline"
                    onPress={this.menu.projects}
                    color="#233445"
                />
                <Cell
                    title="Tokens"
                    description={tokenDescription}
                    icon="ios-pricetags-outline"
                    onPress={this.menu.tokens}
                    color="#233445"
                />
                <Cell
                    title="Marks"
                    description={`Your last mark from ${ lastMark.titlemodule } - ${ lastMark.title } is ${lastMark.final_note}`}
                    icon="ios-school-outline"
                    onPress={this.menu.marks}
                    color="#233445"
                />
                <Cell
                    title="Ranking"
                    description={
                        ranking.rankPosition !== '0th'
                            ? `You\'re currently ${ranking.rankPosition} in your promotion.`
                            : 'Click here to get your rank'
                    }
                    icon="ios-trophy-outline"
                    onPress={this.menu.ranking}
                    color="#233445"
                />
                <Cell
                    title="Statistics"
                    description="This feature will be soon available"
                    icon="ios-speedometer-outline"
                    onPress={this.menu.stats}
                    color="#233445"
                />
                <Cell
                    title="Documents"
                    description="Your private documents"
                    icon="ios-folder-open-outline"
                    onPress={this.menu.documents}
                    color="#233445"
                />
                <Cell
                    title="Links"
                    description="Your best services at your fingertips"
                    icon="ios-link-outline"
                    onPress={this.menu.links}
                    color="#233445"
                />
                <Cell
                    title="Logout"
                    description="Thanks to report any bug"
                    icon="ios-power-outline"
                    onPress={this.menu.logout}
                    color="#233445"
                />
            </View>
        );
    }

    renderGauges(translateLeft, translateRight) {
        const {
            store: {
                session: { user },
            }
        } = this.props;
        const creditsPercentage = (user.credits / (user.studentyear * 60)) * 100;
        const gpaPercentage = (user.gpa / 4) * 100;

        return [
            <AnimatedGaugeProgress
                key="left"
                style={[
                    scrollStyle.leftGauge,
                    { transform: [{ translateX: translateLeft }] },
                ]}
                size={100}
                width={5}
                fill={gpaPercentage}
                rotation={0}
                cropDegree={230}
                tintColor="#62c462"
                backgroundColor="#152839"
            />,
            <AnimatedGaugeProgress
                key="right"
                style={[
                    scrollStyle.rightGauge,
                    { transform: [{ translateX: translateRight }] }
                ]}
                size={100}
                width={5}
                fill={creditsPercentage}
                rotation={180}
                cropDegree={230}
                tintColor="#62c462"
                backgroundColor="#152839"
            />
        ];
    }

    async refreshData() {
        await refreshApplicationData({ withLogin: true });
    }

    onRefresh() {
        this.setState({ refreshing: true }, async () => {
            await this.refreshData();
            this.setState({ refreshing: false });
        });
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -75],
            extrapolate: 'clamp',
        });
        const translateMinus50 = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50, 0],
            extrapolate: 'clamp',
        });
        const translate50 = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 50, 0],
            extrapolate: 'clamp',
        });
        const titleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
        });
        const gaugeLeftTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 30, 0],
            extrapolate: 'clamp',
        });
        const gaugeRightTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -30, 0],
            extrapolate: 'clamp',
        });
        const shadow = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 10],
            extrapolate: 'clamp',
        });
        const iOSshadow = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 0.6],
            extrapolate: 'clamp',
        });
        const rotateIcon = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
            outputRange: ['0deg', '360deg'],
            extrapolate: 'clamp',
        });

        const {
            store: {
                session: { user },
            }
        } = this.props;

        const nameSplited = user.name.split(' ');
        const name = nameSplited[0] + ' ' + nameSplited[1].toUpperCase();

        return (
            <Layout store={this.props.store}>
                <View style={scrollStyle.fill}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            progressViewOffset={HEADER_MAX_HEIGHT}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    style={scrollStyle.fill}
                    scrollEventThrottle={32}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } }}]
                    )}
                >
                    { this.renderScrollView() }
                </ScrollView>
                <Animated.View style={[
                    scrollStyle.header,
                    {
                        elevation: shadow,
                        shadowColor: '#000000',
                        shadowOpacity: iOSshadow,
                        shadowRadius: 5,
                        shadowOffset: {
                            height: 3,
                            width: 0
                        },
                    }
                ]}>
                    <Animated.View style={[
                        {
                            overflow: 'hidden',
                            height: headerHeight,
                        }
                    ]}>
                        <Animated.View
                            style={[
                                scrollStyle.headerContainer,
                                {
                                    opacity: imageOpacity,
                                    transform: [{ translateY: imageTranslate }],
                                },
                            ]}
                        >
                            <View style={scrollStyle.pictureAndGaugesContainer}>
                                <View style={scrollStyle.pictureAndGauges}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Animated.View style={{
                                            transform: [{ translateX: translateMinus50 }],
                                        }}>
                                            <Text style={scrollStyle.gaugeValue}>{ user.gpa }</Text>
                                            <Text style={scrollStyle.gaugeDescription}>GPA</Text>
                                        </Animated.View>
                                    </View>
                                    <Animated.Image
                                        style={[
                                            scrollStyle.picture,
                                            { transform: [{ rotate: rotateIcon }] }
                                        ]}
                                        source={require('../../assets/epitech.png')}/>

                                    { this.renderGauges(gaugeLeftTranslate, gaugeRightTranslate) }
                                    <Animated.View style={{
                                        transform: [{ translateX: translate50 }],
                                    }}>
                                        <View style={{ flexDirection: 'column'}}>
                                            <Text style={scrollStyle.gaugeValue}>{ user.credits }</Text>
                                            <Text style={scrollStyle.gaugeDescription}>Credits</Text>
                                        </View>
                                    </Animated.View>
                                </View>
                                <Animated.View style={{
                                    flex: 0.3,
                                    transform: [{ translateY: translate50 }],
                                }}>
                                    <Text style={scrollStyle.username}>{ name }</Text>
                                </Animated.View>
                            </View>
                        </Animated.View>
                        <Animated.View
                            style={[
                                scrollStyle.bar,
                                {
                                    transform: [{ translateY: translateMinus50 }],
                                    opacity: titleOpacity,
                                },
                            ]}
                        >
                            <Text style={scrollStyle.title}>Home</Text>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </View></Layout>
        );
    }
}