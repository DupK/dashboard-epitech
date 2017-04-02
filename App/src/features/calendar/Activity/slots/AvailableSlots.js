/**
 * Created by desver_f on 11/03/17.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Platform,
} from 'react-native';
import _ from 'lodash';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { observer } from 'mobx-react/native';

import Slot from './Slot';
import SlotGroup from './SlotGroup';

@observer
export default class AvailableSlots extends Component {

    constructor(props) {
        super(props);

        this.renderHeader = this.renderHeader.bind(this);
    }

    renderHeader(slotGroup, selfSlot) {
        const {store: { activity }} = this.props;
        const nbSlotsAvailable = slotGroup.slots.filter((slot) => !slot.master).length;
        const firstDate = moment(_.first(slotGroup.slots).date, 'YYYY-MM-DD HH:mm:ss');
        const lastDate = moment(_.last(slotGroup.slots).date, 'YYYY-MM-DD HH:mm:ss');

        const renderSelfSlot = selfSlot && selfSlot.id === slotGroup.id
            ? ( <View style={styles.headerSelfSlotContainer}>
                    <Slot
                        state="yours"
                        date={selfSlot.slot.date}
                        oneshot={slotGroup.oneshot === 'oneshot'}
                        memberPicture={selfSlot.slot.master.picture}
                        slotObject={selfSlot.slot}
                        activityStore={activity.activity}
                    />
                </View>
            )
            : null;

        return (
            <View style={[
                Platform.OS === 'ios' ? styles.headerContainerIOS : styles.headerContainerAndroid,
                { borderLeftColor: nbSlotsAvailable ? '#62C462' : '#F44235' }
            ]}>
                <View style={styles.headerDateContainer}>
                    <Text style={styles.headerDate}>
                        { firstDate.format('ddd D MMM') }
                        &nbsp;({firstDate.format('HH:mm')} - {lastDate.format('HH:mm')} )
                    </Text>
                    <Icon name="ios-arrow-down" color="#FAFAFA" size={20}/>
                </View>
                <Text style={styles.headerNbSlots}>
                    { nbSlotsAvailable } / {slotGroup.slots.length} slots available
                </Text>
                { renderSelfSlot }
            </View>
        );
    }

    render() {
        const {
            store: {session, activity}
        } = this.props;

        const selfSlot = activity.selfSlot;

        return (
            <ScrollView style={styles.container}>
                <Accordion
                    underlayColor="transparent"
                    sections={activity.activity.slots.slice()}
                    renderHeader={(slotGroup) => this.renderHeader(slotGroup, selfSlot)}
                    renderContent={(slotGroup) => (
                        <SlotGroup
                            username={session.username}
                            slots={slotGroup.slots.slice()}
                            activityStore={activity}
                            alreadyRegistered={!!selfSlot}
                        />
                    )}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#233445',
    },
    headerContainerAndroid: {
        elevation: 3,
        flexDirection: 'column',
        backgroundColor: '#293a4d',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 5,
        padding: 10,
        borderLeftWidth: 3,
    },

    headerContainerIOS: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 1.5,
        shadowOpacity: 0.5,
        flexDirection: 'column',
        backgroundColor: '#293a4d',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 5,
        padding: 10,
        borderLeftWidth: 3,
    },

    headerDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerDate: {
        color: '#FAFAFA',
        marginBottom: 10,
    },
    headerNbSlots: {
        color: '#FAFAFA',
    },
    headerSelfSlotContainer: {
        marginTop: 20,
        marginBottom: 5,
    }
});
