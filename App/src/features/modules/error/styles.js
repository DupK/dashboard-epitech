import {
	Platform,
	StyleSheet,
} from 'react-native';

const DEBUG = true;

const styles = StyleSheet.create({

	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#233445',
		justifyContent: 'center',
	},

	icon: {
		color: '#2c3e50',
		alignSelf: 'center',
	},

	label: {
		marginTop: 10,
		color: '#2c3e50',
		alignSelf: 'center',
		fontSize: 15,
	}

});

export default styles;