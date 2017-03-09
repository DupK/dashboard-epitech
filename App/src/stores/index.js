import UiStateStore from './uiState';
import SessionStore from './session'
import CalendarStore from './calendar';
import RankingStore from './ranking';
import MarksStore from './marks';
import ProjectsStore from './projects';
import TokensStore from './tokens';

export default {
    ui: UiStateStore,
    session: SessionStore,
    calendar: CalendarStore,
    ranking: RankingStore,
    marks: MarksStore,
    projects: ProjectsStore,
    tokens: TokensStore,
};
