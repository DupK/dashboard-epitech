import {
	StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({

	indicator: {
		backgroundColor: '#233445',
		height: 4,
	},

	tabBar: {
		backgroundColor: '#F9F9F9',
		height: 45,
		borderTopWidth: 1,
		borderTopColor: 'rgba(255, 255, 255, 0.1)'
	},

	label: {
		fontSize: 12,
		color: '#233445'
	},

	tabView: {
		flex: 1,
	}

});

export default styles;