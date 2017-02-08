/**
 * Created by desver_f on 23/01/17.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    BackAndroid
} from 'react-native';
import {
    Container,
    Content,
    Icon,
    List,
    ListItem,
    Thumbnail,
} from 'native-base';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create ({

    iconStyle: {
        flex: 0.15,
        fontSize: 50,
        color: "#2c3e50",
        justifyContent: 'center',
    },

    ThumbStyle: {
        flex: 0.15,
        justifyContent: 'center',
    },

    itemTitle: {
        flex: 0.75,
        fontWeight: 'bold',
        fontFamily: 'Nunito-ExtraLight',
    },

    profileTitle: {
        flex: 0.75,
        fontWeight: 'bold',
        fontFamily: 'Nunito-ExtraLight',
    },

    itemDescr: {
        fontWeight: 'normal',
        fontSize: 12,
    },

    arrowStyle: {
        flex: 0.03,
        fontSize: 20,
        alignSelf: 'center',
        color: '#2c3e50',
    },

    trafficLightStyle: {
        flex: 0.06,
        alignSelf: 'center',
        width: 20,
        height: 20,
        borderRadius: 50
    },

    logoutStyle: {
        flex: 0.15,
        fontSize: 50,
        marginRight: 5,
        color: "#b24c42",
    },

});

@observer
export default class Home extends Component {

    constructor(props) {
        super(props);

        this.handleBackAndroid = this.handleBackAndroid.bind(this);
    }

    menu = {
        News: () => Actions.news(),
        Projects: () => Actions.projects(),
        Calendar: () => Actions.calendar(),
        Marks: () => Actions.marks(),
        Ranking: () => Actions.ranking(),
        Logout: async () => {
            await this.props.store.session.logout();
            this.props.store.ui.defaultState();
            Actions.login();
        }
    };

    handleBackAndroid() {
        BackAndroid.exitApp();

        return false;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
    }

    componentWillUnmount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid);
    }

    logTimeColor(logtime) {
        if (logtime < 20) {
            return '#b72218';
        } else if (logtime >= 20 && logtime < 30) {
            return '#e68803';
        }

        return '#45BB27';
    }

    render() {
        const {
            store: {
                session: { news, session: { user } },
                calendar,
                ranking
            }
        } = this.props;

        const nextEvent = calendar.getNextEvent();
        const lastNews = _(news)
            .orderBy((news) => moment(news.date, 'YYYY-MM-DD HH:mm:ss'))
            .last();

        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <View style={styles.ThumbStyle}>
                                <Thumbnail size={42} source={{ uri: user.thumbnail }} />
                            </View>
                            <Text style={ styles.profileTitle }>{user.name}{"\n"}
                                <Text style={ styles.itemDescr }>
                                    {user.credits} credits | {user.gpa} GPA {"\n"}
                                    Connect time : {user.logtime}h / {user.expectedLogtime}h
                                </Text>
                            </Text>
                            <View style={[styles.trafficLightStyle, { backgroundColor: this.logTimeColor(user.logtime) }]} />
                        </ListItem>
                        <ListItem button onPress={this.menu.News}>
                            <Icon name="ios-paper" style={ styles.iconStyle }/>
                            <Text style={ styles.itemTitle }>News{"\n"}
                                <Text style={ styles.itemDescr }>
                                    {_.truncate(lastNews.title, {length: 80, separator: '...'})}
                                </Text>
                            </Text>
                            <Icon name="ios-arrow-forward-outline" style={ styles.arrowStyle }/>
                        </ListItem>
                        <ListItem button onPress={this.menu.Projects}>
                            <Icon name="ios-code" style={ styles.iconStyle }/>
                            <Text style={ styles.itemTitle }>Projects{"\n"}
                                <Text style={ styles.itemDescr }>Insert projects description..</Text>
                            </Text>
                            <Icon name="ios-arrow-forward-outline" style={ styles.arrowStyle }/>
                        </ListItem>
                        <ListItem button onPress={this.menu.Calendar}>
                            <Icon name="ios-calendar" style={ styles.iconStyle }/>
                            <Text style={ styles.itemTitle }>Calendar{"\n"}
                                <Text style={ styles.itemDescr }>Next event: {nextEvent.title} {moment(nextEvent.start).fromNow()}</Text>
                            </Text>
                            <Icon name="ios-arrow-forward-outline" style={ styles.arrowStyle }/>
                        </ListItem>
                        <ListItem button onPress={this.menu.Marks}>
                            <Icon name="md-bookmarks" style={ styles.iconStyle }/>
                            <Text style={ styles.itemTitle }>Marks{"\n"}
                                <Text style={ styles.itemDescr }>Insert marks description..</Text>
                            </Text>
                            <Icon name="ios-arrow-forward-outline" style={ styles.arrowStyle }/>
                        </ListItem>
                        <ListItem button onPress={this.menu.Ranking}>
                            <Icon name="md-medal" style={ styles.iconStyle }/>
                            <Text style={ styles.itemTitle }>Ranking{"\n"}
                                <Text style={ styles.itemDescr }>
                                    {
                                        ranking.rankPosition !== '0th'
                                            ? `You\'re currently ${ranking.rankPosition} in your promotion.`
                                            : 'Click here to get your rank.'
                                    }
                                </Text>
                            </Text>
                            <Icon name="ios-arrow-forward-outline" style={ styles.arrowStyle }/>
                        </ListItem>
                        <ListItem button onPress={this.menu.Logout}>
                            <Icon name="md-log-out" style={ styles.logoutStyle }/>
                            <Text style={ styles.itemTitle }>Logout{"\n"}
                                <Text style={ styles.itemDescr }>Insert logout description..</Text>
                            </Text>
                            <Icon name="ios-arrow-forward-outline" style={ styles.arrowStyle }/>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}