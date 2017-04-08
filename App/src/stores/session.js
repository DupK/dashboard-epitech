/**
 * Created by desver_f on 24/01/17.
 */

import { computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import moment from 'moment';
import storage from 'react-native-simple-store';

import stores from './index';
import * as Intra from '../api/intra';
import newsParser from '../features/news/newsParser';

@autobind
class Session {
    @observable isLogged = false;
    @observable summary = {};
    @observable user = {};
    @observable username = '';
    @observable loggedFromCache = false;

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

    // Raises an exception if autologin hasn't been cached yet;
    async tryLoginFromAutoLogin() {
        const autoLogin = await this.getAutologinFromCache();

        if (autoLogin.link && autoLogin.username) {
            const session = await Intra.autoLog(autoLogin.link);
            this.setSessionFields(session, autoLogin.username);
        }
    }

    async tryLoginRegular(username, password) {
        const session = await Intra.login(username, password);

        const isLogged = this.setSessionFields(session, username);

        if (isLogged) {
            await storage.save('session', session);
            await this.saveAutoLoginIfNeeded(username);
        }
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
        if (session && session.message !== 'Veuillez vous connecter') {
            this.isLogged = true;
            this.username = username;

            this.summary = {
                ...this.summary,
                activities: session.board.activites,
                news: newsParser(session.history),
            };
        }

        return session && session.message !== 'Veuillez vous connecter';
    }

    async getSessionFromCache() {
        const session = await storage.get('session');
        const { username } = await storage.get('autologin');

        if (session) {
            this.setSessionFields(session, username);
        }
    }

    async userInformation({ fromCache = false }) {
        try {

            if (fromCache) {
                const user = await storage.get('user');

                if (user) {
                    this.user = user;
                    this.username = user.login;
                    return;
                }
            }

            const information = await Intra.fetchStudent(this.username);
            const autologin = await Intra.fetchAutoLogin();
            const netsoul = await Intra.fetchNetsoul(this.username);

            const user = {
                login: information.login,
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
                logData: netsoul,
                autologin: autologin.autologin,
            };

            await storage.save('user', user);

            this.user = user;
            this.username = information.login;
        } catch (e) {
            console.error(e);
            stores.ui.errorState();
        }
    }

   async hasEverythingCached() {
        const autologin = await storage.get('autologin');
        const session = await storage.get('session');
        const user = await storage.get('user');
        const projects = await storage.get('projects');
        const marks = await storage.get('marks');
        const calendar = await storage.get('calendar');

        return !!autologin && !!session && !!user && !!projects && !!marks && !!calendar;
    }

    resetSession() {
        this.isLogged = false;
        this.session = null;
        this.username = '';
        this.news = [];
    }

    async logout() {
        try {
            await Intra.logout();
            await storage.delete('autologin');
            await storage.delete('session');
            await storage.delete('user');
            await storage.delete('projects');
            await storage.delete('marks');
            await storage.delete('calendar');
        } catch (e) {
            this.isLogged = false;
            console.error(e);
            stores.ui.errorState();
        }
    }

    @computed get tokens() {
        const activities = this.summary.activities.slice();

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
