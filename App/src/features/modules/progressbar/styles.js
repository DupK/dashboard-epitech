import {
	Platform,
	StyleSheet,
} from 'react-native';

const widthProgressBar = 6;

// Indicator
const widthIndicator = 20;
const heightIndicator = 5;
const colorIndicator = '#F9F9F9';

const styles = StyleSheet.create({

	container: {
		flex: 100,
		alignItems: 'center',
		backgroundColor: '#233445',
	},

	gradient: {
		flex: 100,
		alignItems: 'center',
		width: widthProgressBar,
	},

	incompletPercentage: {
		width: widthProgressBar,
		backgroundColor: '#F9F9F9',
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
	},

	indicator: {
		width: widthIndicator,
		height: heightIndicator,
		backgroundColor: colorIndicator,
	},

	fillBar: {
		width: widthProgressBar,
		backgroundColor: 'transparent'
	}

});

export default styles;