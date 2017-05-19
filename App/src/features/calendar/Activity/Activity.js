/**
 * Created by desver_f on 10/03/17.
 */
import React, { Component } from 'react';
import moment from 'moment';
import { Platform, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ENIcon from 'react-native-vector-icons/Entypo';
import { observer } from 'mobx-react/native';
import { wasRegistered } from '../utils';

import BoxDescription from './description/BoxDescription';
import TextDescription from './description/TextDescription';
import AdministrativeDescription from './description/AdministrativeDescription';
import RegisterBox from './register/RegisterBox';
import RegisterText from './register/RegisterText';
import ViewAvailableSlots from './register/ViewAvailableSlots';
import RegisterActivity from './register/RegisterActivity';
import ConnectionError from '../../../shared/components/ConnectionError';
import LoadingIndicator from '../../../shared/components/LoadingIndicator';

@observer
export default class Activity extends Component {

    constructor(props) {
        super(props);

        this.fetchActivity = this.fetchActivity.bind(this);
    }

    async fetchActivity() {
        const { store: { activity: activityStore }, event } = this.props;

        await activityStore.fetchActivity(event);
    }

    async componentWillMount() {
        await this.fetchActivity();
    }

    componentWillUnmount() {
        const { store: { activity: activityStore } } = this.props;

        activityStore.resetActivity();
    }

    renderRegisterContainer() {
        const {
            event,
            store: { activity: activityStore, projects },
        } = this.props;

        const pastOneDay = moment(event.start)
            .isBefore(moment()
                .add(1, 'd'));

        if (pastOneDay && !wasRegistered(event.registered)) {
            return (
                <RegisterBox>
                    <RegisterText>
                        You can no longer register to this activity.
                    </RegisterText>
                </RegisterBox>
            );
        }


        if (activityStore.activity.slots.length) {
            return (
                <ViewAvailableSlots
                    activityTitle={activityStore.activity.title}
                    event={event}
                    isRegisteredToRelatedProject={projects.isRegisteredToRelatedProject(activityStore.activity)}
                />
            );
        }

        return <RegisterActivity activityStore={activityStore} event={event}/>;
    }

    render() {
        const {
            event,
            store: { activity: activityStore, ui },
        } = this.props;

        if (ui.currentState === ui.state.error) {
            return (
                <ConnectionError onPress={this.fetchActivity}/>
            );
        }

        if (ui.currentState === ui.state.fetching) {
            return (
                <LoadingIndicator
                    isVisible={!activityStore.activity}
                    message="Loading activity..."
                />
            );
        }

        const description = activityStore.activity.description
            ? activityStore.activity.description
            : 'There is no description for the following activity.';

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#233445',
            }}>
                <BoxDescription
                    style={[Platform.OS === 'ios' ? styles.boxContainerIOS : styles.boxContainerAndroid, {flex: 1}]}
                    title="Activity details"
                    icon={<ENIcon name="info" color="#FAFAFA" size={15}/>}
                >
                    <TextDescription>{ description }</TextDescription>
                </BoxDescription>
                <BoxDescription
                    style={[Platform.OS === 'ios' ? styles.boxContainerIOS : styles.boxContainerAndroid, {flex: 0.8}]}
                    title="Administrative details"
                    icon={<Icon name="ios-school" color="#FAFAFA" size={25}/>}
                >
                    <AdministrativeDescription
                        room={activityStore.roomName}
                        registeredStudents={parseInt(activityStore.activity.events[0].nb_registered)}
                        date={moment(event.start).format('DD.MM.YYYY')}
                        startTime={moment(event.start).format('HH:mm')}
                        endTime={moment(event.end).format('HH:mm')}
                    />
                </BoxDescription>
                { this.renderRegisterContainer() }
            </View>
        );
    }
}

Activity.propTypes = {
    event: React.PropTypes.object,
};

const styles = StyleSheet.create({
    boxContainerAndroid: {
        elevation: 4,
        backgroundColor: '#233445',
        paddingTop: 10,
        paddingLeft: 15,
        margin: 10,
    },

    boxContainerIOS: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 1.5,
        shadowOpacity: 0.5,
        backgroundColor: '#233445',
        paddingTop: 10,
        paddingLeft: 15,
        margin: 10,
    },

});

