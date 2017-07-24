import React, {Component} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../../material_ui_raw_theme_file';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TweetContainer from "../../tweet/container/TweetContainer";
import {logout} from '../../auth/action';
import UserContainer from "../../user/container/UserContainer";
// import {authReducer as prevProps} from "../../auth/reducer";
import {tokenReducer as prevProps} from "../../token/reducer";

// const titleStyle = {
//     // marginTop: '100px',
//     // marginLeft: '600px',
//     // position: 'relative',
//     display: flex,
// };
class TimeLine extends Component {

    render() {
        const { dispatch } = this.props;
        return (
            <div>
                <MuiThemeProvider muiTheme={theme}>
                    <div>
                        <AppBar
                            title="ホーム"
                            iconElementRight={<FlatButton label="ログアウト" onClick={() => dispatch(logout())}/>}
                        />
                        <TweetContainer/>
                        <UserContainer/>
                    </div>
                </MuiThemeProvider>
            </div>);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.token !== prevProps.token) {
            console.log("aaaaa");
        }
    }
}

function mapStateToProps(state) {
    return {
        loginFlg: state.authReducer.loginFlg,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeLine);
