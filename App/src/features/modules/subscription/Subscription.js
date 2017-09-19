import React, { Component } from 'react';
import _ from 'lodash';
import {ScrollView, View} from 'react-native';
import ProgressBar from '../progressbar/ProgressBar';
import Module from '../module/Module';
import Error from '../error/Error';
import Button from '../button/Button';
import Credits from '../credits/Credits';

import styles from './styles';

class Subscription extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		const completePercentage = Math.floor(120 * 100 / 180);
		const incompletePercentage = Math.floor((180 - 120) * 100 / 180);
		const gradientColors = [
			'#62C462',
			'#FFD783',
			'#F44336',
		];

		const modules = [
			{
				title: "B5 - Piscine Moonshoot",
				registered: false,
				credits: 3,
				projects: [
					{},
					{},
					{},
				],
			},
			{
				title: "B5 - Administration Système",
				registered: false,
				credits: 2,
			},
			{
				title: "B5 - C++ Advanced",
				registered: false,
				credits: 7,
			},
			{
				title: "B5 - Développement Java",
				registered: false,
				credits: 3,
			},
			{
				title: "B5 - Développement client .NET",
				registered: false,
				credits: 3,
			},
			{
				title: "B5 - Développement .NET",
				registered: false,
				credits: 3,
			},
			{
				title: "B5 - Java mobile",
				registered: false,
				credits: 3,
			},
			{
				title: "B5 - Shape your internship",
				registered: false,
				credits: 1,
			},
			{
				title: "B5 - Sport",
				registered: false,
				credits: 2,
			},
			{
				title: "B5 - Communication",
				registered: false,
				credits: 3,
			},
		];

		return (
			<View style={styles.layout}>
				<View style={styles.container}>
					{
						modules.length ?
							(<ScrollView showsVerticalScrollIndicator={false} style={styles.modulesSubContainer}>
								{ _.map(modules, (module, key) => <Module module={module} key={key}/>) }
							</ScrollView>)
							:
							(<View style={styles.modulesSubContainer}>
								<Error/>
							</View>)
					}
					<View style={styles.progressBarSubContainer}>
						<ProgressBar
							completePercentage={completePercentage}
							incompletePercentage={incompletePercentage}
							colors={gradientColors}
						/>
					</View>
				</View>
				<View style={styles.subContainer}>
					<View style={styles.detailsContainer}>
						<Credits/>
					</View>
					<View style={styles.buttonContainer}>
						<Button/>
					</View>
				</View>
			</View>
		)
	}
}

export default Subscription;
