import React, {Component} from 'react';
import {Text, View} from "react-native";

import styles from './styles';

class Alert extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>
					Registration closed on 23.02.2017 at 23h42
				</Text>
			</View>
		)
	}
}

export default Alert;
