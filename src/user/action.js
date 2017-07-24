import { createAction, createActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';

const GET_ALL_USERS_API_URL = 'http://localhost:8080/getAllUsers';
export const ALL_USERS_ACTIONS = {
    REQUEST_GET_ALL_USERS: 'REQUEST_GET_ALL_USERS',
    COMPLETE_GET_ALL_USERS: 'COMPLETE_GET_ALL_USERS',
    // FAILED_POST_TWEET: 'FAILED_POST_TWEET'
};

const requestGetAllUsers = createAction(ALL_USERS_ACTIONS.REQUEST_GET_ALL_USERS);
const completeGetAllUsers = createAction(ALL_USERS_ACTIONS.COMPLETE_GET_ALL_USERS, (users) => ({users: users}));

export function getAllUsers(token) {
    return function(dispatch) {
        dispatch(requestGetAllUsers());
        const headers = new Headers();
        headers.append("x-auth-token", token);
        return fetch(GET_ALL_USERS_API_URL, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        }).then(function(response) {
            if (response.status === 401) {
                throw Error();
            }
            return response.json();
        }).then(function(json){
            dispatch(completeGetAllUsers(json));
        }).catch(function(err) {
            dispatch(completeGetAllUsers(err));
        });
    };
}