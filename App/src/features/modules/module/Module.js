import React, {Component, PropTypes} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import { Actions } from 'react-native-router-flux';
import IconIO from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

class Module extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		const {
			title,
			registered,
			credits
		} = this.props.module;

		return (
			<View style={styles.container}>
				<TouchableOpacity style={[styles.subContainer, { borderLeftColor: registered ? '#62C462' : '#F65942'}]}>
					<Text style={styles.title}>{title} ({credits})</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => Actions.moduleDetails({ title: title})} style={styles.buttonContainer}>
					<IconIO
						name="information-variant"
						size={24}
						style={styles.icon}
					/>
				</TouchableOpacity>
			</View>
		)
	}
}

Module.PropTypes = {
	module: PropTypes.object.isRequired,
};

export default Module;
