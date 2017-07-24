import { handleActions } from 'redux-actions';

export const userReducer = handleActions(
    {
        REQUEST_GET_ALL_USERS: (state, action) => Object.assign({}, state, {}),
        COMPLETE_GET_ALL_USERS: {
            next: (state, action) => Object.assign({}, state, {
                text: action.payload.text,
                users: action.payload.users
            }),
            throw: (state, action) => Object.assign({}, state, {
                text: action.payload.message
            })
        },
    }, {text: "", users: [], followFlg: false}
)