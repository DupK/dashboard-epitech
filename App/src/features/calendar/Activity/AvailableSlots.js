/**
 * Created by desver_f on 11/03/17.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    LayoutAnimation
} from 'react-native';
import _ from 'lodash';

import Accordion from 'react-native-collapsible/Accordion';

import moment from 'moment';
import { observer } from 'mobx-react/native';
import RegisterButton from './RegisterButton';

const Slot = observer(({ oneshot, state, date, memberPicture, slotObject, activityStore }) => {

    const borderLeftWidth = {
        taken: 0,
        available: 3,
        yours: 3,
    };

    const borderLeftColor = {
        taken: 'transparent',
        available: '#62C462',
        yours: '#FFD783',
    };

    const slotStateToRegister = {
        yours: oneshot ? 'forbidden' : 'registered',
        available: 'unregistered',
    };

    const backgroundColor = {
        taken: '#293a4d',
        available: '#293a4d',
        yours: '#293a4d',
    };

    const textColor = {
        taken: '#FAFAFA',
        available: '#FAFAFA',
        yours: '#FFD783',
    };

    const momentDate = moment(date, 'YYYY-MM-DD HH:mm:ss');

    const registerButton = state === 'available'
        ? (
            <RegisterButton
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                    activityStore.markSlotActivityAs(slotObject, { registered: true })
                }}
                buttonSize={25}
                iconSize={22}
                registered={slotStateToRegister[state]}
            />
        )
        : (
            <Image
                style={{
                    height: 25,
                    width: 25,
                    borderRadius: 50,
                    marginRight: 15,
                }}
                source={{ uri: memberPicture }}
            />
        );

    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 40,
            backgroundColor: backgroundColor[state],
            elevation: 3,
            paddingLeft: 10,
            borderLeftWidth: borderLeftWidth[state],
            borderLeftColor: borderLeftColor[state],
        }}>
            <Text
                style={{
                    color: textColor[state],
                    fontSize: 15,
                }}
            >
                { momentDate.format('ddd D MMM') } /&nbsp;
                <Text style={{ fontWeight: 'bold' }}>{ momentDate.format('HH:mm') }</Text>
            </Text>
            { registerButton }
        </View>
    );
});

Slot.propTypes = {
    state: React.PropTypes.oneOf([
        'taken',
        'available',
        'yours',
    ]).isRequired,
    date: React.PropTypes.string.isRequired,
    memberPicture: React.PropTypes.string,
    oneshot: React.PropTypes.bool.isRequired,
    slotObject: React.PropTypes.object.isRequired,
    activityStore: React.PropTypes.object.isRequired,
};

const SlotGroup = observer(({ username, slots, activityStore, alreadyRegistered }) => {

    const slotState = (slot) => {

        if (alreadyRegistered) {
            return 'taken';
        }

        if (!slot.master) {
            return 'available';
        }

        if (slot.master.login === username) {
            return 'yours';
        }

        return 'taken';
    };

    return (
        <View>
            {
                slots.map((slot, i) => (
                    <View
                        key={i}
                        style={{
                            margin: 10,
                            marginBottom: 5,
                        }}
                    >
                        <Slot
                            state={slotState(slot)}
                            memberPicture={slot.master && slot.master.picture}
                            date={slot.date}
                            oneshot={slot.bloc_status === 'oneshot'}
                            slotObject={slot}
                            activityStore={activityStore}
                        />
                    </View>
                ))
            }
        </View>
    );
});

SlotGroup.propTypes = {
    slots: React.PropTypes.arrayOf(
        React.PropTypes.object
    ).isRequired,
    username: React.PropTypes.string.isRequired,
    activityStore: React.PropTypes.object.isRequired,
    alreadyRegistered: React.PropTypes.bool.isRequired,
};

@observer
export default class AvailableSlots extends Component {

    constructor(props) {
        super(props);

        this.renderHeader = this.renderHeader.bind(this);
    }


    renderHeader(slotGroup) {
        const { store: { session, activity }} = this.props;
        const nbSlotsAvailable = slotGroup.slots.filter((slot) => !slot.master).length;
        const firstDate = moment(_.first(slotGroup.slots).date, 'YYYY-MM-DD HH:mm:ss');
        const lastDate = moment(_.last(slotGroup.slots).date, 'YYYY-MM-DD HH:mm:ss');

        const selfSlot = _.find(slotGroup.slots, ({ master }) => master && master.login === session.username);
        const renderSelfSlot = selfSlot
            ? ( <View style={{
                    marginTop: 20,
                    marginBottom: 5,
                }}>
                    <Slot
                        state="yours"
                        date={selfSlot.date}
                        oneshot={slotGroup.oneshot === 'oneshot'}
                        memberPicture={selfSlot.master.picture}
                        slotObject={selfSlot}
                        activityStore={activity.activity}
                    />
                </View>
            )
            : null;

        return (
            <View style={{
                flexDirection: 'column',
                backgroundColor: '#293a4d',
                justifyContent: 'center',
                margin: 10,
                marginBottom: 5,
                padding: 10,
                borderLeftWidth: 3,
                borderLeftColor: nbSlotsAvailable ? '#62C462' : '#F44235',
            }}>
                <Text style={{
                    color: '#FAFAFA',
                    marginBottom: 10,
                }}>
                    { firstDate.format('ddd D MMM') }
                    &nbsp;({firstDate.format('HH:mm')} - {lastDate.format('HH:mm')} )
                </Text>
                <Text style={{
                    color: '#FAFAFA',
                }}>
                    { nbSlotsAvailable } / {slotGroup.slots.length} slots available
                </Text>
                { renderSelfSlot }
            </View>
        );
    }

    render() {
        const {
            store: { session, activity }
        } = this.props;

        const alreadyRegistered = activity.activity.student_registered;

        return (
            <ScrollView style={{
                flex: 1,
                backgroundColor: '#233445',
            }}>
                <Accordion
                    underlayColor="#293a4d"
                    sections={activity.activity.slots.slice()}
                    renderHeader={this.renderHeader}
                    renderContent={(slotGroup) => (
                        <SlotGroup
                            username={session.username}
                            slots={slotGroup.slots.slice()}
                            activityStore={activity}
                            alreadyRegistered={alreadyRegistered}
                        />
                    )}
                />
            </ScrollView>
        );
    }
}
