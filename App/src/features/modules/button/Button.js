import React, {Component} from 'react';
import {Text, TouchableOpacity} from "react-native";

import styles from './styles';

class Button extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableOpacity style={styles.container}>
				<Text style={styles.label}>Inscription aux modules</Text>
			</TouchableOpacity>
		)
	}
}

export default Button;
