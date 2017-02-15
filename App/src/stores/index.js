import UiStateStore from './uiState';
import SessionStore from './session'
import CalendarStore from './calendar';
import RankingStore from './ranking';
import MarksStore from './marks';

export default {
    ui: UiStateStore,
    session: SessionStore,
    calendar: CalendarStore,
    ranking: RankingStore,
    marks: MarksStore,
};
