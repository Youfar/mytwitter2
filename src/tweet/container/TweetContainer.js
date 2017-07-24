import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { addTweet, loadTweets } from "../../tweet/action"
import Tweet from '../component/Tweet';
import TweetCard from "../component/TweetCard";
import {addFavoriteTweet, deleteFavoriteTweet, deleteTweet, loadFavoriteTweets} from "../action";

const containerStyle = {
    marginTop: '200px',
    marginLeft: '700px',
    width: '600px',
    height: '200px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // margin: 'auto',
};

const TweetInputStyle = {
    marginTop: '100px',
    marginLeft: '800px',
    width: '600px',
    height: '200px',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // margin: 'auto',
};

class TweetContainer extends Component {
    static propTypes = {
        dispatchAddTweet: PropTypes.func.isRequired,
        dispatchFetchTweet: PropTypes.func.isRequired,
        dispatchDeleteTweet: PropTypes.func.isRequired,
        dispatchAddFavoriteTweet: PropTypes.func.isRequired,
        dispatchFetchFavoriteTweet: PropTypes.func.isRequired,
        dispatchDeleteFavoriteTweet: PropTypes.func.isRequired,
    };

    componentWillMount() {
        console.log('willMount');
        this.props.dispatchFetchTweet(this.props.token);
    }

    handleAddTweet(text, token) {
        this.props.dispatchAddTweet(text, token);
    };

    handleDeleteTweet(tweetId, token) {
        this.props.dispatchDeleteTweet(tweetId, token);
    };

    handleAddFavoriteTweet(text, token) {
        this.props.dispatchAddFavoriteTweet(text, token);
    };

    handleDeleteFavoriteTweet(tweetId, token) {
        this.props.dispatchDeleteFavoriteTweet(tweetId, token);
    };

    render() {
        return (
            <div>
                <div style={TweetInputStyle}>
                    <Tweet
                        token={this.props.token}
                        handleAddTweet={this.handleAddTweet.bind(this)}
                        // handleToggleTodo={this.handleToggleTodo.bind(this)}
                    />
                </div>
                <div style={containerStyle}>
                    <TweetCard
                        token={this.props.token}
                        tweets={this.props.tweets}
                        handleDeleteTweet={this.handleDeleteTweet.bind(this)}
                        handleAddFavoriteTweet={this.handleAddFavoriteTweet.bind(this)}
                        handleDeleteFavoriteTweet={this.handleDeleteFavoriteTweet.bind(this)}
                    />
                </div>
            </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token,
        tweets: state.tweetReducer.tweets,
    }
};

const mapDispatchToProps = (dispatch) => {
    const dispatchFetchTweet = (token) => dispatch(loadTweets(token));
    const dispatchAddTweet = (tweetContent, token) => dispatch(addTweet(tweetContent, token));
    const dispatchDeleteTweet = (token, tweetId) => dispatch(deleteTweet(token, tweetId));
    const dispatchFetchFavoriteTweet = (token) => dispatch(loadFavoriteTweets(token));
    const dispatchAddFavoriteTweet = (token, tweetId) => dispatch(addFavoriteTweet(token, tweetId));
    const dispatchDeleteFavoriteTweet = (token, tweetId) => dispatch(deleteFavoriteTweet(token, tweetId));
    return {
        dispatchFetchTweet,
        dispatchAddTweet,
        dispatchDeleteTweet,
        dispatchFetchFavoriteTweet,
        dispatchAddFavoriteTweet,
        dispatchDeleteFavoriteTweet,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TweetContainer);