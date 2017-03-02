/**
 * Created by jules on 12/02/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
//noinspection JSUnresolvedVariable
import {
    AppRegistry,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Animated,
    Alert,
} from 'react-native';
import {
    Container,
    Content,
    List,
    Text,
    Input
} from 'native-base';
import IconIO from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

export default class Token extends Component {

    constructor(props) {
        super(props)

        this.state = {
            token: '',
            tokens:
                [
                    {
                        'title': 'B3 - Conférence UX',
                        'date' : '22.02.2017'
                    },
                    {      'title': 'B3 - Expression Ecrite',
                        'date': '22.02.2017'
                    },
                    {
                        'title': 'B3 - Systeme Unix',
                        'date': '22.02.2017'
                    },
                ]
        }

        this._submitToken = this._submitToken.bind(this);
        this._renderTokens = this._renderTokens.bind(this);
    }

    _submitToken(id) {

        /*

         Send token..

         */

        const removedTokens = _.filter([ ...this.state.tokens ], (_, n) => `${n}` !== id);
        this.setState({
            tokens: removedTokens,
            token: '',
        });
    }

    _renderTokens(token, _, id) {

        return (
            <View style={{ flex: 1, backgroundColor: '#233445', margin: 10, borderColor: 'rgba(255, 255, 255, 0.2)', elevation: 8 }}>
                <View style={{ flexDirection: 'row' }}>
                    <IconIO
                        name="ios-pricetag-outline"
                        size={18}
                        style={{ flex: 0.10, alignSelf: 'center', color: '#FFF', marginLeft: 10 }}/>
                    <Text style={{ flex: 1, color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>
                        {token.title}
                    </Text>
                    <Text style={{ flex: 0.3, color: '#FFF', fontSize: 12, marginBottom: 8, fontWeight: '100' }}>
                        {token.date}
                    </Text>
                </View>
                <View>
                    <KeyboardAvoidingView>
                        <Input
                            style={{
                                height: 35,
                                color: '#FFF',
                                fontSize: 11,
                                marginLeft: 10,
                                marginBottom: 10,
                                marginRight: 10,
                                textAlign: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.03)'
                            }}
                            maxLength={8}
                            keyboardType="numeric"
                            spellCheck={false}
                            multiline={false}
                            placeholder="Type your token"
                            placeholderTextColor="rgba(255, 255, 255, 0.6)"
                            onSubmitEditing={() => this._submitToken(id)}
                            onChangeText={(text) => this.setState({ token: text })}
                        />
                    </KeyboardAvoidingView>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, backgroundColor: '#2c3e50'}}>
                    <List
                        style={{ marginTop: 8 }}
                        dataArray={this.state.tokens}
                        renderRow={this._renderTokens}
                    />
                </Content>
            </Container>
        )
    }
};