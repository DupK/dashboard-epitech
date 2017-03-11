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

        if (response) {
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

    async stall(stallTime = 2000) {
        await new Promise(resolve => setTimeout(resolve, stallTime));
    }

    @action
    markSlotActivityAs(slotToMark, { registered }) {
        this.activity.slots = this.activity.slots.slice().map((slotGroup) => {
            const slots = slotGroup.slots.slice().map((slot) => {
                if (slot.id === slotToMark.id) {
                    return {
                        ...slot,
                        master: {
                            title: session.session.user.name,
                            login: session.username,
                            picture: session.session.user.thumbnail
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

    async registerSlot(activity) {
        await this.stall();
        //TODO: Implement register slot
    }

    async unregisterSlot(activity) {
        await this.stall();
        //TODO: Implement unregister slot if not oneshot
    }

    @action
    resetActivity() {
        this.activity = null;
    }

    @computed get roomName() {
        const location = this.activity.events[0].location;
        return location.substring(location.lastIndexOf('/') + 1, location.length);
    }
}

const activityStore = new activity();
export default activityStore;