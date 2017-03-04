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
    Easing,
    InteractionManager,
    LayoutAnimation,
    UIManager,
    Dimensions,
} from 'react-native';
import {
    Container,
    Content,
    Text,
    Input
} from 'native-base';
import IconIO from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

var CustomLayoutSpring = {
    duration: 1000,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
    }
};

class Token extends Component {

    constructor(props) {
        super(props);

        this.state = {
            removeAnimation: new Animated.Value(0),
        };
    }

    componentWillMount() {
        this.state.removeAnimation.setValue(0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.remove) {
            this.animateDeletion();
        } else {
            this.state.removeAnimation.setValue(0);
        }
    }

    animateDeletion() {
        Animated.timing(
            this.state.removeAnimation,
            {
                toValue: 1,
                easing: Easing.back(2),
                duration: 400,
            }
        ).start(() => this.props.onAnimationEnd());
    }

    render() {
        const {
            token,
            id,
            onChangeText,
            value,
            submitToken,
        } = this.props;
        const { width } = Dimensions.get('window');

        const slideRight = this.state.removeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, width]
        });

        return (
            <Animated.View
                key={id}
                style={{
                    backgroundColor: '#233445',
                    margin: 10,
                    elevation: 4,
                    height: 68.5,
                    transform: [{ translateX: slideRight }]
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 0.5,
                }}>
                    <IconIO
                        name="ios-notifications-outline"
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
                    <Input
                        style={{
                            height: 35,
                            color: '#FFF',
                            fontSize: 11,
                            textAlign: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)'
                        }}
                        maxLength={8}
                        keyboardType="numeric"
                        spellCheck={false}
                        autoCorrect={false}
                        multiline={false}
                        placeholder="Type your token"
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        onSubmitEditing={() => submitToken(id)}
                        onChangeText={(text) => onChangeText(text, id)}
                        value={value || ''}
                    />
                </View>
            </Animated.View>
        );
    }
}

Token.propTypes = {
    token: React.PropTypes.object,
    id: React.PropTypes.number,
    onRemove: React.PropTypes.func,
    onChangeText: React.PropTypes.func,
    value: React.PropTypes.string,
    submitToken: React.PropTypes.func,
    remove: React.PropTypes.bool,
    onAnimationEnd: React.PropTypes.func,
};

export default class Tokens extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tokenValues: {},
            tokens:
                [
                    {
                        'title': 'B3 - Conférence UX',
                        'date' : '22.02.2017'
                    },
                    {   'title': 'B3 - Expression Ecrite',
                        'date': '21.02.2017'
                    },
                    {   'title': 'B3 - Systeme Unix',
                        'date': '21.02.2017'
                    },
                ],
            selectedToken: -1,
        }

        this._submitToken = this._submitToken.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {

    }

    _submitToken(id) {
        this.setState({
            selectedToken: id,
        });
    }

    refresh() {
        const removedTokens = _.filter([ ...this.state.tokens ], (_, i) => i !== this.state.selectedToken);

        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.setState({
            tokens: removedTokens,
            tokenValues: {},
            selectedToken: -1,
        });
    }

    onChangeText(text, id) {
        this.setState({
            tokenValues: {
                ...this.state.tokenValues,
                [id]: text
            }
        })
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, backgroundColor: '#2c3e50'}}>
                    { this.state.tokens.length > 0 ?
                        this.state.tokens.map((token, i) => (
                            <Token
                                key={i}
                                token={token}
                                id={i}
                                onChangeText={this.onChangeText}
                                value={this.state.tokenValues[i]}
                                submitToken={this._submitToken}
                                remove={this.state.selectedToken == i}
                                onAnimationEnd={this.refresh}
                            />
                        ))
                        :
                        <View style={{ flex: 1, flexDirection: 'column', marginBottom: 90, justifyContent: 'center' }}>
                            <IconIO
                                name="ios-notifications-off-outline"
                                size={140}
                                style={{ color: '#FFF', alignSelf: 'center' }}
                            />
                            <Text style={{ marginTop: 10, color:'#FFF', alignSelf: 'center', fontSize: 12, }}>
                                No token expected in waiting
                            </Text>
                        </View>
                    }
                </Content>
            </Container>
        )
    }
};