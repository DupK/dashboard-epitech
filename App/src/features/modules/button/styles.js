import {
	Platform,
	StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({

	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#283B4E',
		margin: 8,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowRadius: 1.5,
		shadowOpacity: 0.3,
	},

	label: {
		color: '#F9F9F9',
		fontSize: 12,
	}

});

export default styles;