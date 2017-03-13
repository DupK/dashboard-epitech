/**
 * Created by jules on 15/02/17.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Easing,
} from 'react-native';
import { observer } from 'mobx-react/native';
import Chart from 'react-native-chart';
import { Radar, Pie } from 'react-native-pathjs-charts';
import Header from './Header';
import HalfCell from './HalfCell';
import LargeCell from './LargeCell';
import Cell from './Cell';
import { AnimatedGaugeProgress } from 'react-native-simple-gauge';
import { pieData, radarData, data } from './data';
import { pieSettings, radarSettings } from './settings';

@observer
export default class Stats extends Component {

    constructor() {
        super();
        this.state = {
            animate: new Animated.Value(400),
        }

        this._renderColor = this._renderColor.bind(this);
    }

    componentDidMount() {
        Animated.timing(
            this.state.animate,
            {
                toValue: 0,
                duration: 2000,
                delay: 500,
                easing: Easing.elastic(1),
            }).start()
    }

    _renderColor(data) {
        if (data >= 70)
            return '#62c462'
        else if (data >= 50)
            return '#ffc754'
        else if (data <= 50)
            return '#f44336'
    }

    render() {

        const { store: { session } } = this.props;
        const gpaPercentage = (session.session.user.gpa / 4) * 100;
        const creditsPercentage = (session.session.user.credits / (session.session.user.studentyear * 60)) * 100;

        return (
            <View style={{ flex: 1, backgroundColor: "#2c3e50" }}>
                <ScrollView>

                    <Animated.View style={{ bottom: this.state.animate }}>
                        <Header icon="street-view" title="Personal Information" />
                    </Animated.View>

                    <View style={{ flexDirection: 'row', flex: 1 }}>

                        <Animated.View style={{ right: this.state.animate, flex: 0.47, marginBottom: 10 }}>
                            <HalfCell
                                iconHeader="brightness-1"
                                titleHeader="Your GPA"
                                dataLegend={session.session.user.gpa}
                                leftCell={true}
                            >
                                <AnimatedGaugeProgress
                                    style={{ alignSelf: 'flex-start' }}
                                    size={70}
                                    width={3}
                                    fill={gpaPercentage}
                                    rotation={90}
                                    cropDegree={80}
                                    tintColor={this._renderColor(gpaPercentage)}
                                    backgroundColor="#16212C"
                                    strokeCap="circle"
                                />
                            </HalfCell>
                        </Animated.View>

                        <Animated.View style={{ left: this.state.animate, flex: 0.50 }}>
                            <HalfCell
                                iconHeader="brightness-1"
                                titleHeader="Your credits"
                                dataLegend={session.session.user.credits}
                                leftCell={false}
                            >
                                <AnimatedGaugeProgress
                                    style={{ alignSelf: 'flex-start' }}
                                    size={70}
                                    width={3}
                                    fill={creditsPercentage}
                                    rotation={90}
                                    cropDegree={80}
                                    tintColor={this._renderColor(creditsPercentage)}
                                    backgroundColor="#16212C"
                                    strokeCap="circle"
                                />
                            </HalfCell>
                        </Animated.View>
                    </View>

                    <Animated.View style={{ right: this.state.animate }}>
                        <LargeCell
                            iconHeader="brightness-1"
                            textHeader="Your grade distribution over the year"
                        >
                            <Radar data={radarData} options={radarSettings} />
                        </LargeCell>
                    </Animated.View>

                    <Animated.View style={{ left: this.state.animate }}>
                        <Cell
                            iconHeader="brightness-1"
                            textHeader="Your GPA over the last 7 month"
                        >
                            <Chart
                                style={{ width: 360, height: 126,}}
                                data={data}
                                verticalGridStep={1}
                                axisLabelColor="rgba(255, 255, 255, 0.5)"
                                gridColor="rgba(255, 255, 255, 0.1)"
                                type="line"
                                fillColor="rgba(98, 196, 98, 0.5)"
                                showDataPoint={true}
                                dataPointRadius={1.5}
                                axisLineWidth={0}
                                showXAxisLabels={true}
                                showYAxisLabels={true}
                                color={['#62c462']}
                            />
                        </Cell>
                    </Animated.View>

                    <Animated.View style={{ right: this.state.animate }}>
                        <Cell
                            iconHeader="brightness-1"
                            textHeader="Your login time over the last 7 days"
                        >
                            <Chart
                                style={{ width: 360, height: 126,}}
                                data={data}
                                verticalGridStep={1}
                                axisLabelColor="rgba(255, 255, 255, 0.5)"
                                gridColor="rgba(255, 255, 255, 0.1)"
                                type="line"
                                fillColor="rgba(98, 196, 98, 0.5)"
                                showDataPoint={true}
                                dataPointRadius={1.5}
                                axisLineWidth={0}
                                showXAxisLabels={true}
                                showYAxisLabels={true}
                                color={['#62c462']}
                            />
                        </Cell>
                    </Animated.View>

                    <Animated.View style={{ left: this.state.animate }}>
                        <Header icon="globe" title="Promotion" />
                    </Animated.View>

                    <View style={{ flexDirection: 'row', flex: 1, }}>

                        <Animated.View style={{ right: this.state.animate, flex: 0.46, marginBottom: 10}}>
                            <HalfCell
                                iconHeader="brightness-1"
                                titleHeader="Average GPA"
                                dataLegend="2.20"
                                leftCell={true}
                            >
                                <AnimatedGaugeProgress
                                    style={{ alignSelf: 'flex-start' }}
                                    size={70}
                                    width={3}
                                    fill={30}
                                    rotation={90}
                                    cropDegree={80}
                                    tintColor={this._renderColor(30)}
                                    backgroundColor="#16212C"
                                    strokeCap="circle"
                                />
                            </HalfCell>
                        </Animated.View>

                        <Animated.View style={{ left: this.state.animate, flex: 0.5 }}>
                            <HalfCell
                                iconHeader="brightness-1"
                                titleHeader="Average credits"
                                dataLegend="80"
                                leftCell={false}
                            >
                                <AnimatedGaugeProgress
                                    style={{ alignSelf: 'flex-start' }}
                                    size={70}
                                    width={3}
                                    fill={60}
                                    rotation={90}
                                    cropDegree={80}
                                    tintColor={this._renderColor(60)}
                                    backgroundColor="#16212C"
                                    strokeCap="circle"
                                />
                            </HalfCell>
                        </Animated.View>
                    </View>
                    <Animated.View style={{ right: this.state.animate }}>
                        <LargeCell
                            iconHeader="brightness-1"
                            textHeader="Your grade distribution over the year"
                        >
                            <Pie data={pieData} options={pieSettings} accessorKey="population"/>
                        </LargeCell>
                    </Animated.View>

                    <Animated.View style={{ left: this.state.animate }}>
                        <Cell
                            iconHeader="brightness-1"
                            textHeader="The average GPA of your promotion in the last 7 month"
                        >
                            <Chart
                                style={{width: 360, height: 126,}}
                                data={data}
                                verticalGridStep={1}
                                axisLabelColor="rgba(255, 255, 255, 0.5)"
                                gridColor="rgba(255, 255, 255, 0.1)"
                                type="line"
                                fillColor="rgba(98, 196, 98, 0.5)"
                                showDataPoint={true}
                                dataPointRadius={1.5}
                                axisLineWidth={0}
                                showXAxisLabels={true}
                                showYAxisLabels={true}
                                color={['#62c462']}
                            />
                        </Cell>
                    </Animated.View>

                    <Animated.View style={{ right: this.state.animate }}>
                        <Cell
                            iconHeader="brightness-1"
                            textHeader="The average login time of your promotion in the last 7 days"
                        >
                            <Chart
                                style={{width: 360, height: 126,    }}
                                data={data}
                                verticalGridStep={1}
                                axisLabelColor="rgba(255, 255, 255, 0.5)"
                                gridColor="rgba(255, 255, 255, 0.1)"
                                type="line"
                                fillColor="rgba(98, 196, 98, 0.5)"
                                showDataPoint={true}
                                dataPointRadius={1.5}
                                axisLineWidth={0}
                                showXAxisLabels={true}
                                showYAxisLabels={true}
                                color={['#62c462']}
                            />
                        </Cell>
                    </Animated.View>

                    <View style={{ marginTop: 10 }} />
                </ScrollView>
            </View>
        );
    }
};
