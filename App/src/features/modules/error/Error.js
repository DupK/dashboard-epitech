import React, {Component} from 'react';
import {Text, View} from "react-native";
import IconIO from 'react-native-vector-icons/Ionicons';

import styles from './styles';

class Error extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<IconIO
					name="ios-flask-outline"
					size={100}
					style={styles.icon}
				/>
				<Text style={styles.label}>
					No module available
				</Text>
			</View>
		)
	}
}

export default Error;
