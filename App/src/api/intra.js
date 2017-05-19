/**
 * Created by desver_f on 23/01/17.
 */

import axios from 'axios';
import uiState from '../stores/uiState';
import moment from 'moment';

const client = axios.create({
    baseURL: 'https://intra.epitech.eu',
    timeout: 20000,
    validateStatus: (status) => status < 500,
});

function request(config) {
    if (uiState.isConnected) {
        return client.request(config)
            .then(({ data }) => data)
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
                uiState.errorState();
            });
    } else {
        return Promise.resolve(false);
    }
}

export function loginFromRedirectUri(redirectUri) {
    return request({
        url: redirectUri,
        baseURL: '',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchAutoLogin() {
    return request({
        url: `/admin/autolog?format=json`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
}

export function autoLog(autoLoginLink) {
    return request({
        url: autoLoginLink,
        baseURL: '',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchStudent(student) {
    return request({
        url: `/user/` + student + '/?format=json',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchLoggedInStudent() {
    return request({
        url: `/user?format=json`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchNetsoul(student) {
    return request({
        url: `/user/` + student + '/netsoul?format=json',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchCalendar(start, end) {
    const calendarUrl = start && end
        ? `/planning/load?format=json&start=${start}&end=${end}`
        : `/planning/load?format=json`;

    return request({
        url: calendarUrl,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchActivity({ year, module, instance, activity }) {
    return request({
        url: `/module/${year}/${module}/${instance}/${activity}/rdv/?format=json`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function registerActivity({ year, module, instance, activity, event }) {
    return request({
        url: `/module/${year}/${module}/${instance}/${activity}/${event}/register?format=json`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function unregisterActivity({ year, module, instance, activity, event }) {
    return request({
        url: `/module/${year}/${module}/${instance}/${activity}/${event}/unregister?format=json`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function registerActivitySlot(slotId, teamId, { year, module, instance, activity }) {
    const formData = new FormData();
    formData.append('id_creneau', slotId);
    teamId && formData.append('id_team', teamId);

    return request({
        url: `/module/${year}/${module}/${instance}/${activity}/rdv/register?format=json`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        data: formData
    });
}

export function unregisterActivitySlot(slotId, idTeam, { year, module, instance, activity }) {
    const formData = new FormData();
    formData.append('id_creneau', slotId);
    idTeam && formData.append('id_team', idTeam);

    return request({
        url: `/module/${year}/${module}/${instance}/${activity}/rdv/unregister?format=json`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        data: formData
    });
}

export function logout() {
    return request({
        url: `/logout?format=json`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

function fetchPromotionPage(page) {
    return request({
        url: `${page}`,
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

    return request({
        url: `/module/board?format=json&start=${start}&end=${end}`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchProjectDetails({ year, module, instance, activity }) {
    return request({
        url: `/module/${year}/${module}/${instance}/${activity}/project/?format=json`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchProjectFiles({ year, module, instance, activity }) {
    return request({
        url: `/module/${year}/${module}/${instance}/${activity}/project/file/?format=json`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
}

export function fetchMarks(user) {
    return request({
        url: `/user/${user}/notes?format=json`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchProjectMarks(year, module, instance, activity) {
    return request({
        url: `/module/${year}/${module}/${instance}/${activity}/note?format=json`,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
}

export function fetchDocuments(user) {
    return request({
        url: `/user/${user}/document/?format=json`,
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

    return request({
        url: `${tokenLink}?format=json`,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    });
}

export function fetchOffice365Link() {
    return request({
        url: '/',
        method: 'GET',
    });
}
