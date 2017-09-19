import {
	StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({

	container: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 5,
		marginBottom: 5,
	},

	subContainer: {
		flex: 0.85,
		justifyContent: 'center',
		alignItems: 'flex-start',
		height: 40,
		backgroundColor: '#283B4E',
		borderLeftWidth: 5,
		marginLeft: 5,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowRadius: 1.5,
		shadowOpacity: 0.3,
	},

	buttonContainer: {
		flex: 0.15,
		justifyContent: 'center',
		height: 40,
		backgroundColor: '#283B4E',
		marginLeft: 2,
		marginRight: 5,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowRadius: 1.5,
		shadowOpacity: 0.3,
	},

	icon: {
		color: '#F9F9F9',
		alignSelf: 'center',
	},

	title: {
		color: '#F9F9F9',
		fontSize: 12,
		marginLeft: 10
	},

});

export default styles;