import React, {Component, PropTypes} from 'react';
import {View, Animated} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const Fillbar = Animated.createAnimatedComponent(View);

class ProgressBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			animatedFilling: new Animated.Value(0),
		};
	}

	componentDidMount() {
		Animated.spring(this.state.animatedFilling, {
			toValue: this.props.completePercentage,
			speed: 5,
			bounciness: 30,
		}).start();
	}

	componentWillReceiveProps() {
		Animated.spring(this.state.animatedFilling, {
			toValue: this.props.completePercentage,
			speed: 5,
			bounciness: 30,
		}).start();
	}

	render() {

		// ProgressBar
		const widthProgressBar = 6;

		// Indicator
		const widthIndicator = 20;
		const heightIndicator = 5;
		const colorIndicator = '#F9F9F9';

		return (
			<View style={{
				flex: 100,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#233445'
			}}>
				<LinearGradient
					colors={this.props.colors}
					style={{
						flex: 100,
						justifyContent: 'center',
						alignItems: 'center',
						width: widthProgressBar,
						borderRadius: 10,
					}}>
					<View style={{
						flex: this.props.incompletePercentage,
						width: widthProgressBar,
						backgroundColor: '#F9F9F9',
						borderTopRightRadius: 5,
						borderTopLeftRadius: 5
					}}/>
					<View style={{
						width: widthIndicator,
						height: heightIndicator,
						backgroundColor: colorIndicator,
					}}/>
					<Fillbar style={{
						flex: this.state.animatedFilling,
						width: widthProgressBar,
						backgroundColor: 'transparent'
					}}/>
				</LinearGradient>
			</View>
		)
	}
}

ProgressBar.PropTypes = {
	completePercentage: PropTypes.number,
	incompletePercentage: PropTypes.number,
	colors: PropTypes.array,
};

export default ProgressBar;
