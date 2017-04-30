/**
 * Created by desver_f on 27/03/17.
 */

import { CALENDAR_START, CALENDAR_END } from '../stores/calendar'
import stores from '../stores';

export default async function refreshApplication({ withLogin } = false) {
    const { ui, session, calendar, projects, marks, tokens } = stores;

    try {
        ui.refreshingData();

        withLogin && (await session.loginWithAutoLogin());

        await Promise.all([
            session.fetchUserProfile(),
            calendar.fetchCalendar(CALENDAR_START, CALENDAR_END),
            projects.fetchProjects(),
            marks.fetchMarks(),
            tokens.refreshTokens(),
        ]);

        ui.defaultState();
    } catch (e) {
        console.log('refreshApplication', e);
        ui.defaultState();
    }
}
