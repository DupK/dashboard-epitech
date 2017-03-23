/**
 * Created by desver_f on 10/03/17.
 */
import React, {Component} from 'react';
import moment from 'moment';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Animated,
    Easing,
    TouchableOpacity,
    InteractionManager,
    LayoutAnimation
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ENIcon from 'react-native-vector-icons/Entypo';
import {observer} from 'mobx-react/native';
import LoadingIndicator from 'react-native-spinkit';
import {wasRegistered} from '../utils';

import BoxDescription from './description/BoxDescription';
import TextDescription from './description/TextDescription';
import AdministrativeDescription from './description/AdministrativeDescription'
import RegisterBox from './register/RegisterBox';
import RegisterText from './register/RegisterText';
import ViewAvailableSlots from './register/ViewAvailableSlots';
import RegisterActivity from './register/RegisterActivity';

@observer
export default class Activity extends Component {

    constructor(props) {
        super(props);

    }

    async componentWillMount() {
        const { store: { activity: activityStore }, event} = this.props;

        await activityStore.fetchActivity(event);
    }

    componentWillUnmount() {
        const { store: { activity: activityStore }} = this.props;

        activityStore.resetActivity();
    }

    renderRegisterContainer() {
        const {
            event,
            store: { activity: activityStore, projects },
        } = this.props;

        const pastOneDay = moment(event.start).isBefore(moment().add(1, 'd'));

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
            store: { activity: activityStore },
        } = this.props;

        if (!activityStore.activity) {
            return (
                <View style={styles.loadingContainer}>
                    <LoadingIndicator
                        isVisible={!activityStore.activity}
                        color="#FFFFFF"
                        type="Pulse"
                        size={100}
                    />
                </View>
            );
        }

        const description = activityStore.activity.description
            ? activityStore.activity.description
            : 'There is no description for the following activity.';

        console.log(activityStore.activity);
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#233445',
            }}>
                <BoxDescription
                    style={[styles.boxContainer, { flex: 1 } ]}
                    title="Activity details"
                    icon={<ENIcon name="info" color="#FAFAFA" size={15}/>}
                >
                    <TextDescription>{ description }</TextDescription>
                </BoxDescription>
                <BoxDescription
                    style={[styles.boxContainer, { flex: 0.8 } ]}
                    title="Administrative details"
                    icon={<Icon name="ios-school" color="#FAFAFA" size={25}/>}
                >
                    <AdministrativeDescription
                        room={activityStore.roomName}
                        registeredStudents={activityStore.activity.events[0].nb_registered}
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
    boxContainer: {
        elevation: 4,
        backgroundColor: '#233445',
        paddingTop: 10,
        paddingLeft: 15,
        margin: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#233445',
    },
    registerSlotsBox: {
        flex: 0.3,
        margin: 10,
        marginBottom: 15,
        paddingLeft: 15,
        elevation: 3,
        backgroundColor: '#233445',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

