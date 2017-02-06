/**
 * Created by desver_f on 23/01/17.
 */

const BASE_URL = 'https://intra.epitech.eu';

export function login(login, password) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login,
            password,
        })
    })
        .then((response) => response.json());
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