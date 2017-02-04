/**
 * Created by jules on 04/02/17.
 */

import React, { Component } from 'react';
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
    Icon,
    Button,
} from 'native-base';

export default class News extends Component {

    render() {

        let items = ['Merci', 'de', 'fetch', 'les', 'news', '<3'];

        return (
            <Container>
                <Content>
                    <List
                        dataArray={items}
                        renderRow={(item) =>

                            <ListItem>
                                <Text>{item}</Text>
                            </ListItem>

                        }>
                    </List>
                </Content>
            </Container>
        );
    }
};