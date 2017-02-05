/**
 * Created by desver_f on 23/01/17.
 */

import React, { Component } from 'react';
import moment from 'moment';
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
    Icon,
    List,
    ListItem,
    Thumbnail,
} from 'native-base';
import { observer } from 'mobx-react/native';
import { Actions } from 'react-native-router-flux';
import avatar from '../../assets/jules.jpg';
import greenLight from '../../assets/circle-green.png';

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

    render() {
        const { store: { calendar } } = this.props;
        const nextEvent = calendar.getNextEvent();

        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <View style={styles.ThumbStyle}>
                                 <Thumbnail size={42} source={avatar} />
                            </View>
                                <Text style={ styles.profileTitle }>Jules DUPONT{"\n"}
                                <Text style={ styles.itemDescr }>60 credits | 2.70 GPA {"\n"}Connect time : 23.2h / 50.0h</Text>
                            </Text>
                            <View style={styles.trafficLightStyle}>
                                <Thumbnail size={20} source={greenLight}/>
                            </View>
                        </ListItem>
                        <ListItem button onPress={this.menu.News}>
                            <Icon name="ios-paper" style={ styles.iconStyle }/>
                            <Text style={ styles.itemTitle }>News{"\n"}
                                <Text style={ styles.itemDescr }>Insert news description..</Text>
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
                                <Text style={ styles.itemDescr }>Insert ranking description..</Text>
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