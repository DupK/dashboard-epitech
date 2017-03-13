/**
 * Created by desver_f on 10/03/17.
 */
import React, {Component} from "react";
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
    LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ENIcon from 'react-native-vector-icons/Entypo';
import SLIcon from 'react-native-vector-icons/SimpleLineIcons';
import { observer } from 'mobx-react/native';
import LoadingIndicator from 'react-native-spinkit';
import { Actions } from 'react-native-mobx';
import RegisterButton from './RegisterButton';

import { wasPresent } from '../utils';

const TextDetail = observer(({ bold, children }) => {
    return (
        <Text style={{
            color: '#FAFAFA',
            fontFamily: 'Nunito-Light',
            fontSize: 12,
            fontWeight: bold ? 'bold' : 'normal',
            lineHeight: 20,
        }}>
            { children }
        </Text>
    );
});

TextDetail.propTypes = {
    bold: React.PropTypes.bool,
    children: React.PropTypes.any,
};

const BoxDetail = observer(({ style, icon, leftTitle, rightTitle, description }) => {
    return (
        <View style={style}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    { icon }
                    <Text style={{
                        color: '#FAFAFA',
                        marginLeft: 15,
                    }}>
                        { leftTitle }
                    </Text>
                </View>
                <Text style={{
                    color: '#FAFAFA',
                    marginRight: 15,
                }}>
                    { rightTitle }
                </Text>
            </View>
            <View style={{
                paddingBottom: 30,
            }}>
                <ScrollView>
                    { description }
                </ScrollView>
            </View>
        </View>
    );
});

BoxDetail.propTypes = {
    description: React.PropTypes.any.isRequired,
    icon: React.PropTypes.node.isRequired,
    leftTitle: React.PropTypes.string.isRequired,
    rightTitle: React.PropTypes.string,
    style: React.PropTypes.any,
};

const AdministrativeDetails = observer((props) => {
    const {
        date,
        startTime,
        endTime,
        room,
        registeredStudents,
    } = props;

    return (
        <View>
            <TextDetail>
                This activity is scheduled for the&nbsp;
                <TextDetail bold>{date}</TextDetail>
            </TextDetail>
            <TextDetail>
                It begins at&nbsp;
                <TextDetail bold>{startTime}</TextDetail>&nbsp;
                and finishes at&nbsp;
                <TextDetail bold>{endTime}</TextDetail>&nbsp;
            </TextDetail>
            <TextDetail>
                See you in&nbsp;
                <TextDetail bold>{room}</TextDetail>&nbsp;!
            </TextDetail>
            <TextDetail>
                There are currently&nbsp;
                <TextDetail bold>{registeredStudents}</TextDetail>&nbsp;
                students registered.
            </TextDetail>
        </View>
    );
});

AdministrativeDetails.propTypes = {
    date: React.PropTypes.string,
    startTime: React.PropTypes.string,
    endTime: React.PropTypes.string,
    room: React.PropTypes.string,
    registeredStudents: React.PropTypes.number,
};

const RegisterBox = observer(({ activityStore, event }) => {

    const isEventPassed = moment(event.end).isBefore(moment());
    const registered = isEventPassed && !wasPresent(event.registered) ? 'forbidden' : event.registered;

    const registerText = {
        registered: 'You are registered.',
        unregistered: 'You are not registered.',
        forbidden: isEventPassed
            ? 'You can\'t register anymore.'
            : 'You can\'t register.',
        present: 'You were present to this activity.'
    };

    const registerCallbacks = {
        registered: async () => await activityStore.unregisterActivity(event),
        unregistered: async () => await activityStore.registerActivity(event),
        forbidden: () => null,
        present: () => null
    };

    const registerActivity = async () => {
        const isValidated = await registerCallbacks[registered]();

        if (isValidated) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            activityStore.event.registered = registered === 'registered' ? 'unregistered' : 'registered';
        }
    };

    return (
        <View style={styles.registerSlotsBox}>
            <RegisterButton
                registered={registered}
                buttonSize={35}
                iconSize={35}
                onPress={registerActivity}
            />
            <Text style={{
                fontSize: 14,
                color: '#FAFAFA',
                fontFamily: 'Nunito-ExtraLight'
            }}>
                { registerText[registered] }
            </Text>
        </View>
    );
});

RegisterBox.propTypes = {
    activityStore: React.PropTypes.object,
    event: React.PropTypes.object,
};

const ViewAvailableSlots = ({ event, activityTitle }) => {

    const pastOneDay = moment(event.end).isBefore(moment().add(1, 'd'));

    if (pastOneDay) {
        return (
            <View style={styles.registerSlotsBox}>
                <Text style={{
                    fontSize: 14,
                    color: '#FAFAFA',
                    fontFamily: 'Nunito-ExtraLight'
                }}>
                    You no longer can register to this event.
                </Text>
            </View>
        );
    }

    return (
        <TouchableOpacity
            style={styles.registerSlotsBox}
            onPress={() => Actions.availableSlots({ title: `Slots for ${activityTitle}`})}
        >
            <Text style={{
                fontSize: 14,
                color: '#FAFAFA',
                fontFamily: 'Nunito-ExtraLight'
            }}>
                Check out available slots
            </Text>
            <SLIcon name="arrow-right" style={{
                color: '#FAFAFA',
                fontSize: 12,
                marginTop: 5,
                marginLeft: 15,
            }}/>
        </TouchableOpacity>
    );
};

ViewAvailableSlots.propTypes = {
    activityTitle: React.PropTypes.string.isRequired,
    event: React.PropTypes.object.isRequired,
};

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

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#233445',
            }}>
                <BoxDetail
                    style={[styles.boxContainer, { flex: 1 } ]}
                    leftTitle="Activity details"
                    rightTitle="C++"
                    icon={<ENIcon name="info" color="#FAFAFA" size={15}/>}
                    description={<TextDetail>{description}</TextDetail> }
                />
                <BoxDetail
                    style={[styles.boxContainer, { flex: 0.8 } ]}
                    leftTitle="Administrative details"
                    icon={<Icon name="ios-school" color="#FAFAFA" size={25}/>}
                    description={
                        <AdministrativeDetails
                            room={activityStore.roomName}
                            registeredStudents={activityStore.activity.nb_registered}
                            date={moment(event.start).format('DD.MM.YYYY')}
                            startTime={moment(event.start).format('HH:mm')}
                            endTime={moment(event.end).format('HH:mm')}
                        />
                    }
                />
                {
                    activityStore.activity.slots.length
                        ? <ViewAvailableSlots activityTitle={activityStore.activity.title} event={event}/>
                        : <RegisterBox activityStore={activityStore} event={event}/>
                }
            </View>
        );
    }
}

Activity.propTypes = {
    event: React.PropTypes.object,
};

const styles = StyleSheet.create({
    boxContainer: {
        elevation: 5,
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

