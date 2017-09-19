import React, { Component } from 'react';
import { View } from 'react-native';
import { TabBar, TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view';

import Subscription from './subscription/Subscription';

import styles from './styles';

class Modules extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	index: 0,
	        routes: [
		        { key: '1', title: 'Listing'},
		        { key: '2', title: 'Overview'}
	        ],
        };
    }

    _handleChangeTab = (index) => {
    	this.setState({ index });
    };

    _renderFooter = (props) => {
    	return <TabBar
		    {...props}
		    indicatorStyle={styles.indicator}
		    style={styles.tabBar}
		    labelStyle={styles.label}
	    />
    };

	_renderScene = ({ route }) => {
		switch (route.key) {
			case '1':
				return <Subscription/>;
			case '2':
				return <View/>;
			default:
				return null;
		}
	};

	_renderPager = (props) => {
		return <TabViewPagerPan {...props} swipeEnabled={false} />;
	};

    render() {
        return (
            <TabViewAnimated
	            style={styles.tabView}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderFooter={this._renderFooter}
                renderPager={this._renderPager}
                onRequestChangeTab={this._handleChangeTab}
            />
        )
    }
}

export default Modules;
