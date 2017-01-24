/**
 * Created by desver_f on 24/01/17.
 */
import { observable, action } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
class UiState {
    state = {
        default: 0,
        fetching: 1,
        error: 3
    };
    @observable currentState = this.state.default;

    @action
    defaultState() {
        this.currentState = this.state.default;
    }

    @action
    fetchingState() {
        this.currentState = this.state.fetching;
    }

    @action
    errorState() {
        this.currentState = this.state.error;
    }
}

const uiStateStore = new UiState();
export default uiStateStore;