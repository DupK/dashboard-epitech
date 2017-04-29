/**
 * Created by desver_f on 23/01/17.
 */

import uiState from '../stores/uiState';
import moment from 'moment';

const BASE_URL = 'https://intra.epitech.eu';

function request(url, data) {
    if (uiState.isConnected) {
        return fetch(url, data)
            .then((response) => {
                if (!response.ok) {
                    return Promise.resolve(false);
                }

                return response;
            })
            .then((response) => response.json())
            .catch(console.log);
    } else {
        return Promise.resolve(false);
    }
}

export function login(login, password) {
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    formData.append('remind', 'on');

    return request(BASE_URL + '/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    });
}

export function fetchAutoLogin() {
    return request(`${BASE_URL}/admin/autolog?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function autoLog(autoLoginLink) {
    return request(autoLoginLink, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchStudent(student) {
    return request(`${BASE_URL}/user/` + student + '/?format=json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchNetsoul(student) {
    return request(`${BASE_URL}/user/` + student + '/netsoul?format=json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchCalendar(start, end) {
    const calendarUrl = start && end
        ? `${BASE_URL}/planning/load?format=json&start=${start}&end=${end}`
        : `${BASE_URL}/planning/load?format=json`;

    return request(calendarUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchActivity({ year, module, instance, activity }) {
    return request(`${BASE_URL}/module/${year}/${module}/${instance}/${activity}/rdv/?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function registerActivity({ year, module, instance, activity, event }) {
    return request(`${BASE_URL}/module/${year}/${module}/${instance}/${activity}/${event}/register?format=json`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function unregisterActivity({ year, module, instance, activity, event }) {
    return request(`${BASE_URL}/module/${year}/${module}/${instance}/${activity}/${event}/unregister?format=json`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function registerActivitySlot(slotId, { year, module, instance, activity }) {
    const formData = new FormData();
    formData.append('id_creneau', slotId);

    return request(`${BASE_URL}/module/${year}/${module}/${instance}/${activity}/rdv/register?format=json`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    });
}

export function unregisterActivitySlot(slotId, { year, module, instance, activity }) {
    const formData = new FormData();
    formData.append('id_creneau', slotId);

    return request(`${BASE_URL}/module/${year}/${module}/${instance}/${activity}/rdv/unregister?format=json`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    });
}

export function logout() {
    return request(`${BASE_URL}/logout?format=json`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

function fetchPromotionPage(page) {
    return request(`${BASE_URL}${page}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export async function fetchPromotion(location, year, promo) {
    try {
        const PAGE_SIZE = 48;
        const { items: promotion, total } = await fetchPromotionPage(`/user/filter/user?format=json&location=${location}&year=${year}&promo=${promo}&offset=0`);
        const fullPromotion = [...promotion];

        for (let i = promotion.length; i < total; i += PAGE_SIZE) {
            const { items: newPage } = await fetchPromotionPage(`/user/filter/user?format=json&location=${location}&year=${year}&promo=${promo}&offset=${i}`);

            fullPromotion.push(...newPage);
        }

        return fullPromotion;
    } catch (e) {
        console.error(e.message)
    }
}

export function fetchProjects() {
    const start = moment().startOf('year').format('YYYY-MM-DD');
    const end = moment().add(1, 'year').format('YYYY-MM-DD');

    return request(`${BASE_URL}/module/board?format=json&start=${start}&end=${end}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchProjectDetails({ year, module, instance, activity }) {
    return request(`${BASE_URL}/module/${year}/${module}/${instance}/${activity}/project/?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchProjectFiles({ year, module, instance, activity }) {
    return request(`${BASE_URL}/module/${year}/${module}/${instance}/${activity}/project/file/?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchMarks(user) {
    return request(`${BASE_URL}/user/${user}/notes?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchProjectMarks(year, module, instance, activity) {
    return request(`${BASE_URL}/module/${year}/${module}/${instance}/${activity}/note?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchDocuments(user) {
    return request(`${BASE_URL}/user/${user}/document/?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function validateToken(tokenLink, tokenValue) {
    const formData = new FormData();
    formData.append('token', tokenValue);
    formData.append('rate', '0');
    formData.append('comment', '');

    return request(`${BASE_URL}${tokenLink}?format=json`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    });
}
