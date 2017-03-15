/**
 * Created by Utilisateur on 13/03/2017.
 */

export function wasRegistered (registered) {
    return registered === 'registered' || registered === 'present';
}

export function wasPresent(registered) {
    return registered === 'present';
}