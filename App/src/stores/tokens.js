/**
 * Created by desver_f on 05/03/17.
 */

import { observable, computed, action } from 'mobx';
import _ from 'lodash';
import session from '../stores/session';
import autobind from 'autobind-decorator';
import * as Intra from '../api/intra';

@autobind
class Tokens {
    @observable tokenValues = {};
    @observable error = {};
    @observable value = {};
    @observable selectedToken = -1;
    @observable tokens = session.tokens;

    tokenStates = {
        validating: (id) => this.setTokensValue(id),
        error: (id) => this.setError(id),
        default: () => {
            this.value = {};
            this.error = {};
        },
    };
    async validateToken(id) {
        const response = await Intra.validateToken(this.tokens[id].tokenLink, this.tokenValues[id]);

        return Object.keys(response).length === 0;
    }

    @action resetTokens() {
        this.tokenValues = {};
        this.selectedToken = -1;
    }

    @action removeValidatedToken() {
        this.tokens = _.filter([ ...this.tokens.slice() ], (_, i) => i !== this.selectedToken);

        this.resetTokens();
    }

    @action refreshAfterAnimation(isTokenValidated) {
        if (isTokenValidated) {
            this.removeValidatedToken();
        }

        this.resetTokens();
    }

    @action updateValues(text, id) {
        this.tokenValues = {
            ...this.tokenValues,
            [id]: text
        };
    }

    @action selectToken(id) {
        this.selectedToken = id;
    }

    @action setTokensValue(id) {
        this.value = {
            [id]: true,
        };
    }

    @action setError(id) {
        this.error = {
            [id]: true
        };
    }

    @action setState({ state, id }) {
        this.tokenStates[state](id);
    }

    @computed get nbTokens() {
        return this.tokens.length;
    }
}

const tokensStore = new Tokens();
export default tokensStore;
