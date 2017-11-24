import * as React from "react";
import {
    TextField,
    RaisedButton,
} from "material-ui";
import Tooltip from "../Tooltip";
import Rules from "../../common/rules";
import {
    redirect
} from "../../common/utils";
import {
    LoginReq,
    Login as LoginService
} from "../../../services";
import "./index.scss";

interface LoginProps {
    close: Function;
}

interface LoginState {
    errorText: LoginReq;
    user: LoginReq;
    modalData: {
        showModal: boolean;
        message: string;
    };
    disabled: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {
    state: LoginState = {
        errorText: {
            userName: "",
            password: "",
        },
        user: {
            userName: "",
            password: "",
        },
        modalData: {
            showModal: false,
            message: ""
        },
        disabled: false
    };
    setUser(data: Partial<LoginReq>) {
        const { user } = this.state;
        const newUser = { ...user,  ...data};
        this.setState({ user: newUser });
    }
    setErrorText(data: Partial<LoginReq>) {
        const { errorText } = this.state;
        const newErrorText = { ...errorText,  ...data};
        this.setState({ errorText: newErrorText });
    }
    setDisabled(disabled: boolean) {
        this.setState({
            disabled
        });
    }
    hasCorrectText(): boolean {
        const { errorText } = this.state;
        return Object.keys(errorText).every(item => errorText[item] === "");
    }
    onChangeUserName(e) {
        const userName = e.target.value;
        if (!(Rules.userName.RegExp.test(userName))) {
            this.setErrorText({userName: Rules.userName.error});
        } else {
            this.setErrorText({userName: ""});
        }
        this.setUser({ userName });
    }
    onChangePassword(e) {
        const password = e.target.value;
        if (!(Rules.password.RegExp.test(password))) {
            this.setErrorText({password: Rules.password.error});
        } else {
            this.setErrorText({password: ""});
        }
        this.setUser({ password });
    }
    showModalMessage(message: string) {
        this.setState({
            modalData: {
                showModal: true,
                message
            }
        });
    }
    login(): boolean {
        const { user } = this.state;
        const { close } = this.props;
        this.setDisabled(true);
        if (!user.userName) {
            this.setErrorText({userName: Rules.userName.error});
            this.setDisabled(false);
            return false;
        }
        if (!user.password) {
            this.setErrorText({password: Rules.password.error});
            this.setDisabled(false);
            return false;
        }
        if (!this.hasCorrectText()) {
            this.setDisabled(false);
            return false;
        }
        LoginService(user)
            .then(result => {
                if (result.error) {
                    this.showModalMessage(result.message);
                } else {
                    this.showModalMessage(result.message);
                    localStorage.setItem("qaqData", JSON.stringify(user));
                    close();
                    redirect("/");
                }
                this.setDisabled(false);
            })
            .catch(err => {
                this.showModalMessage(err.message);
                this.setDisabled(false);
            });
        return true;
    }
    render() {
        const { errorText, user, modalData, disabled } = this.state;

        return (
            <div className="LoginWrap">
                <TextField
                    floatingLabelText="账号"
                    errorText={errorText.userName}
                    value={user.userName}
                    onChange={this.onChangeUserName.bind(this)}/>
                <TextField
                    floatingLabelText="密码"
                    value={user.password}
                    errorText={errorText.password}
                    onChange={this.onChangePassword.bind(this)}/>
                <div className="btnWrap">
                    <RaisedButton
                        label="登录"
                        disabled={disabled}
                        primary
                        onClick={this.login.bind(this)}/>
                </div>
                <Tooltip
                    visible={modalData.showModal}
                    message={modalData.message} />
            </div>
        );
    }
}

export default Login;