import React, {Component} from 'react';
import {ScrollView, Text, View} from "react-native";
import IconIO from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';

import styles from './styles';

class Sections extends Component {
	constructor(props) {
		super(props);

		this._renderHeader = this._renderHeader.bind(this);
		this._renderContent = this._renderContent.bind(this);
		this._generateSections = this._generateSections.bind(this);
	}

	_generateSections() {
		const registrations = {
			title: 'Registrations',
			icon: 'ios-pulse-outline',
			content: <View/>
		};
		const projects = {
			title: 'Projects',
			icon: 'ios-cafe-outline',
			content: <View/>
		};

		return [registrations, projects];
	}

	_renderHeader(section) {
		const {
			title,
			icon,
		} = section;

		return (
			<View style={styles.header}>
				<IconIO style={styles.headerIcon} name={icon} size={24}/>
				<Text style={styles.headerText}>{title}</Text>
			</View>
		)
	}

	_renderContent() {
		return (
			<View style={styles.content}>
			</View>
		)
	}

	render() {

		return (
			<ScrollView style={styles.container}>
				<Accordion
					underlayColor="#203040"
					sections={this._generateSections()}
					renderHeader={this._renderHeader}
					renderContent={this._renderContent}
				/>
			</ScrollView>
		)
	}
}

export default Sections;