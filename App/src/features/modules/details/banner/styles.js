import {
	StyleSheet
} from "react-native";

const styles = StyleSheet.create({

	container: {
		flex: 1,
		margin: 15,
	},

	element: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	credits: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#F9F9F9',
		marginRight: 30,
	},

	title: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#F9F9F9'
	},

	text: {
		fontSize: 12,
		color: '#F9F9F9',
	},

	description: {
		fontSize: 12,
		color: '#F9F9F9',
		marginTop: 5,
	},

});

export default styles;