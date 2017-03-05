/**
 * Created by jules on 15/02/17.
 */

//noinspection JSUnresolvedVariable
import React, { Component } from 'react';
//noinspection JSUnresolvedVariable
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    UIManager,
    LayoutAnimation,
    Animated,
    InteractionManager
} from 'react-native';
import { observer } from 'mobx-react/native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';
import Chart  from 'react-native-chart';
import _ from 'lodash';

/* UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true); */

const datas = [[
    [
        3600,
        29345.1739
    ],
    [
        7200,
        26410.4423
    ],
    [
        10800,
        21993.7
    ],
    [
        14400,
        25763.8
    ],
    [
        18000,
        22067.3333
    ],
    [
        21600,
        22642.5417
    ],
    [
        25200,
        26659.5306
    ]
]];

const extractedData = datas[0].map((data) => {
    return data.map((n) => {
        return n / 3600;
    })
})

const data = [extractedData]

@observer
export default class Stats extends Component {

    constructor() {
        super();

        this.state = {
            animate: new Animated.Value(400),
        }

        this._renderGpaColor = this._renderGpaColor.bind(this);
        this._renderCreditsColor = this._renderCreditsColor.bind(this);
    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(() =>
        Animated.parallel([
            Animated.timing(
                this.state.animate,
                {
                    toValue: 0,
                    duration: 1500,
                }),
        ]).start())

    }

    _renderGpaColor(value) {
        if (value >= 70)
            return '#62c462'
        else if (value >= 50)
            return '#ffc754'
        else if (value < 25)
            return '#f44336'
    }

    _renderCreditsColor(value) {
        if (value >= 80)
            return '#62c462'
        else if (value >= 50)
            return '#ffc754'
        else if (value < 25)
            return '#f44336'
    }

