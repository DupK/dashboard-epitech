/**
 * Created by jules on 04/02/17.
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
    Text,
    Image,
    Platform,
} from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
} from 'native-base';
import { Container, Content, List, ListItem } from 'native-base';
import Layout from '../../shared/components/Layout';
import styles from './styles.js';

const noPicture = 'https://intra.epitech.eu/staticceeb245e183d75bbe0e66d363037166fc670c425/img/nopicture-profilview.png';

@observer
export default class News extends Component {

    render() {
        const { store: { session } } = this.props;

        return (
            <Layout store={this.props.store}>
                <Container style={styles.container}>
                    <Content contentContainerStyle={{ backgroundColor: '#fafafa' }}>
                        <List
                            dataArray={session.summary.news.slice()}
                            renderRow={(news) => {
                                return (
                                    <ListItem style={{ flex: 1 }}>
                                        <Image source={{
                                            uri: news.user.picture === null ?
                                                 noPicture :
                                                 news.user.picture
                                        }} style={Platform.OS === 'ios' ? styles.pictureIOS : styles.pictureAndroid}/>
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
            </Layout>
        );
    }
};