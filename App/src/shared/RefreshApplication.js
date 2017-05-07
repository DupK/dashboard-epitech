/**
 * Created by desver_f on 27/03/17.
 */

import stores from '../stores';

export default async function refreshApplication({ withLogin } = false) {
    const { ui, session, calendar, projects, marks, tokens } = stores;

    try {
        ui.refreshingData();

        withLogin && (await session.loginWithAutoLogin());

        await Promise.all([
            session.fetchUserProfile(),
            calendar.fetchCalendar(),
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
