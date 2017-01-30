/**
 * Created by desver_f on 23/01/17.
 */

export function login(login, password) {
    return fetch('https://intra.epitech.eu/', {
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

export function userBaseInformation() {
    return fetch('https://intra.epitech.eu/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json());
}

export function fetchStudent(student) {
    return fetch('https://intra.epitech.eu/user/' + student + '/?format=json', {
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
        ? `https://intra.epitech.eu/planning/load?format=json&start=${start}&end=${end}`
        : 'https://intra.epitech.eu/planning/load?format=json';

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
    return fetch('https://intra.epitech.eu/logout?format=json', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json());
}