/**
 * Created by desver_f on 23/01/17.
 */

import { observable } from 'mobx';
import autobind from 'autobind-decorator';
import { Actions } from 'react-native-router-flux';
import { login } from '../api/intra';

@autobind
class Authentication {

    state = {
        default: 0,
        logging: 1,
        logged: 2,
        error: 3
    };

    @observable loginState = this.state.default;

    async login(username, password) {
        try {
            this.loginState = this.state.logging;
            await login(username, password);
            this.loginState = this.state.logged;
            Actions.home();
        } catch (e) {
            this.loginState = this.state.error;
        }
    }
}

const store = new Authentication();
export default store;