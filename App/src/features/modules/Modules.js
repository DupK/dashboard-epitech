import React, { Component } from 'react';
import moment from 'moment';
import { TabBar, TabViewAnimated, TabViewPagerPan } from 'react-native-tab-view';

import Subscription, { modules } from './subscription/Subscription';
import ProjectsTimeline, { ProjectLine } from '../projects/ProjectsTimeline';

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
		//TODO: plug store and replace 2017 by scolaryear
        const momentStart = moment().year(2017).month('Sep').startOf('month');
        const momentEnd = moment()
            .year(2017)
            .month('Sep')
            .add(1, 'year')
            .add(1, 'month')
            .startOf('month');

		switch (route.key) {
			case '1':
				return <Subscription/>;
			case '2':
				return <ProjectsTimeline
					momentStart={momentStart}
					momentEnd={momentEnd}
					items={modules}
					renderItemsLines={(item, i) => (
						<ProjectLine
							key={i}
							start={item.start}
							end={item.end}
							dateTimeFormat="DD-MM-YYYY"
							nthProject={i}
							projectName={item.title}
							color="rgba(35, 52, 69, 0.9)"
							timelineMomentStart={momentStart}
						/>
                    )}
				/>;
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
