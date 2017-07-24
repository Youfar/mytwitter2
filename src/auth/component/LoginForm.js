import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

const defaultPStyle = {
    color: '#000',
    textAlign: 'center',
};

const LoginButtonStyle = {
    margin: 12,
    textAlign: 'center',
};

const InputStyle = {
    marginLeft: 20,
};

export default class LoginForm extends Component {
    static propTypes = {
        // isFetching: PropTypes.bool,
        handleLoginSubmit: PropTypes.func.isRequired,
        handleSignUpSubmit: PropTypes.func.isRequired,
    };

    renderHandleLoginSubmit(e) {
        const target = e.target;
        e.preventDefault();
        const action = this.props.handleLoginSubmit

        action(
            target.username.value.trim(),
            target.password.value.trim(),
        );
    }

    renderHandleSignUpSubmit(e) {
        const target = e.target;
        e.preventDefault();
        const action = this.props.handleSignUpSubmit

        action(
            target.username.value.trim(),
            target.email.value.trim(),
            target.password.value.trim(),
        );
    }


    render() {
        return (
            <Tabs>
                <Tab label="登録">
                    <div>
                        <form onSubmit={e => this.renderHandleSignUpSubmit(e)}>
                            <TextField type="text" id="username" hintText="ユーザー名" style={InputStyle} underlineShow={false} />
                            <Divider />
                            <TextField type="text" id="email" hintText="登録メールアドレス" style={InputStyle} underlineShow={false} />
                            <Divider />
                            <TextField type="password" id="password" hintText="パスワード(8文字以上)" style={InputStyle} underlineShow={false} />
                            <Divider />
                            <RaisedButton type="submit" label="登録" primary={true} style={LoginButtonStyle} />
                        </form>
                    </div>
                </Tab>
                <Tab label="ログイン">
                    <div>
                        <form onSubmit={e => this.renderHandleLoginSubmit(e)}>
                            <TextField type="text" id="username" hintText="ユーザー名" style={InputStyle} underlineShow={false} />
                            <Divider />
                            <TextField type="password" id="password" hintText="パスワード" style={InputStyle} underlineShow={false} />
                            <Divider />
                            <RaisedButton type="submit" label="ログイン" primary={true} style={LoginButtonStyle} />
                        </form>
                    </div>
                </Tab>
            </Tabs>
            );
    }
}