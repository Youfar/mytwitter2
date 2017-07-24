/**
 * Created by cho.oh on 西暦17/07/18.
 */
import { createAction } from 'redux-actions';

export const setToken = createAction('SET_TOKEN', (token, username) => ({token: token, username: username}));
export const removeToken = createAction('REMOVE_TOKEN');