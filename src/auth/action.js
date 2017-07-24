/**
 * Created by cho.oh on 西暦17/07/13.
 */
import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { browserHistory } from "react-router";
import {removeToken, setToken} from '../token/action';

const SIGN_UP_URL = 'http://localhost:8080/createUser';
export const SIGN_UP_ACTIONS = {
    REQUEST_SIGN_UP: 'REQUEST_SIGN_UP',
    COMPLETE_SIGN_UP: 'COMPLETE_SIGN_UP',
    FAILED_SIGN_UP: 'FAILED_SIGN_UP',
    AFTER_SIGN_UP: 'AFTER_SIGN_UP',
};
const requestSignUp = createAction(SIGN_UP_ACTIONS.REQUEST_SIGN_UP);
const completeSignUp = createAction(SIGN_UP_ACTIONS.COMPLETE_SIGN_UP,(json) => ({userId: json.userId, serverMsg: json.serverMsg}));

export function signUp(username, email, password) {
    return function(dispatch) {
        dispatch(requestSignUp());
        const body = new FormData();
        body.append("username", username);
        body.append("email", email);
        body.append("password", password);
        console.log(body);
        return fetch(SIGN_UP_URL, {
            mode: 'cors',
            method: 'POST',
            body: body
        }).then(function(response) {
            if (!response.ok) {
                console.log("response not ok");
                throw Error(response.statusText)
            }
            return response.json();
        }).then(function (json) {
            console.log("response is ok");
            dispatch(completeSignUp(json));
            // browserHistory.push('/LoginSuccess');
            browserHistory.push('/app');
        }).catch(function (err) {
            console.log("signUp error");
            dispatch(completeSignUp(new Error("ユーザアカウント名とパスワードを確認してください")));
        });
    }
}

const LOGIN_URL = 'http://localhost:8080/login';
export const LOGIN_ACTIONS = {
    REQUEST_LOGIN: 'REQUEST_LOGIN',
    COMPLETE_LOGIN: 'COMPLETE_LOGIN',
    FAILED_LOGIN: 'FAILED_LOGIN',
    AFTER_LOGIN: 'AFTER_LOGIN',
};

const requestLogin = createAction(LOGIN_ACTIONS.REQUEST_LOGIN);
const completeLogin = createAction(LOGIN_ACTIONS.COMPLETE_LOGIN);

export function login(username, password) {
    return function(dispatch) {
        dispatch(requestLogin());
        const body = new FormData();
        body.append("username", username);
        body.append("password", password);
        return fetch(LOGIN_URL, {
            mode: 'cors',
            method: 'POST',
            body: body
        }).then(function(response) {
            if (!response.ok) {
                console.log("response not ok");
                throw Error(response.statusText)
            }
            console.log("token ok");
            return response.headers.get('x-auth-token');
        }).then(function (token) {
            dispatch(completeLogin());
            dispatch(setToken(token, username));
            console.log("token set ok");
            // browserHistory.push('/LoginSuccess');
            browserHistory.push('/app');
        }).catch(function (err) {
            console.log("error");
            dispatch(completeLogin(new Error("ユーザアカウント名とパスワードを確認してください")));
        });
    }
}

const LOGOUT_URL = 'http://localhost:8080/logout';
export const LOGOUT_ACTIONS = {
    REQUEST_LOGOUT: 'REQUEST_LOGOUT',
    COMPLETE_LOGOUT: 'COMPLETE_LOGOUT',
};

const requestLogout = createAction(LOGOUT_ACTIONS.REQUEST_LOGOUT);
const completeLogout = createAction(LOGOUT_ACTIONS.COMPLETE_LOGOUT);

export function logout() {
    return function(dispatch) {
        dispatch(requestLogout());
        dispatch(completeLogout());
        dispatch(removeToken());
        browserHistory.push('/');
        // return fetch(LOGOUT_URL, {
        //     mode: 'cors',
        //     method: 'POST',
        // }).then(function(response) {
        //     console.log("01");
        //     return response.json();
        // }).then(function (json) {
        //     console.log("02");
        //     dispatch(completeLogout());
        //     dispatch(removeToken());
        //     browserHistory.push('/');
        // }).catch(function (err) {
        //     console.log("03");
        //     dispatch(completeLogout(err));
        //     dispatch(removeToken());
        // });
    }
}