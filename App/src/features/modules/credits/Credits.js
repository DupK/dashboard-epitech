import React, {Component} from 'react';
import {Text, View} from "react-native";
import AnimateNumber from 'react-native-animate-number';

import styles from './styles';

class Credits extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<AnimateNumber
						style={styles.animateNumber}
						value={120}
						timing="easeOut"
						interval={20}
						countBy={1}
						formatter={(val) => {
							return parseFloat(val).toFixed(0)
						}}
					/>
					<Text style={styles.label}>Crédits</Text>
				</View>
				<View style={styles.subContainer}>
					<AnimateNumber
						style={styles.animateNumber}
						value={26}
						timing="easeOut"
						interval={20}
						countBy={1}
						formatter={(val) => {
							return parseFloat(val).toFixed(0)
						}}
					/>
					<Text style={styles.label}>Crédits engagés</Text>
				</View>
				<View style={styles.subContainer}>
					<AnimateNumber
						style={styles.animateNumber}
						value={180}
						timing="easeOut"
						interval={20}
						countBy={1}
						formatter={(val) => {
							return parseFloat(val).toFixed(0)
						}}
					/>
					<Text style={styles.label}>Crédits requis</Text>
				</View>
			</View>
		)
	}
}

export default Credits;
