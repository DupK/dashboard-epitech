import AuthenticationStore from './authentication';
import UiStateStore from './uiState';
import SessionStore from './session'

export default {
    ui: UiStateStore,
    authentication: AuthenticationStore,
    session: SessionStore,
};
