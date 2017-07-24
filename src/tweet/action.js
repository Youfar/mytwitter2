import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';

const TWEET_API_URL = 'http://localhost:8080/tweet';
export const POST_TWEET_ACTIONS = {
    REQUEST_POST_TWEET: 'REQUEST_POST_TWEET',
    COMPLETE_POST_TWEET: 'COMPLETE_POST_TWEET',
    FAILED_POST_TWEET: 'FAILED_POST_TWEET'
};

const requestPostTweet = createAction(POST_TWEET_ACTIONS.REQUEST_POST_TWEET, () => ({text: "リクエスト中"}));
const completePostTweet = createAction(POST_TWEET_ACTIONS.COMPLETE_POST_TWEET, (json) => ({tweet: json}));

export function addTweet(tweet, token) {
    return function(dispatch) {
        dispatch(requestPostTweet());
        const headers = new Headers();
        headers.append('x-auth-token', token);
        const body = new FormData();
        body.append('tweetContent', tweet);
        return fetch(TWEET_API_URL, {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: body
        }).then(function(response) {
            if (response.status === 401) {
                throw new Error();
            }
            return response.json();
        }).then(function(json) {
            dispatch(completePostTweet(json));
        }).catch(err => {
            dispatch(completePostTweet(err));
        });
    }
}

const GET_TWEETS_API_URL = 'http://localhost:8080/getTweet';
export const TWEET_LIST_ACTIONS = {
    REQUEST_GET_TWEETS: 'REQUEST_GET_TWEETS',
    COMPLETE_GET_TWEETS: 'COMPLETE_GET_TWEETS',
    // FAILED_GET_TWEETS: 'FAILED_GET_TWEETS'
};

const requestGetTweets = createAction(TWEET_LIST_ACTIONS.REQUEST_GET_TWEETS);
const completeGetTweets = createAction(TWEET_LIST_ACTIONS.COMPLETE_GET_TWEETS, (tweets) => ({tweets: tweets}));

export function loadTweets(token) {
    return function(dispatch) {
        dispatch(requestGetTweets());
        const headers = new Headers();
        headers.append("x-auth-token", token);
        return fetch(GET_TWEETS_API_URL, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        }).then(function(response) {
            if (response.status === 401) {
                throw Error();
            }
            return response.json();
        }).then(function(json){
            dispatch(completeGetTweets(json));
        }).catch(function(err) {
            dispatch(completeGetTweets(err));
        });
    };
}

const DELETE_TWEET_API_URL = 'http://localhost:8080/deleteTweet';
export const TWEET_ACTIONS = {
    REQUEST_DELETE_TWEET: 'REQUEST_DELETE_TWEET',
    COMPLETE_DELETE_TWEET: 'COMPLETE_DELETE_TWEET',
    // FAILED_DELETE_TWEET: 'FAILED_DELETE_TWEET'
};

const requestDeleteTweet = createAction(TWEET_ACTIONS.REQUEST_DELETE_TWEET);
const completeDeleteTweet = createAction(TWEET_ACTIONS.COMPLETE_DELETE_TWEET, (tweetId) => ({tweetId: tweetId}));
// const failedDeleteTweet: ActionCreator = createAction(TWEET_ACTIONS.FAILED_DELETE_TWEET, (errMsg) => ({errMsg: errMsg}));

export function deleteTweet(token, tweetId) {
    return function(dispatch) {
        dispatch(requestDeleteTweet());
        const headers = new Headers();
        headers.append('x-auth-token', token);
        const body = new FormData();
        body.append("tweetId", tweetId.toString());
        return fetch(DELETE_TWEET_API_URL, {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: body
        }).then(function(response) {
            if (!response.ok) {
                throw new Error();
            }
            console.log("point1");
            dispatch(completeDeleteTweet(tweetId));
        }).catch(function(err) {
            console.log("point2");
            dispatch(completeDeleteTweet(err));
            // dispatch(removeToken());
            // dispatch(failedDeleteTweet(err.message));
        });
    }
}

const GET_FAVORITE_TWEETS_API_URL = 'http://localhost:8080/getFavoriteTweet';
export const GET_FAVORITE_TWEETS_ACTIONS = {
    REQUEST_GET_FAVORITE_TWEETS: 'REQUEST_GET_FAVORITE_TWEETS',
    COMPLETE_GET_FAVORITE_TWEETS: 'COMPLETE_GET_FAVORITE_TWEETS',
    // FAILED_GET_FAVORITE_TWEETS: 'FAILED_GET_FAVORITE_TWEETS'
};

const requestGetFavoriteTweets = createAction(GET_FAVORITE_TWEETS_ACTIONS.REQUEST_GET_FAVORITE_TWEETS);
const completeGetFavoriteTweets = createAction(GET_FAVORITE_TWEETS_ACTIONS.COMPLETE_GET_FAVORITE_TWEETS, (json) => ({favoriteTweets: json}));
// const failedGetFavoriteTweets: ActionCreator = createAction(GET_FAVORITE_TWEETS_ACTIONS.FAILED_GET_FAVORITE_TWEETS);

