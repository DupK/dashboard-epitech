/**
 * Created by desver_f on 23/01/17.
 */

import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import stores from './index';
import * as Intra from '../api/intra';

@autobind
class Authentication {
    @observable isLogged = false;

    async login(username, password) {
        try {
            await Intra.login(username, password);
            this.isLogged = true;
        } catch (e) {
            console.error(e);
            stores.ui.errorState();
        }
    }
}

const store = new Authentication();
export default store;