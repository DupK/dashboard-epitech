/**
 * Created by desver_f on 10/03/17.
 */
import autobind from 'autobind-decorator';
import { observable, action, computed } from 'mobx';

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
        }

        ui.defaultState();

        return isValidated;
    }

    @action
    markActivityAsRegistered() {
        this.event.registered =  this.event.registered === 'registered'
            ? 'unregistered'
            : 'registered';
    }

    @action
    markSlotActivityAs(slotToMark, { registered }) {
        this.activity.slots = this.activity.slots.slice().map((slotGroup) => {
            const slots = slotGroup.slots.slice().map((slot) => {
                if (slot.id === slotToMark.id) {
                    return {
                        ...slot,
                        master: {
                            title: session.user.name,
                            login: session.username,
                            picture: session.user.thumbnail
                        }
                    };
                }

                return slot;
            });

            return {
                ...slotGroup,
                slots: slots
            };
        });
    }

    async registerActivitySlot(slot) {
        const {
            scolaryear: year,
            codemodule: codeModule,
            codeinstance: instance,
            codeacti: codeActivity,
        } = this.activity;

        const response = await Intra.registerActivitySlot(slot.id,
            { year, module: codeModule, instance, activity: codeActivity }
        );

        const isValidated = Object.keys(response).length === 0;

        if (isValidated) {
            this.markSlotActivityAs(slot, { registered: true });
        }

        return isValidated;
    }

    async unregisterActivitySlot(slot) {
        const {
            scolaryear: year,
            codemodule: codeModule,
            codeinstance: instance,
            codeacti: codeActivity,
        } = this.activity;

        const response = await Intra.unregisterActivitySlot(slot.id,
            { year, module: codeModule, instance, activity: codeActivity }
        );

        const isValidated = Object.keys(response).length === 0;

        if (isValidated) {
            this.markSlotActivityAs(slot, { registered: false });
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
                    const isMember = slot.members.filter((member) => member.login === session.username).length > 0;
                    const isMaster = slot.master && slot.master.login === session.username;

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