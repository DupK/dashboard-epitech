/**
 * Created by desver_f on 24/01/17.
 */

import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import stores from './index';
import * as Intra from '../api/intra';
import newsParser from '../features/news/newsParser';

@autobind
class Session {
    @observable isLogged = false;
    @observable session = null;
    @observable news = [];
    @observable username = '';

    async login(username = '', password = '') {
        try {
            const session = await Intra.login(username, password);

            if (session && session.message !== "Veuillez vous connecter") {
                this.username = username;
                this.session = {
                    board: session.board
                };
                this.news = newsParser(session.history);
                this.isLogged = true;
                stores.ui.defaultState();
            }
        } catch (e) {
            console.error(e);
            stores.ui.errorState();
            this.isLogged = false;
        }
    }

    async userInformation() {
        try {
            const information = await Intra.fetchStudent(this.username);

            this.session = {
                ...this.session,
                user: {
                    name: information.title,
                    credits: information.credits,
                    spices: information.spice || '0',
                    gpa: information.gpa[0].gpa,
                    logtime: information.nsstat.active,
                    expectedLogtime: information.nsstat.nslog_norm,
                    promo: `tek${information.studentyear}`,
                    studentyear: information.studentyear,
                    year: information.scolaryear,
                    location: information.location,
                    thumbnail: information.picture,
                    uid: information.uid,
                }
            };

            this.username = information.login;
        } catch (e) {
            console.error(e);
            stores.ui.errorState();
        }
    }

    async logout() {
        try {
            await Intra.logout();
            this.isLogged = false;
        } catch (e) {
            console.error(e);
            stores.ui.errorState();
            this.isLogged = true;
        }
    }
}

const sessionStore = new Session();
export default sessionStore;