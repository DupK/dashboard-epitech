/**
 * Created by desver_f on 10/03/17.
 */
import autobind from 'autobind-decorator';
import { observable, action, computed } from 'mobx';

import calendarStore from './calendar';
import ui from './uiState';
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

    @action
    resetActivity() {
        this.activity = null;
    }
}

const activityStore = new activity();
export default activityStore;