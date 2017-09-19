import {
	StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({

	layout: {
		flex: 1,
		backgroundColor: '#233445',
	},

	container: {
		flex: 0.8,
		flexDirection: 'row',
	},

	modulesSubContainer: {
		flex: 0.85,
		marginTop: 5,
		marginBottom: 5,
	},

	progressBarSubContainer: {
		flex: 0.15,
	},

	subContainer: {
		flex: 0.2,
		elevation: 1,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: -2
		},
		shadowRadius: 1.5,
		shadowOpacity: 0.5,
	},

	buttonContainer: {
		flex: 0.5
	},

	detailsContainer: {
		marginTop: 5,
		flex: 0.5
	},


});

export default styles;