import { handleActions } from 'redux-actions';

export const authReducer = handleActions({
        REQUEST_SIGN_UP: (state, action) => Object.assign({}, state, {}),
        COMPLETE_SIGN_UP: {
            next: (state, action) => Object.assign({}, state, {
                signUpFlg: true,
                loginFlg: true
            }),
            throw: (state, action) => Object.assign({}, state, {
                signUpMsg: action.payload.message
            })
        },
        REQUEST_LOGIN: (state, action) => Object.assign({}, state, {}),
        COMPLETE_LOGIN: {
            next: (state, action) => Object.assign({}, state, {
                loginFlg: true
            }),
            throw: (state, action) => Object.assign({}, state, {
                loginMsg: action.payload.message
            }),
        },

        REQUEST_LOGOUT: (state, action) => Object.assign({}, state, {}),
        COMPLETE_LOGOUT: {
            next: (state, action) => Object.assign({}, state, {
                loginFlg: false
            }),
            throw: (state, action) => Object.assign({}, state, {
                loginMsg: action.payload.message
            }),
        },
    }, {userId: 0,  signUpMsg: "", loginMsg: "", loginFlg: false, signUpFlg: false}
);