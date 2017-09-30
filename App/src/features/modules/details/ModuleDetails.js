import React, {Component} from 'react';
import {View} from "react-native";

import Banner from './banner/Banner';
import Sections from './sections/Sections';
import Alert from './alert/Alert';

import styles from './styles';

class ModuleDetails extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.alertContainer}>
					<Alert/>
				</View>
				<View style={styles.bannerContainer}>
					<Banner/>
				</View>
				<View style={styles.sectionsContainer}>
					<Sections/>
				</View>
			</View>
		)
	}
}

export default ModuleDetails;