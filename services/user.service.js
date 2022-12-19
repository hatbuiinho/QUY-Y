import { BehaviorSubject } from 'rxjs';
import _ from 'lodash';
import Router from 'next/router';

import { fetchWrapper } from 'helpers';

const userApi = `/api/users`;

// const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

function login(login_phone, login_id_card) {
    return fetchWrapper.post(`${userApi}/authenticate`, { login_phone, login_id_card })
        .then(res => {
            // userSubject.next(_.get(res, 'data'));
            localStorage.setItem('user', JSON.stringify(_.get(res, 'data')));
            return res;
        });
}

// function logout() {
//     localStorage.removeItem('user');
//     userSubject.next(null);
//     Router.push('/');
// }

function register(user) {
    return fetchWrapper.post(`${userApi}/register`, user);
}

// setTimeout(() => {
//     getAll();
// }, 3000);
// function getAll() {
//     return fetchWrapper.get(baseUrl);
// }


export const userService = {
    // user: userSubject.asObservable(),
    // get userValue () { return userSubject.value },
    login,
    // logout,
    register,
};