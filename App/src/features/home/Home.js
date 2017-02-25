/**
 * Created by desver_f on 23/01/17.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
    Text,
    View,
    Image,
    ScrollView,
    Animated,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import IconSL from 'react-native-vector-icons/SimpleLineIcons';
import IconIO from 'react-native-vector-icons/Ionicons';
import styles from './styles.js';

const HEADER_MAX_HEIGHT = 180;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 64 : 54;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const AVATAR_SIZE = 70;

const BlockInfo = observer(({ number, numberType }) => {
    return (
        <View style={{
            flex: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#2c3e50',
            borderRightWidth: 1,
            borderRightColor: '#495a6d',
        }}>
            <Text style={{
                alignSelf: 'center',
                color: '#FFFFFF',
                fontSize: 17,
                fontFamily: 'Nunito-Light',
            }}>
                { number }
            </Text>
            <Text style={{
                alignSelf: 'center',
                color: '#c4c4c4',
                fontSize: 10,
            }}>
                { numberType }
            </Text>
        </View>
    );
});

BlockInfo.propTypes = {
    number: React.PropTypes.string,
    numberType: React.PropTypes.string,
};

const Cell = observer((props) => {

    const {
        title,
        description,
        icon,
        onPress,
        color,
    } = props;

    return (
        <TouchableOpacity
            button
            onPress={onPress}
            style={{
                flex: 1,
                backgroundColor: color,
                height: 80,
            }}
        >
            <View style={{
                flex: 1,
                flexDirection: 'row',
            }}>
                { icon }
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginTop: 10,
                    marginLeft: 10,
                }}>
                    <View style={{ flex: 0.35 }}>
                        <Text style={styles.itemTitle}>{ title }</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.itemDescr}>{ description }</Text>
                    </View>
                </View>
                <IconSL name="arrow-right" style={ styles.arrowStyle }/>
            </View>
        </TouchableOpacity>
    );
});

Cell.propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    icon: React.PropTypes.node,
    onPress: React.PropTypes.func,
    color: React.PropTypes.string,
};

@observer
export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
        };
    }

    menu = {
        news: () => Actions.news(),
        projects: () => Actions.projects(),
        calendar: () => Actions.calendar(),
        marks: () => Actions.marks(),
        ranking: () => Actions.ranking(),
        tokens: () => Actions.token(),
        stats: () => Actions.stats(),
        logout: async () => {
            await this.props.store.session.logout();
            this.props.store.ui.defaultState();
            Actions.login();
        }
    };

    renderScrollView() {
        const {
            store: {
                session: { news },
                calendar,
                ranking,
                marks
            }
        } = this.props;

        const nextEvent = calendar.nextEvent;
        const lastNews = _(news)
            .orderBy((news) => moment(news.date, 'YYYY-MM-DD HH:mm:ss'))
            .last();
        const lastMark = marks.lastMark;

        return (
            <View style={scrollStyle.scrollViewContent}>
                <Cell
                    title="Notifications"
                    description={lastNews.title}
                    icon={<IconIO name="ios-pulse-outline" style={ styles.iconStyle }/>}
                    onPress={this.menu.news}
                    color="#233445"
                />
                <Cell
                    title="Projects"
                    description="Insert projects description.."
                    icon={<IconIO name="ios-cafe-outline" style={ styles.iconStyle }/>}
                    onPress={this.menu.projects}
                    color="#203040"
                />
                <Cell
                    title="Calendar"
                    description={`Your next event \"${nextEvent.title}\" starts ${moment(nextEvent.start).fromNow()}`}
                    icon={<IconIO name="ios-calendar-outline" style={ styles.iconStyle }/>}
                    onPress={this.menu.calendar}
                    color="#1E2C3B"
                />
                <Cell
                    title="Marks"
                    description={`Your last mark from ${ lastMark.titlemodule } - ${ lastMark.title } is ${lastMark.final_note}`}
                    icon={<IconIO name="ios-school-outline" style={ styles.iconStyle }/>}
                    onPress={this.menu.marks}
                    color="#1B2836"
                />
                <Cell
                    title="Ranking"
                    description={
                        ranking.rankPosition !== '0th'
                            ? `You\'re currently ${ranking.rankPosition} in your promotion.`
                            : 'Click here to get your rank.'
                    }
                    icon={<IconIO name="ios-trophy-outline" style={ styles.iconStyle }/>}
                    onPress={this.menu.ranking}
                    color="#192531"
                />
                <Cell
                    title="Statistics"
                    description="Insert statistics description.."
                    icon={<IconIO name="ios-speedometer-outline" style={ styles.iconStyle }/>}
                    onPress={this.menu.stats}
                    color="#16212C"
                />
                <Cell
                    title="Tokens"
                    description="Insert token description.."
                    icon={<IconIO name="ios-pricetags-outline" style={ styles.iconStyle }/>}
                    onPress={this.menu.tokens}
                    color="#141D27"
                />
                <Cell
                    title="Logout"
                    description="Thanks to report any bug"
                    icon={<IconIO name="ios-power-outline" style={ styles.logoutStyle }/>}
                    onPress={this.menu.logout}
                    color="#111A22"
                />
            </View>
        );
    }

    renderGauges(translateLeft, translateRight) {
        const {
            store: {
                session: { session: { user } },
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
                session: { session: { user } },
            }
        } = this.props;

        return (
            <View style={scrollStyle.fill}>
                <ScrollView
                    style={scrollStyle.fill}
                    scrollEventThrottle={32}
                    onScroll={Animated.event(
                        [{ nativeEvent: {contentOffset: { y: this.state.scrollY } }}]
                    )}
                >
                    { this.renderScrollView() }
                </ScrollView>
                <Animated.View style={[
                    scrollStyle.header,
                    {
                    elevation: shadow,
                    shadowColor: "#000000",
                    shadowOpacity: iOSshadow,
                    shadowRadius: 5,
                    shadowOffset: {
                        height: 3,
                        width: 0
                    },
                }]}>
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
                                    <View style={{ flexDirection: 'column'}}>
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
                                            { transform: [ { rotate: rotateIcon }  ] }
                                        ]}
                                        source={require('../../assets/epitech.png')}
                                    />
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
                                    <Text style={scrollStyle.username}>{ user.name }</Text>
                                </Animated.View>
                            </View>
                        </Animated.View>
                        <Animated.View
                            style={[
                                scrollStyle.bar,
                                {
                                    transform: [ {translateY: translateMinus50} ],
                                    opacity: titleOpacity,
                                },
                            ]}
                        >
                            <Text style={scrollStyle.title}>Home</Text>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

const scrollStyle = StyleSheet.create({
    fill: {
        flex: 1,
        backgroundColor: '#233445',
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#233445',
        overflow: 'visible',
    },
    headerContainer: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        marginTop: 10,
    },
    bar: {
        height: HEADER_MIN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontFamily: 'Nunito-Light',
        fontSize: 16,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT + 12,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pictureAndGaugesContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    pictureAndGauges: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    leftGauge: {
        position: 'absolute',
        top: (HEADER_MAX_HEIGHT / 3) - (100 / 2) + 8,
        left: Dimensions.get('window').width / 4,
    },
    rightGauge: {
        position: 'absolute',
        top: (HEADER_MAX_HEIGHT / 3) - (100 / 2) + 8,
        right: Dimensions.get('window').width / 4
    },
    gaugeValue: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'Nunito-Light',
        alignSelf: 'center',
    },
    gaugeDescription: {
        color: '#c4c4c4',
        fontSize: 10,
        alignSelf: 'center',
    },
    picture: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        resizeMode: 'contain',
        zIndex: 10,
    },
    username: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Nunito-Light',
        marginBottom: 20,
        alignSelf: 'center',
    },
    blockInfoContainer: {
        flex: 2,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#617487',
        justifyContent: 'space-around',
        elevation: 30,
        backgroundColor: 'black',
    }
});