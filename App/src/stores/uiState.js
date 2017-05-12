/**
 * Created by desver_f on 24/01/17.
 */
import { action, computed, observable } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
class UiState {
    state = {
        default: 0,
        fetching: 1,
        refreshingData: 2,
        noInternet: 3,
    };

    @observable currentState = this.state.default;

    @action
    defaultState() {
        if (this.isConnected) {
            this.currentState = this.state.default;
        }
    }

    @action
    fetchingState() {
        if (this.isConnected) {
            this.currentState = this.state.fetching;
        }
    }

    @action
    refreshingData() {
        this.currentState = this.state.refreshingData;
    }

    @action
    noInternet() {
        this.currentState = this.state.noInternet;
    }

    @computed get shouldShowStatusBar() {
        return this.currentState === this.state.refreshingData
            || this.currentState === this.state.noInternet;
    }

    @computed get isConnected() {
        return this.currentState !== this.state.noInternet;
    }
}

const uiStateStore = new UiState();
export default uiStateStore;