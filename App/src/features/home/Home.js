/**
 * Created by desver_f on 23/01/17.
 */

import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { AppRegistry, Text, View, Image, BackAndroid} from 'react-native';
import { Container, Content, Icon, List, ListItem, Thumbnail,} from 'native-base';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import IconFA from 'react-native-vector-icons/FontAwesome';
import styles from './styles.js';

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
        Token: () => Actions.token(),
        Stats: () => Actions.stats(),
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
                            <IconFA name="flag" style={[styles.trafficLightStyle, { color: this.logTimeColor(user.logtime) }]} />
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
                            <IconFA name="tasks" style={ styles.iconStyleFA }/>
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
                            <IconFA name="rocket" style={ styles.iconStyleFA }/>
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
                        <ListItem button onPress={this.menu.Stats}>
                            <IconFA name="pie-chart" style={ styles.iconStyleFA }/>
                            <Text style={ styles.itemTitle }>Statistics{"\n"}
                                <Text style={ styles.itemDescr }>Insert statistics description..</Text>
                            </Text>
                            <Icon name="ios-arrow-forward-outline" style={ styles.arrowStyle }/>
                        </ListItem>
                        <ListItem button onPress={this.menu.Token}>
                            <IconFA name="ticket" style={ styles.iconStyleFA }/>
                            <Text style={ styles.itemTitle }>Token{"\n"}
                                <Text style={ styles.itemDescr }>Insert token description..</Text>
                            </Text>
                            <Icon name="ios-arrow-forward-outline" style={ styles.arrowStyle }/>
                        </ListItem>
                        <ListItem button onPress={this.menu.Logout}>
                            <Icon name="md-log-out" style={ styles.logoutStyle }/>
                            <Text style={ styles.itemTitleLogout }>Logout{"\n"}
                            </Text>
                            <Icon name="ios-arrow-forward-outline" style={ styles.arrowStyle }/>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}