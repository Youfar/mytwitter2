import React from 'react'
import { render } from 'react-dom'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';

import Login from './auth/container/Login';
import { authReducer } from './auth/reducer';
import { tokenReducer } from "./token/reducer";
import { tweetReducer } from "./tweet/reducer";
import {userReducer} from "./user/reducer";
import LoginSuccess from "./LoginSuccess";
import injectTapEventPlugin from 'react-tap-event-plugin';
import TimeLine from "./timeline/container/TimeLine";
import persistState from 'redux-localstorage';
import App from "./App";

injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = compose(
    persistState("tokenReducer", "authReducer"),
);

const store = createStore(
    combineReducers({
        authReducer: authReducer,
        tokenReducer: tokenReducer,
        tweetReducer: tweetReducer,
        userReducer: userReducer,
    }), composeEnhancers(applyMiddleware(thunk), enhancer)
);

const requireAuth = (nextState, replace) => {
    const state = store.getState();
    if (!state.authReducer.loginFlg) {
        replace({ pathname: '/' })
    }
}

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Login} />
            <Route path="/app" component={App}/>
            <Route path="/TimeLine" component={TimeLine} onEnter={requireAuth}/>
            {/*<Route path="/loginSuccess" component={LoginSuccess} onEnter={requireAuth}/>*/}
        </Router>
    </Provider>,
    document.getElementById('root')
)
