import {
	Platform,
	StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({

	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},

	subContainer: {
		flexDirection: 'column',
		alignItems: 'center',
	},

	animateNumber: {
		color: '#F9F9F9',
		fontSize: 15,
		fontWeight: 'bold',
	},

	label: {
		fontSize: 9,
		color: '#F9F9F9',
	}

});

export default styles;