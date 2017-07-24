import { handleActions } from 'redux-actions';

export const tweetReducer = handleActions(
    {
        REQUEST_GET_TWEETS: (state, action) => Object.assign({}, state, {}),
        COMPLETE_GET_TWEETS: {
            next: (state, action) => Object.assign({}, state, {
                text: action.payload.text,
                tweets: action.payload.tweets
            }),
            throw: (state, action) => Object.assign({}, state, {
                text: action.payload.message
            })
        },

        REQUEST_POST_TWEET: (state, action) => Object.assign({}, state, {}),
        COMPLETE_POST_TWEET: {
            next: (state, action) => Object.assign({}, state, {
                tweets: [action.payload.tweet, ...state.tweets],
                tweetCompleteFlg: true
            }),
            throw: (state, action) => Object.assign({}, state, {
                tweetInputText: "ツイートの投稿に失敗しました"
            })
        },

        REQUEST_DELETE_TWEET: (state, action) => Object.assign({}, state, {}),
        COMPLETE_DELETE_TWEET: {
            next: (state, action) => {
                const tweets = [];
                let i = 0;
                for (const key in state.tweets) {
                    const tweet = state.tweets[key];
                    if (tweet.tweetId !== action.payload.tweetId) {
                        tweets[i] = tweet;
                        i++;
                    }
                }
                return Object.assign({}, state, {tweets: tweets});
            },
            throw: (state, action) => Object.assign({}, state, {

            })
        },

        REQUEST_GET_FAVORITE_TWEETS: (state, action) => Object.assign({}, state, {}),
        COMPLETE_GET_FAVORITE_TWEETS: {
            next: (state, action) => {
                return Object.assign({}, state, {
                    favoriteTweets: action.payload.favoriteTweets
                })
            },
            throw: (state, action) => Object.assign({}, state, {

            })
        },

        REQUEST_ADD_FAVORITE_TWEET: (state, action) => Object.assign({}, state, {}),
        COMPLETE_ADD_FAVORITE_TWEET: {
            next: (state, action) => Object.assign({}, state, {
                favoriteTweets: [action.payload.favoriteTweets, ...state.favoriteTweets],
            }),
            throw: (state, action) => Object.assign({}, state, {})
        },

        REQUEST_DELETE_FAVORITE_TWEET: (state, action) => Object.assign({}, state, {}),
        COMPLETE_DELETE_FAVORITE_TWEET: {
            next: (state, action) => {
                const tweets = [];
                for (const key in state.tweets) {
                    const tweet = state.tweets[key];
                    if (tweet.tweetId === action.payload.tweetId) {
                        tweet.favorite = !tweet.favorite;
                    }
                    tweets[key] = tweet;
                }
                return Object.assign({}, state, {tweets: tweets});
            },
            throw: (state, action) => Object.assign({}, state, {})
        },

    }, {text: "", tweetCompleteFlg: false, tweetInputText: "", tweets: [], favoriteTweets: []}
);