    render() {

        const { store: { session } } = this.props;

        const gpaPercentage = (session.session.user.gpa / 4) * 100;
        const creditsPercentage = (session.session.user.credits / (session.session.user.studentyear * 60)) * 100;

        return (
            <View style={{ flex: 1, backgroundColor: "#2c3e50" }}>
                <ScrollView>
                    <Animated.View style={{
                        backgroundColor: '#16212C',
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        elevation: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        bottom: this.state.animate,
                    }}>
                        <IconFA name="street-view" style={{ color: '#62c462', fontSize: 12, marginLeft: 8 }} />
                        <Text style={{ color: '#fafafa', fontSize: 11, margin: 5,}}>
                            Personal Information
                        </Text>
                    </Animated.View>
                    <View style={{ flexDirection: 'row', flex: 1, }}>
                        <Animated.View style={{
                            right: this.state.animate,
                            marginTop: 10,
                            marginLeft: 10,
                            height: 150,
                            flex: 0.5,
                            backgroundColor: "#233445",
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0)',
                            borderRadius: 5,
                        }}>
                            <View style={{ height: 25, backgroundColor: "#16212C", flexDirection: 'row', alignItems: 'center', elevation: 3}}>
                                <IconMC name="brightness-1" style={{color: '#62c462', fontSize: 6, marginLeft: 8,}} />
                                <Text style={{ color: "#fafafa", fontSize: 11, marginLeft: 5 }}>
                                    Your GPA
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <AnimatedGaugeProgress
                                    style={{
                                        alignSelf: 'flex-start',
                                    }}
                                    size={70}
                                    width={3}
                                    fill={gpaPercentage}
                                    rotation={90}
                                    cropDegree={80}
                                    tintColor={this._renderGpaColor(gpaPercentage)}
                                    backgroundColor="#16212C"
                                    strokeCap="circle" />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    color: '#fafafa',
                                    fontSize: 12,
                                }}>
                                    {session.session.user.gpa}
                                </Text>
                            </View>
                        </Animated.View>
                        <Animated.View style={{
                            left: this.state.animate,
                            margin: 10,
                            marginLeft: 10,
                            height: 150,
                            flex: 0.5,
                            backgroundColor: "#233445",
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0)',
                            borderRadius: 5,
                        }}>
                            <View style={{ height: 25, backgroundColor: "#16212C", flexDirection: 'row', alignItems: 'center', elevation: 3 }}>
                                <IconMC name="brightness-1" style={{color: '#62c462', fontSize: 6, marginLeft: 8 }} />
                                <Text style={{ color: "#fafafa", fontSize: 11, marginLeft: 5 }}>
                                    Your credits
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <AnimatedGaugeProgress
                                    style={{
                                        alignSelf: 'flex-start',
                                    }}
                                    size={70}
                                    width={3}
                                    fill={creditsPercentage}
                                    rotation={90}
                                    cropDegree={80}
                                    tintColor={this._renderCreditsColor(creditsPercentage)}
                                    backgroundColor="#16212C"
                                    strokeCap="circle" />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    color: '#fafafa',
                                    fontSize: 12,
                                }}>
                                    {session.session.user.credits}
                                </Text>
                            </View>
                        </Animated.View>
                    </View>
                    <Animated.View style={{
                        left: this.state.animate,
                        backgroundColor: '#233445',
                        height: 150,
                        marginLeft: 10,
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0)',
                        borderRadius: 5,
                    }}>
                        <View style={{ height: 25, backgroundColor: "#16212C", flexDirection: 'row', alignItems: 'center', elevation: 0 }}>
                            <IconMC name="brightness-1" style={{color: '#62c462', fontSize: 6, marginLeft: 8 }}/>
                            <Text style={{ color: "#fafafa", fontSize: 11, marginLeft: 5 }}>
                                Your login time over the last 7 days
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            marginTop: 1,
                        }}>
                            <Chart
                                style={{
                                    width: 360,
                                    height: 126,
                                }}
                                data={data}
                                verticalGridStep={1}
                                axisLabelColor="rgba(255, 255, 255, 0.5)"
                                gridColor="rgba(255, 255, 255, 0.1)"
                                type="line"
                                fillColor="rgba(98, 196, 98, 0.5)"
                                showDataPoint={false}
                                axisLineWidth={0}
                                showXAxisLabels={true}
                                showYAxisLabels={true}
                                color={['#62c462']}
                            />
                        </View>

                    </Animated.View>
                    <Animated.View style={{
                        right: this.state.animate,
                        backgroundColor: '#16212C',
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 10,
                        elevation: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <IconFA name="globe" style={{color: '#62c462', fontSize: 12, marginLeft: 8 }} />
                        <Text style={{ color: '#fafafa', fontSize: 11, margin: 5 }}>
                            Promotion
                        </Text>
                    </Animated.View>
                    <View style={{ flexDirection: 'row', flex: 1, }}>
                        <Animated.View style={{
                            right: this.state.animate,
                            marginTop: 10,
                            marginLeft: 10,
                            height: 150,
                            flex: 0.5,
                            backgroundColor: "#233445",
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0)',
                            borderRadius: 5,
                        }}>
                            <View style={{ height: 25, backgroundColor: "#16212C", flexDirection: 'row', alignItems: 'center', elevation: 3 }}>
                                <IconMC name="brightness-1" style={{ color: '#62c462', fontSize: 6, marginLeft: 8,}} />
                                <Text style={{ color: "#fafafa", fontSize: 11, marginLeft: 5 }}>
                                    Average GPA
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <AnimatedGaugeProgress
                                    style={{
                                        alignSelf: 'flex-start',
                                    }}
                                    size={70}
                                    width={3}
                                    fill={30}
                                    rotation={90}
                                    cropDegree={80}
                                    tintColor={this._renderGpaColor(22)}
                                    backgroundColor="#16212C"
                                    strokeCap="circle" />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    color: '#fafafa',
                                    fontSize: 12,
                                }}>
                                    2.20
                                </Text>
                            </View>
                        </Animated.View>
                        <Animated.View style={{
                            left: this.state.animate,
                            margin: 10,
                            marginLeft: 10,
                            height: 150,
                            flex: 0.5,
                            backgroundColor: "#233445",
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0)',
                            borderRadius: 5,
                        }}>
                            <View style={{ height: 25, backgroundColor: "#16212C", flexDirection: 'row', alignItems: 'center', elevation: 3}}>
                                <IconMC name="brightness-1" style={{color: '#62c462', fontSize: 6, marginLeft: 8,}}/>
                                <Text style={{color: "#fafafa", fontSize: 11, marginLeft: 5,}}>
                                    Average credits
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <AnimatedGaugeProgress
                                    style={{
                                        alignSelf: 'flex-start',
                                    }}
                                    size={70}
                                    width={3}
                                    fill={60}
                                    rotation={90}
                                    cropDegree={80}
                                    tintColor={this._renderCreditsColor(creditsPercentage)}
                                    backgroundColor="#16212C"
                                    strokeCap="circle" />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    color: '#fafafa',
                                    fontSize: 12,
                                }}>
                                    80
                                </Text>
                            </View>
                        </Animated.View>
                    </View>
                    <Animated.View style={{
                        top: this.state.animate,
                        backgroundColor: '#233445',
                        height: 150,
                        marginLeft: 10,
                        marginRight: 10,
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0)',
                        borderRadius: 5,
                        marginBottom: 10,
                    }}>
                        <View style={{height: 25, backgroundColor: "#16212C", flexDirection: 'row', alignItems: 'center'}}>
                            <IconMC name="brightness-1" style={{color: '#62c462', fontSize: 6, marginLeft: 8,}}/>
                            <Text style={{color: "#fafafa", fontSize: 11, marginLeft: 5,}}>
                                The average login time of your promotion in the last 7 days
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            marginTop: 1,
                        }}>
                            <Chart
                                style={{
                                    width: 360,
                                    height: 126,
                                }}
                                data={data}
                                verticalGridStep={1}
                                axisLabelColor="rgba(255, 255, 255, 0.5)"
                                gridColor="rgba(255, 255, 255, 0.1)"
                                type="line"
                                fillColor="rgba(98, 196, 98, 0.5)"
                                showDataPoint={false}
                                axisLineWidth={0}
                                showXAxisLabels={true}
                                showYAxisLabels={true}
                                color={['#62c462']}
                            />
                        </View>
                    </Animated.View>
                </ScrollView>
            </View>
        );
    }
};
