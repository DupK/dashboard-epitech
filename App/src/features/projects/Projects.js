import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { TabViewAnimated, TabBar, TabViewPagerPan } from 'react-native-tab-view';
import {
    AppRegistry,
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import ProjectsTimeline from './ProjectsTimeline';
import ProjectsList from './ProjectsList';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

@observer
export default class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            routes: [
                { key: '1', title: 'Listing' },
                { key: '2', title: 'Overview' },
            ],
        };

    }

    _handleChangeTab = (index) => {
        this.setState({ index });
    };

    _renderFooter = (props) => {
        return <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: 'white',
            }}
            style={{
                backgroundColor: '#2c3e50',
                height: 50,
            }}
            labelStyle={{
                fontFamily: 'Nunito-Light',
                fontSize: 14,
            }}

        />;
    };

    _renderScene = ({ route }) => {
        const { store: { projects: projectsStore } } = this.props;

        switch (route.key) {
            case '1':
                return <ProjectsList projectsStore={projectsStore} />;
            case '2':
                return <ProjectsTimeline projectsStore={projectsStore} />;
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
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderFooter={this._renderFooter}
                renderPager={this._renderPager}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }
}