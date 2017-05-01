/**
 * Created by desver_f on 06/02/17.
 */

import { action, computed, observable } from 'mobx';
import bluebird from 'bluebird';
import autobind from 'autobind-decorator';
import storage from 'react-native-simple-store';
import _ from 'lodash';

import stores from './index';
import * as Intra from '../api/intra';
import medal from '../assets/medal.png';

function n(n) {
    return n > 9 ? '' + n : '0' + n;
}

@autobind
class Ranking {
    @observable promotion = [];
    @observable rankPosition = '0th';
    @observable searchField = "";

    @action
    async computePromotion({ refreshCache }) {
        const cachedPromotion = await this.getCachedRanking();

        if (cachedPromotion && !refreshCache) {
            this.promotion = cachedPromotion;
            await this.selfRankPosition({ ranking: cachedPromotion });
            return Promise.resolve(true);
        }

        // Always reset promotion to empty so that we can detect that we're loading
        if (stores.ui.isConnected) {
            this.promotion = [];
            const { userProfile: { location, year, promo } } = stores.session;
            const promotion = await Intra.fetchPromotion(location, year, promo);

            const promotionWithDetails = await bluebird.map(promotion, async ({ login: email }) => {
                return await Intra.fetchStudent(email);
            });

            const promotionSorted = _(promotionWithDetails)
                .filter(({ gpa: [value] }) => value.gpa !== 'n/a')
                .orderBy(({ gpa: [value] }) => value.gpa, ['desc'])
                .map((student, i) => {
                    if (i === 0) {
                        student.img = medal;
                    }

                    return {
                        ...student,
                        rank: n(i + 1)
                    }
                })
                .value();

            this.promotion = promotionSorted;
            await this.selfRankPosition({ ranking: promotionSorted });
            await storage.save('ranking', promotionSorted);
        }
    }

    getOrdinalNumber(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;

        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    @action
    async selfRankPosition({ ranking, fromCache = false }) {
        const { login } = stores.session.userProfile;
        const promotionRanks = fromCache ? await this.getCachedRanking() : ranking;

        if (!promotionRanks) {
            return Promise.resolve(true);
        }

        const position = _.findIndex(promotionRanks, (student) => student.login === login) + 1;
        this.rankPosition = this.getOrdinalNumber(position);
    }

    @computed get renderResults() {
        return this.searchField === ""
            ? this.promotion.slice()
            : _.filter(this.promotion, (student) => new RegExp(this.searchField, 'i').test(student.login));
    }

    selfRank() {
        const { login } = stores.session.userProfile;

        return _.find(this.promotion, (student) => student.login === login);
    }

    getCachedRanking() {
        return storage.get('ranking');
    }
}

const rankingStore = new Ranking();
export default rankingStore;