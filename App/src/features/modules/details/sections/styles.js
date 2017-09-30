import {
	StyleSheet
} from "react-native";

const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: "#23303F",
	},

	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 70,
		backgroundColor: '#263443',
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
	},

	headerIcon: {
		color: '#F9F9F9',
		marginLeft: 30,
	},

	headerText: {
		color: '#F9F9F9',
		fontSize: 14,
		marginLeft: 20,
	},

	content: {
		height: 50,
		backgroundColor: 'red',
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
	},

});

export default styles;