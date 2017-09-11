/**
 * Created by desver_f on 24/01/17.
 */

import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';
import moment from 'moment';
import bluebird from 'bluebird';
import storage from 'react-native-simple-store';
import Cookie from 'react-native-cookie';
import * as Intra from '../api/intra';
import newsParser from '../features/news/newsParser';

@autobind
class Session {
    @observable userData = {};
    @observable userProfile = {};
    @observable loggedIn = false;

    constructor() {
        this.loggedFromCache = false;
    }

    @action
    async retrieveSessionFromCache() {
        const { userData, userProfile } = await bluebird.props({
            userData: storage.get('userData'),
            userProfile: storage.get('userProfile'),
        });

        this.userData = userData;
        this.userProfile = userProfile;
        this.loggedFromCache = true;
    }

    @action
    async loginWithAutoLogin() {
        const autologin = await storage.get('autologin');
        const userData = this.remapUserData((await Intra.autoLog(autologin)));

        this.userData = userData;
        this.loggedIn = true;
        await storage.save('userData', userData);
    }

    @action
    async loginWithOffice365(redirectUri) {
        const userData = await Intra.loginFromRedirectUri(redirectUri);
        const autologin = await Intra.fetchAutoLogin();

        await Promise.all([
            this.fetchUserProfile(),
            storage.save('userData', this.remapUserData(userData)),
            storage.save('autologin', autologin.autologin),
        ]);

        this.loggedIn = true;
        this.userData = this.remapUserData(userData);
    }

    @action
    async fetchUserProfile() {
        const userProfile = await Intra.fetchLoggedInStudent();
        const netsoul = await Intra.fetchNetsoul(userProfile.login);
        const remappedUserProfile = this.remapUserProfile(userProfile, netsoul);

        await storage.save('userProfile', remappedUserProfile);
        this.userProfile = remappedUserProfile;
    }

    // Fix: Proposer des valeurs par défault dans le cas ou les données ne sont pas disponible sur l'intranet
    remapUserProfile(userProfile, netsoul) {
        return {
            login: userProfile.login,
            name: userProfile.title,
            credits: userProfile.credits || 0,
            spices: userProfile.spice || '0',
            gpa: userProfile.gpa[0].gpa || 0,
            logtime: userProfile.nsstat ? userProfile.nsstat.active : 0,
            expectedLogtime: userProfile.nsstat ? userProfile.nsstat.nslog_norm : 35,
            promo: `tek${userProfile.studentyear}`,
            studentyear: userProfile.studentyear,
            year: userProfile.scolaryear,
            location: userProfile.location,
            thumbnail: userProfile.picture || 'https://intra.epitech.eu/static4a9afe84f5d8f5cb0cbe0e5baa1fb8c42d909902/img/nopicture-profilview.png',
            semester: userProfile.semester,
            uid: userProfile.uid,
            logData: netsoul,
        };
    }

    remapUserData(userData) {
        return {
            activities: userData.board.activites,
            news: newsParser(userData.history)
        };
    }

    async hasEverythingCached() {
        const {
            autologin,
            calendar,
            marks,
            projects,
            userData,
            userProfile,
        } = await bluebird.props({
            autologin: storage.get('autologin'),
            calendar: storage.get('calendar'),
            marks: storage.get('marks'),
            projects: storage.get('projects'),
            userData: storage.get('userData'),
            userProfile: storage.get('userProfile'),
        });

        return !!autologin && !!calendar && !!marks && !!projects && !!userData && !!userProfile;
    }

    @action
    resetSession() {
        this.userData = {};
        this.userProfile = {};
    }

    async logout() {
        try {
            await Intra.logout();
            //Clear all cookies to remove session from both the intra and Office365
            await Promise.all([
                Cookie.clear(),
                storage.delete('autologin'),
                storage.delete('userProfile'),
                storage.delete('userData'),
                storage.delete('projects'),
                storage.delete('marks'),
                storage.delete('calendar'),
            ]);
            this.loggedIn = false;
            this.loggedFromCache = false;
        } catch (e) {
            console.error(e);
        }
    }

    @computed get tokens() {
        const activities = this.userData.activities.slice();

        return activities
            .filter((activity) => activity.token)
            .map((activity) => ({
                title: `${activity.module.split(' - ')[0]} - ${activity.title}`,
                date: moment(activity.timeline_start, 'DD/MM/YYYY, HH[h]mm')
                    .format('DD.MM.YYYY'),
                tokenLink: activity.token_link,
            }));
    }

    getAutologinCached() {
        return storage.get('autologin');
    }
}

const sessionStore = new Session();
export default sessionStore;