export function loadFavoriteTweets(token) {
    return function(dispatch) {
        dispatch(requestGetFavoriteTweets());
        const headers = new Headers();
        headers.append("x-auth-token", token);
        return fetch(GET_FAVORITE_TWEETS_API_URL, {
            method: 'GET',
            headers: headers,
        }).then(function(response) {
            if (response.status === 401) {
                throw new Error();
            }
            return response.json()
        }).then(function(json) {
            dispatch(completeGetFavoriteTweets(json))
        }).catch(function(err) {
            // dispatch(failedGetFavoriteTweets(err.message))
            dispatch(completeGetFavoriteTweets(err));
        });
    }
}

// const ADD_FAVORITE_TWEET_API_URL = 'http://localhost:4000/api/addFavoriteTweet';
const ADD_FAVORITE_TWEET_API_URL = 'http://localhost:8080/addFavoriteTweet';
export const ADD_FAVORITE_TWEET_ACTIONS = {
    REQUEST_ADD_FAVORITE_TWEET: 'REQUEST_ADD_FAVORITE_TWEET',
    COMPLETE_ADD_FAVORITE_TWEET: 'COMPLETE_ADD_FAVORITE_TWEET',
    // FAILED_ADD_FAVORITE_TWEET_ON_FAVORITE: 'FAILED_ADD_FAVORITE_TWEET_ON_FAVORITE'
};

const requestAddFavoriteTweet = createAction(ADD_FAVORITE_TWEET_ACTIONS.REQUEST_ADD_FAVORITE_TWEET);
const completeAddFavoriteTweet = createAction(ADD_FAVORITE_TWEET_ACTIONS.COMPLETE_ADD_FAVORITE_TWEET, (tweetId) => ({tweetId: tweetId}));
// const failedAddFavoriteTweet: ActionCreator = createAction(ADD_FAVORITE_TWEET_ON_FAVORITE_ACTIONS.FAILED_ADD_FAVORITE_TWEET_ON_FAVORITE);

export function addFavoriteTweet(token, tweetId) {
    return function(dispatch) {
        dispatch(requestAddFavoriteTweet());
        const headers = new Headers();
        headers.append("x-auth-token", token);
        const body = new FormData();
        body.append("tweetId", tweetId.toString());
        return fetch(ADD_FAVORITE_TWEET_API_URL, {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: body
        }).then(function(response) {
            if (response.status === 401) {
                throw new Error();
            }
            return response.text();
        }).then(function() {
            dispatch(completeAddFavoriteTweet(tweetId));
        }).catch(function(err) {
            // dispatch(failedAddFavoriteTweet(err.message));
            dispatch(completeAddFavoriteTweet(err));
        })
    }
}

//const DELETE_FAVORITE_TWEET_API_URL = 'http://localhost:4000/api/deleteFavoriteTweet';
const DELETE_FAVORITE_TWEET_API_URL = 'http://localhost:8080/deleteFavoriteTweet';
export const DELETE_FAVORITE_TWEET_ACTIONS = {
    REQUEST_DELETE_FAVORITE_TWEET: 'REQUEST_DELETE_FAVORITE_TWEET',
    COMPLETE_DELETE_FAVORITE_TWEET: 'COMPLETE_DELETE_FAVORITE_TWEET',
    // FAILED_DELETE_FAVORITE_TWEET_ON_FAVORITE: 'FAILED_DELETE_FAVORITE_TWEET_ON_FAVORITE'
};

const requestDeleteFavoriteTweet = createAction(DELETE_FAVORITE_TWEET_ACTIONS.REQUEST_DELETE_FAVORITE_TWEET);
const completeDeleteFavoriteTweet = createAction(DELETE_FAVORITE_TWEET_ACTIONS.COMPLETE_DELETE_FAVORITE_TWEET, (tweetId) => ({tweetId: tweetId}));
// const failedDeleteFavoriteTweet: ActionCreator = createAction(DELETE_FAVORITE_TWEET_ON_FAVORITE_ACTIONS.FAILED_DELETE_FAVORITE_TWEET_ON_FAVORITE);

export function deleteFavoriteTweet(token, tweetId) {
    return function(dispatch) {
        dispatch(requestDeleteFavoriteTweet());
        const headers = new Headers();
        headers.append("x-auth-token", token);
        const body = new FormData();
        body.append("tweetId", tweetId.toString());
        return fetch(DELETE_FAVORITE_TWEET_API_URL, {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: body
        }).then(function(response) {
            if (response.status === 401) {
                throw new Error();
            }
            return response.text()
        }).then(function() {
            dispatch(completeDeleteFavoriteTweet(tweetId))
        }).catch(function(err) {
            // dispatch(failedDeleteFavoriteTweet())
            dispatch(completeDeleteFavoriteTweet(err));
        });
    }
}