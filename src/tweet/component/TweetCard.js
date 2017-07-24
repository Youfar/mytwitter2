import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardText, FlatButton} from "material-ui";

export default class TweetCard extends Component {
    static propTypes = {
        handleDeleteTweet: PropTypes.func.isRequired,
        token: PropTypes.string.isRequired,
        handleAddFavoriteTweet: PropTypes.func.isRequired,
        handleDeleteFavoriteTweet: PropTypes.func.isRequired,
    };

    render() {
        const { tweets } = this.props
        return (
            <section className="main">
                <ul>
                    {tweets.map(tweet => (
                        <Card key={tweet.tweetId}>
                            <CardHeader
                                title={tweet.creator.username}
                                subtitle={tweet.tweetDatetime.year + "-"
                                + tweet.tweetDatetime.monthValue + "-"
                                + tweet.tweetDatetime.dayOfMonth + " "
                                + tweet.tweetDatetime.hour + ":"
                                + tweet.tweetDatetime.minute}
                            />
                            <CardText>
                                {tweet.tweetContent}
                            </CardText>
                            <CardActions>
                                <FlatButton label="お気に入り"  onClick={() => this.props.handleAddFavoriteTweet(this.props.token, tweet.tweetId)}/>
                                <FlatButton label="お気に入り削除"  onClick={() => this.props.handleDeleteFavoriteTweet(this.props.token, tweet.tweetId)}/>/>
                                <FlatButton label="削除" onClick={() => this.props.handleDeleteTweet(this.props.token, tweet.tweetId)} />
                            </CardActions>
                        </Card>
                    )
                    )}
                </ul>
            </section>
        )
    }
}