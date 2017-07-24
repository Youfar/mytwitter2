import { handleActions } from 'redux-actions';

export const tokenReducer = handleActions(
    {
        SET_TOKEN: (state, action) => Object.assign({}, state, {
            token: action.payload.token,
            username: action.payload.username
        }),
        REMOVE_TOKEN: (state, action) => Object.assign({}, state, {
            token: null,
            username: null
        })
    }, {token: null, username: null}
);