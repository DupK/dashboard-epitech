/**
 * Created by desver_f on 23/01/17.
 */

import moment from 'moment';

const BASE_URL = 'https://intra.epitech.eu';

export function login(login, password) {
    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    formData.append('remind', 'on');

    return fetch(BASE_URL + '/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        });
}

export function fetchStudent(student) {
    return fetch(`${BASE_URL}/user/` + student + '/?format=json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());
}

export function fetchCalendar(start, end) {
    const calendarUrl = start && end
        ? `${BASE_URL}/planning/load?format=json&start=${start}&end=${end}`
        : `${BASE_URL}/planning/load?format=json`;

    return fetch(calendarUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());
}

export function logout() {
    return fetch(`${BASE_URL}/logout?format=json`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());
}

function fetchPromotionPage(page) {
    return fetch(`${BASE_URL}${page}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());
}

export async function fetchPromotion(location, year, promo) {
    try {
        const PAGE_SIZE = 48;
        const { items: promotion, total } = await fetchPromotionPage(`/user/filter/user?format=json&location=${location}&year=${year}&promo=${promo}&offset=0`);
        const fullPromotion = [ ...promotion ];

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

    return fetch(`${BASE_URL}/module/board?format=json&start=${start}&end=${end}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());
}

export function fetchProjectDetails({ year, module, instance, activity }) {
    return fetch(`${BASE_URL}/module/${year}/${module}/${instance}/${instance}/project/?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());
}

export function fetchProjectFiles({ year, module, instance, activity }) {
    return fetch(`${BASE_URL}/module/${year}/${module}/${instance}/${instance}/project/file/?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());
}

export function fetchMarks(user) {
    return fetch(`${BASE_URL}/user/${user}/notes?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());
}

export function fetchProjectMarks(year, module, instance, activity) {
    return fetch(`${BASE_URL}/module/${year}/${module}/${instance}/${activity}/note?format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());
}
