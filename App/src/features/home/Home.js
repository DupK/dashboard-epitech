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
    BackAndroid,
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
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconIO from 'react-native-vector-icons/Ionicons';
import styles from './styles.js';


export const HEADER_MAX_HEIGHT = 220;
export const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 64 : 54;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const AVATAR_SIZE = 80;

const BlockInfo = ({ number, numberType }) => {
    return (
        <View style={{
            flex: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#42586E',
            borderRightWidth: 1,
            borderRightColor: '#617487',
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
};

BlockInfo.propTypes = {
    number: React.PropTypes.string,
    numberType: React.PropTypes.string,
};

const Cell = (props) => {

    const {
        title,
        description,
        icon,
        onPress
    } = props;

    return (
        <TouchableOpacity
            button
            onPress={onPress}
            style={{
                flex: 1,
                flexDirection: 'column',
                borderBottomWidth: 0.5,
                borderBottomColor: 'grey',
            }}
        >
            <View style={{
                height: 80,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                { icon }
                <Text style={ styles.itemTitle }>{title}{"\n"}
                    <Text style={ styles.itemDescr }>
                        {_.truncate(description, {length: 80, separator: '...'})}
                    </Text>
                </Text>
                <IconIO name="ios-arrow-forward-outline" style={ styles.arrowStyle }/>
            </View>
        </TouchableOpacity>
    );
};

Cell.propTypes = {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    icon: React.PropTypes.node,
    onPress: React.PropTypes.func,
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
                session: { news, session: { user } },
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
                    title="News"
                    description={lastNews.title}
                    icon={<IconIO name="ios-paper" style={ styles.iconStyle }/>}
                    onPress={this.menu.news}
                />
                <Cell
                    title="Projects"
                    description="Insert projects description.."
                    icon={<IconFA name="tasks" style={ styles.iconStyleFA }/>}
                    onPress={this.menu.projects}
                />
                <Cell
                    title="Calendar"
                    description={`Your next event \"{nextEvent.title}\" starts ${moment(nextEvent.start).fromNow()}`}
                    icon={<IconIO name="ios-calendar" style={ styles.iconStyle }/>}
                    onPress={this.menu.calendar}
                />
                <Cell
                    title="Marks"
                    description={`Your last mark from ${ lastMark.titlemodule } - ${ lastMark.title } is ${lastMark.final_note}`}
                    icon={<IconIO name="md-bookmarks" style={ styles.iconStyle }/>}
                    onPress={this.menu.marks}
                />
                <Cell
                    title="Ranking"
                    description={
                        ranking.rankPosition !== '0th'
                            ? `You\'re currently ${ranking.rankPosition} in your promotion.`
                            : 'Click here to get your rank.'
                    }
                    icon={<IconFA name="rocket" style={ styles.iconStyleFA }/>}
                    onPress={this.menu.ranking}
                />
                <Cell
                    title="Statistics"
                    description="Insert statistics description.."
                    icon={<IconFA name="pie-chart" style={ styles.iconStyleFA }/>}
                    onPress={this.menu.stats}
                />
                <Cell
                    title="Tokens"
                    description="Insert token description.."
                    icon={<IconFA name="ticket" style={ styles.iconStyleFA }/>}
                    onPress={this.menu.tokens}
                />
                <Cell
                    title="Logout"
                    description=""
                    icon={<IconIO name="md-log-out" style={ styles.logoutStyle }/>}
                    onPress={this.menu.logout}
                />
            </View>
        );
    }

    _renderScrollViewContent() {
        const data = Array.from({ length: 10 });
        return (
            <View style={scrollStyle.scrollViewContent}>
                {data.map((_, i) =>
                    <View key={i} style={scrollStyle.row}>
                        <Text>{i}</Text>
                    </View>
                )}
            </View>
        );
    }

    render() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });

        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -75],
            extrapolate: 'clamp',
        });

        const titleTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -10, 0],
            extrapolate: 'clamp',
        });

        const titleOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
        });

        const { width } = Dimensions.get('window');

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
                <Animated.View style={[scrollStyle.header, { height: headerHeight }]}>
                    <Animated.View
                        style={[
                            scrollStyle.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <View style={{
                            position: 'absolute',
                            top: HEADER_MAX_HEIGHT / 3 - (100 / 2) - 6,
                            left: width / 2 - 100 + 20,
                            zIndex: 10,
                        }}>
                            <AnimatedGaugeProgress
                                size={100}
                                width={5}
                                fill={50}
                                rotation={0}
                                cropDegree={220}
                                tintColor="#4682b4"
                                backgroundColor="#b0c4de"
                                strokeCap="circle" />
                        </View>
                        <View style={{
                            position: 'absolute',
                            top: HEADER_MAX_HEIGHT / 3 - (100 / 2) - 6,
                            left: (width / 2 - 100) * 2,
                            zIndex: 10,
                        }}>
                            <AnimatedGaugeProgress
                                size={100}
                                width={5}
                                fill={50}
                                rotation={180}
                                cropDegree={220}
                                tintColor="#4682b4"
                                backgroundColor="#b0c4de"
                                strokeCap="circle" />
                        </View>
                        <View style={{
                            flex: 10,
                            flexDirection: 'column',
                        }}>
                           <View
                               style={{
                                   flex: 1,
                                   flexDirection: 'row',
                                   alignItems: 'center',
                                   justifyContent: 'space-around',
                               }}
                           >
                               <View style={{ flexDirection: 'column'}}>
                                   <Text style={{
                                       color: '#FFFFFF',
                                       fontSize: 17,
                                       fontFamily: 'Nunito-Light',
                                       alignSelf: 'center',
                                   }}>
                                       4.00
                                   </Text>
                                   <Text style={{
                                       color: '#c4c4c4',
                                       fontSize: 10,
                                       alignSelf: 'center',
                                   }}>
                                       GPA
                                   </Text>
                               </View>
                               <Animated.Image
                                   style={[
                                       {
                                           width: AVATAR_SIZE,
                                           height: AVATAR_SIZE,
                                           resizeMode: 'cover',
                                           borderRadius: 40,
                                       },
                                   ]}
                                   source={{ uri: 'https://cdn.local.epitech.eu/userprofil/profilview/flavian.desverne.jpg' }}
                               />
                               <View style={{ flexDirection: 'column'}}>
                                   <Text style={{
                                       color: '#FFFFFF',
                                       fontSize: 17,
                                       fontFamily: 'Nunito-Light',
                                       alignSelf: 'center',
                                   }}>
                                       69
                                   </Text>
                                   <Text style={{
                                       color: '#c4c4c4',
                                       fontSize: 10,
                                       alignSelf: 'center',
                                   }}>
                                       Credits
                                   </Text>
                               </View>
                           </View>
                            <View>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 17,
                                    fontFamily: 'Nunito-ExtraLight',
                                    marginBottom: 10,
                                    alignSelf: 'center',
                                }}
                                >Flavian DESVERNE</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 3,
                            flexDirection: 'row',
                            borderWidth: 0.5,
                            borderColor: '#617487',
                            justifyContent: 'space-around',
                        }}>
                            <BlockInfo
                                number="39.4h"
                                numberType="Log"
                            />
                            <BlockInfo
                                number="18"
                                numberType="Epices"
                            />
                        </View>
                    </Animated.View>
                    <Animated.View
                        style={[
                            scrollStyle.bar,
                            {
                                transform: [ {translateY: titleTranslate} ],
                                opacity: titleOpacity,
                            },
                        ]}
                    >
                        <Text style={scrollStyle.title}>Home</Text>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

const scrollStyle = StyleSheet.create({
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2c3e50',
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
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
        marginTop: HEADER_MAX_HEIGHT,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});