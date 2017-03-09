/**
 * Created by desver_f on 24/01/17.
 */

import { observable, computed } from 'mobx';
import autobind from 'autobind-decorator';
import moment from 'moment';
import storage from 'react-native-simple-store';

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

            if (username && password) {
                await this.tryLoginRegular(username, password);
            } else {
                await this.tryLoginFromAutoLogin();
            }
        } catch (e) {
            console.error(e);
            stores.ui.errorState();
            this.isLogged = false;
        }
    }

    async tryLoginFromAutoLogin() {
        const autoLogin = await this.getAutologinFromCache();

        if (autoLogin.link && autoLogin.username) {
            const session = await Intra.autoLog(autoLogin.link);
            this.setSessionFields(session, autoLogin.username);
        }
    }

    async tryLoginRegular(username, password) {
        const session = await Intra.login(username, password);

        this.setSessionFields(session, username);
        await this.saveAutoLoginIfNeeded(username);
    }

    async saveAutoLoginIfNeeded(username) {
        const hasAutoLogin = !!(await this.getAutologinFromCache());

        if (this.isLogged && !hasAutoLogin) {
            const { autologin } = await Intra.fetchAutoLogin();

            await storage.save('autologin', {
                link: autologin,
                username,
            });
        }
    }

    getAutologinFromCache() {
        return storage.get('autologin');
    }

    setSessionFields(session, username) {
        if (session && session.message !== "Veuillez vous connecter") {
            this.isLogged = true;
            this.username = username;
            this.session = {
                board: session.board
            };
            this.news = newsParser(session.history);
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
            this.username = '';
            this.isLogged = false;
            await storage.delete('autologin');

        } catch (e) {
            this.isLogged = false;
            console.error(e);
            stores.ui.errorState();
        }
    }

    @computed get tokens() {
        const activities = this.session.board.activites.slice();

        return activities
            .filter((activity) => activity.token)
            .map((activity) => ({
                title: `${activity.module.split(' - ')[0]} - ${activity.title}`,
                date: moment(activity.timeline_start, 'DD/MM/YYYY, HH[h]mm').format('DD.MM.YYYY'),
                tokenLink: activity.token_link,
            }));
    }
}

const sessionStore = new Session();
export default sessionStore;