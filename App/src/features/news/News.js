/**
 * Created by jules on 04/02/17.
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
} from 'native-base';

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 12,
        color: "#FFFFFF",
    },
    detail: {
        fontWeight: 'normal',
        fontSize: 11,
        color: "#FFFFFF",
    },

    container: {
        backgroundColor: "#2c3e50"
    },
});

@observer
export default class News extends Component {

    render() {
        const { store: { session } } = this.props;

        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={{backgroundColor: '#2c3e50'}}>
                    <List
                        dataArray={session.news.slice()}
                        renderRow={(news) => {
                            return (
                                <ListItem>
                                    <Text style={styles.title}>{news.title}{'\n'}
                                        <Text style={styles.detail}>
                                            { news.details }
                                        </Text>
                                    </Text>
                                </ListItem>
                            );
                        }}>
                    </List>
                </Content>
            </Container>
        );
    }
};