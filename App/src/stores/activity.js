/**
 * Created by desver_f on 10/03/17.
 */

import { Alert } from 'react-native';
import autobind from 'autobind-decorator';
import _ from 'lodash';
import { action, computed, observable } from 'mobx';

import calendarStore from './calendar';
import ui from './uiState';
import session from './session';
import * as Intra from '../api/intra';

@autobind
class activity {
    @observable activity = null;
    @observable event = null;

    @action
    async fetchActivity(event) {
        const { year, codeModule, instance, activity } = event;

        this.event = event;
        this.activity = await Intra.fetchActivity({ year, module: codeModule, instance, activity });
    }


    async unregisterActivity(event) {
        const {
            year,
            codeModule,
            instance,
            activity,
            codeEvent,
        } = event;

        ui.fetchingState();

        const response = await Intra.unregisterActivity({
            year,
            module: codeModule,
            instance,
            activity,
            event: codeEvent,
        });

        const isValidated = Object.keys(response).length === 0;

        if (isValidated) {
            calendarStore.markEventAs(event, { registered: false });
        } else {
            response.error && Alert.alert('Error', response.error);
            response.message && Alert.alert('Error', response.message);
        }

        ui.defaultState();

        return isValidated;
    }

    async registerActivity(event) {
        const {
            year,
            codeModule,
            instance,
            activity,
            codeEvent,
        } = event;

        ui.fetchingState();
        const response = await Intra.registerActivity({
            year,
            module: codeModule,
            instance,
            activity,
            event: codeEvent,
        });

        const isValidated = Object.keys(response).length === 0;

        if (isValidated) {
            calendarStore.markEventAs(event, { registered: true });
        } else {
            response.error && Alert.alert('Error', response.error);
            response.message && Alert.alert('Error', response.message);
        }

        ui.defaultState();

        return isValidated;
    }

    @action
    markActivityAsRegistered() {
        this.event.registered = this.event.registered === 'registered'
            ? 'unregistered'
            : 'registered';
    }

    @action
    markSlotActivityAs(slotToMark, { registered }) {
        this.activity.slots = this.activity.slots.slice()
            .map((slotGroup) => {
                const slots = slotGroup.slots.slice()
                    .map((slot) => {
                        if (slot.id === slotToMark.id) {
                            return {
                                ...slot,
                                master: {
                                    title: session.userProfile.name,
                                    login: session.userProfile.login,
                                    picture: session.userProfile.thumbnail
                                }
                            };
                        }

                        return slot;
                    });

                return {
                    ...slotGroup,
                    slots
                };
            });

        const calendarEvent = calendarStore.findEvent(
            this.activity.codemodule,
            this.activity.codeinstance,
            this.activity.codeacti
        );

        calendarEvent && calendarStore.markEventAs(calendarEvent, { registered });
    }

    async registerActivitySlot(slot) {
        const {
            scolaryear: year,
            codemodule: codeModule,
            codeinstance: instance,
            codeacti: codeActivity,
        } = this.activity;
        const teamId = this.activity.group ? this.activity.group.id : null;
        const response = await Intra.registerActivitySlot(slot.id, teamId,
            { year, module: codeModule, instance, activity: codeActivity }
        );

        const isValidated = Object.keys(response).length === 0;

        if (isValidated) {
            this.markSlotActivityAs(slot, { registered: true });
        } else {
            response.message && Alert.alert('Error', response.message);
            response.error && Alert.alert('Error', response.error);
        }

        return isValidated;
    }

    //TODO: Find out if teamId is needed to unregister slots
    async unregisterActivitySlot(slot) {
        const {
            scolaryear: year,
            codemodule: codeModule,
            codeinstance: instance,
            codeacti: codeActivity,
        } = this.activity;
        const teamId = this.activity.group ? this.activity.group.id : null;
        const response = await Intra.unregisterActivitySlot(slot.id, teamId,
            { year, module: codeModule, instance, activity: codeActivity }
        );

        const isValidated = Object.keys(response).length === 0;

        if (isValidated) {
            this.markSlotActivityAs(slot, { registered: false });
        } else {
            response.message && Alert.alert('Error', response.message);
            response.error && Alert.alert('Error', response.error);
        }

        return isValidated;
    }

    @action
    resetActivity() {
        this.activity = null;
    }

    @computed get roomName() {
        const location = this.activity.events[0].location || '';

        return location.substring(location.lastIndexOf('/') + 1, location.length);
    }

    @computed get selfSlot() {
        return _(this.activity.slots.slice())
            .map((slotsBlock) => {
                const self = slotsBlock.slots.filter((slot) => {
                    const userLogin = session.userProfile.login;
                    const isMember = slot.members.filter((member) => member.login === userLogin).length > 0;
                    const isMaster = slot.master && slot.master.login === userLogin;

                    return isMaster || isMember;
                });

                return {
                    id: slotsBlock.id,
                    slot: self[0],
                };
            })
            .filter((slotsBlock) => slotsBlock.slot)
            .first();
    }
}

const activityStore = new activity();
export default activityStore;