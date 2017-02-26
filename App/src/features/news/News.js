/**
 * Created by jules on 04/02/17.
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
    AppRegistry,
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
import styles from './styles.js';

@observer
export default class News extends Component {

    render() {
        const { store: { session } } = this.props;

        return (
            <Container style={styles.container}>
                <Content contentContainerStyle={{backgroundColor: '#fafafa'}}>
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