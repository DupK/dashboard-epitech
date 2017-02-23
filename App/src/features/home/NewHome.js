import React, { Component } from 'react';
import {
    Animated,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 64 : 54;
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

export default class ScrollableHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
        };
    }

    _renderScrollViewContent() {
        const data = Array.from({ length: 10 });
        return (
            <View style={styles.scrollViewContent}>
                {data.map((_, i) =>
                    <View key={i} style={styles.row}>
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
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
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

        return (
            <View style={styles.fill}>
                <ScrollView
                    style={styles.fill}
                    scrollEventThrottle={32}
                    onScroll={Animated.event(
                        [{ nativeEvent: {contentOffset: { y: this.state.scrollY } }}]
                    )}
                >
                    {this._renderScrollViewContent()}
                </ScrollView>
                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    <Animated.View
                        style={[
                            styles.backgroundImage,
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
                            flex: 10,
                            alignSelf: 'center',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}>
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
                            <Text style={{
                                color: 'white',
                                fontSize: 17,
                                fontFamily: 'Nunito-ExtraLight',
                                marginBottom: 10,
                            }}
                            >Flavian DESVERNE</Text>
                        </View>
                        <View style={{
                            flex: 3,
                            flexDirection: 'row',
                            borderWidth: 0.5,
                            borderColor: '#617487',
                            justifyContent: 'space-around',
                        }}>
                            <BlockInfo
                                number="84"
                                numberType="Credits"
                            />
                            <BlockInfo
                                number="4.00"
                                numberType="GPA"
                            />
                            <BlockInfo
                                number="39.4h"
                                numberType="Log"
                            />
                        </View>
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.bar,
                            {
                                transform: [ {translateY: titleTranslate} ],
                                opacity: titleOpacity,
                            },
                        ]}
                    >
                        <Text style={styles.title}>Home</Text>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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