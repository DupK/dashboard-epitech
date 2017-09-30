import React, {Component} from 'react';
import {ScrollView, Text, View} from "react-native";

import styles from './styles';

class Banner extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		const title = ".NET Programming";
		const credits = 3;
		const description = "Introducing module for .NET and associated tools. This module will allow you to master .net development and will delve into the use of the daily tools of a .net developper, as well as you few major librariesThis module contains two projects : the first one will allow you to discover the language through the development of an application, and the second one will get of the details of use and development of a web service.";
		const skill = "+ Technical skills\n" +
			"- Knowledge and basic understanding of the various environnements .net executes in.\n" +
			"- Syntax and specificities of the .net language.";

		return (
			<ScrollView style={styles.container}>
				<View style={styles.element}>
					<View style={styles.element}>
						<Text style={styles.title}>Module :</Text>
						<Text style={styles.text}> {title}{"\n"}</Text>
					</View>
					<View style={styles.element}>
						<Text style={styles.credits}>{credits} CDS</Text>
					</View>
				</View>
				<View style={{ marginBottom: 10 }}>
					<Text style={styles.title}>Description :</Text>
					<Text style={styles.description}>{description}</Text>
				</View>
				<View style={{ marginBottom: 10 }}>
					<Text style={styles.title}>Skills :</Text>
					<Text style={styles.description}>{skill}</Text>
				</View>
			</ScrollView>
		)
	}
}

export default Banner;