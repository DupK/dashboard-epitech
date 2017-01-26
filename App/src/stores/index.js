import AuthenticationStore from './authentication';
import UiStateStore from './uiState';
import SessionStore from './session'
import CalendarStore from './calendar';

export default {
    ui: UiStateStore,
    authentication: AuthenticationStore,
    session: SessionStore,
    calendar: CalendarStore,
};
