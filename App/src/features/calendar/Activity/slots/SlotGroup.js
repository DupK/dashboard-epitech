/**
 * Created by Utilisateur on 15/03/2017.
 */

import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react/native';

import Slot from './Slot';

const SlotGroup = observer(({ username, slots, activityStore, alreadyRegistered }) => {

    const slotState = (slot) => {

        //Prevent from trying to register on empty slots if you're already registered
        if (alreadyRegistered && !slot.master) {
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
                    <View key={i} style={styles.slotContainer}>
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

const styles = StyleSheet.create({
    slotContainer: {
        marginTop: 4,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 4,
    }
});

export default SlotGroup;
