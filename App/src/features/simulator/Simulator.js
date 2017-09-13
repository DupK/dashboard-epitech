import React, { Component } from 'react';
import {View} from 'react-native';

import ProgressBar from './ProgressBar';

class Simulator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCredits: 120,
	        creditsToAchieve: 180,
        };
    }

	render() {

		let completePercentage = Math.floor(this.state.currentCredits * 100 / this.state.creditsToAchieve);
		let incompletePercentage = Math.floor((this.state.creditsToAchieve - this.state.currentCredits) * 100 / this.state.creditsToAchieve);

		const colors = [
			'#62C462',
			'#FFD783',
			'#F44336',
		];

		return (
			<View style={{ flex: 1 }}>
                <ProgressBar
	                completePercentage={completePercentage}
	                incompletePercentage={incompletePercentage}
	                colors={colors}
                />
			</View>
        )
    }
}

export default Simulator;
