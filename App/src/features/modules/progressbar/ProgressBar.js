import React, {Component, PropTypes} from 'react';
import {View, Animated} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

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

		return (
			<View style={styles.container}>
				<LinearGradient
					colors={this.props.colors}
					style={styles.gradient}>
					<View style={[
						styles.incompletPercentage,
						{flex: this.props.incompletePercentage}
					]}/>
					<View style={styles.indicator}/>
					<Fillbar style={[
						styles.fillBar,
						{flex: this.state.animatedFilling}
					]}/>
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
