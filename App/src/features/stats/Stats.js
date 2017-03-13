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
                duration: 1000,
                delay: 500,
                easing: Easing.inOut(Easing.ease),
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
        const radarSettings = {
            width: 250,
            height: 250,
            r: 100,
            max: 50,
            fill: "#62c462",
            stroke: "rgba(255, 255, 255, 0.1)",
            label: {
                fontFamily: 'Arial',
                fontSize: 9,
                fill: '#FAFAFA',
                fontWeight: true,
            }
        }
        const pieSettings = {
            margin: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            legendPosition: 'center',
            width: 250,
            height: 250,
            color: ['#62c462', '#ffc754', '#F27935', '#f44336', '#2D2D2D'],
            r: 67.5,
            R: 70,
            label: {
                fontFamily: 'Arial',
                fontWeight: true,
                fontSize: 10,
                color: '#FAFAFA',
            }
        }

        return (
            <View style={{ flex: 1, backgroundColor: "#2c3e50" }}>
                <ScrollView>
                    <Header icon="street-view" title="Personal Information" />
                    <View style={{ flexDirection: 'row', flex: 1, }}>
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
                    </View>
                    <LargeCell
                        iconHeader="brightness-1"
                        textHeader="Your grade distribution over the year"
                    >
                        <Radar data={radarData} options={radarSettings} />
                    </LargeCell>
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
                    <Header icon="globe" title="Promotion" />
                    <View style={{ flexDirection: 'row', flex: 1, }}>
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
                    </View>
                    <LargeCell
                        iconHeader="brightness-1"
                        textHeader="Your grade distribution over the year"
                    >
                        <Pie data={pieData} options={pieSettings} accessorKey="population"/>
                    </LargeCell>
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
                    <View style={{ marginTop: 10 }} />
                </ScrollView>
            </View>
        );
    }
};
