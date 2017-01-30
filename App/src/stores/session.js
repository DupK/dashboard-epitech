/**
 * Created by desver_f on 24/01/17.
 */

import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import stores from './index';
import * as Intra from '../api/intra';

@autobind
class Session {
    @observable isLogged = false;
    @observable session = null;

    async login(username = '', password = '') {
        try {
            const session = await Intra.login(username, password);

            if (session.message !== "Veuillez vous connecter") {
                this.isLogged = true;
                this.session = session;
            }
        } catch (e) {
            stores.ui.errorState();
            this.isLogged = false;
        }
    }

    async logout() {
        try {
            await Intra.logout();
            this.isLogged = false;
        } catch (e) {
            stores.ui.errorState();
            this.isLogged = true;
        }
    }

}

const sessionStore = new Session();
export default sessionStore;