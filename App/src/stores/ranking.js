/**
 * Created by desver_f on 06/02/17.
 */

import { observable } from 'mobx';
import bluebird from 'bluebird';
import autobind from 'autobind-decorator';
import storage from 'react-native-simple-store';
import _ from 'lodash';

import stores from './index';
import * as Intra from '../api/intra';
import medal from '../assets/medal.png'

function n(n){
    return n > 9 ? '' + n : '0' + n;
}

@autobind
class Ranking {
    @observable promotion = [];
    @observable rankPosition = '0th';

    async computePromotion({ refreshCache }) {
        const cachedPromotion = await this.getCachedRanking();

        if (cachedPromotion && !refreshCache) {
            this.promotion = cachedPromotion;
            await this.selfRankPosition({ ranking: cachedPromotion });
            return Promise.resolve(true);
        }

        // Always reset promotion to empty so that we can detect that we're loading
        this.promotion = [];
        const { user: { location, year, promo } } = stores.session;
        const promotion = await Intra.fetchPromotion(location, year, promo);

        const promotionWithDetails = await bluebird.map(promotion, async ({ login: email }) => {
            return await Intra.fetchStudent(email);
        });

        const promotionSorted = _(promotionWithDetails)
            .filter(({ gpa: [ value ] }) => value.gpa !== 'n/a')
            .orderBy(({ gpa: [ value ] }) => value.gpa, ['desc'])
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

    getOrdinalNumber(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;

        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    async selfRankPosition({ ranking, fromCache = false }) {
        const { username } = stores.session;
        const promotionRanks = fromCache ? await this.getCachedRanking() : ranking;

        if (!promotionRanks) {
            return Promise.resolve(true);
        }

        const position = _.findIndex(promotionRanks, (student) => student.login === username) + 1;
        this.rankPosition = this.getOrdinalNumber(position);
    }

    selfRank() {
        const { username } = stores.session;

        return _.find(this.promotion, (student) => student.login === username);
    }

    getCachedRanking() {
        return storage.get('ranking');
    }
}

const rankingStore = new Ranking();
export default rankingStore;