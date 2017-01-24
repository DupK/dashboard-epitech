/**
 * Created by desver_f on 24/01/17.
 */

import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import stores from './index';
import * as Intra from '../api/intra';

@autobind
class User {
    @observable baseInformation = null;

    async fetchBaseInformation() {
        try {
            this.baseInformation = await Intra.userBaseInformation();
        } catch(e) {
            console.error(e);
            stores.ui.errorState();
        }
    }

}

const userStore = new User();
export default userStore;