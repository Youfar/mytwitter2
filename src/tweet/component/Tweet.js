import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

const styles = {

    floatingLabelStyle: {
        color: orange500,
    },
    floatingLabelFocusStyle: {
        color: blue500,
    },
};

export default class Tweet extends Component {
    static propTypes = {
        handleAddTweet: PropTypes.func.isRequired,
        token: PropTypes.string.isRequired,
        // handleToggleTodo: PropTypes.func.isRequired,
        // handleDeleteTodo: PropTypes.func.isRequired,
    };

    handleSubmit = (e) => {
        const target = e.target;
        e.preventDefault();
        const action = this.props.handleAddTweet

        action(
            target.tweetContent.value.trim(),
            this.props.token
        );
        // this.props.handleAddTweet(this.refs.tweetContent.value, this.props.token);
        // this.refs.tweetContent.value = '';
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField type="text" id="tweetContent"
                               floatingLabelText="な〰にやりますか〰"
                               floatingLabelStyle={styles.floatingLabelStyle}
                               floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                               underlineShow={false}
                               multiLine={true}
                               rows={2}
                               rowsMax={4}
                    />
                    <RaisedButton type="submit" label="ツイート" primary={true} />
                </form>
            </div>
        );
    }
}