import * as React from "react";
import {
    TextField,
    RaisedButton,
    Snackbar
} from "material-ui";
import {
	snackbarStyle
} from "../../common/constant";
import * as Services from "../../../services";
import "./index.scss";

interface LoginState {
    errorText: Partial<Services.User>;
    user: Partial<Services.User>;
    modalData: {
        showModal: boolean;
        message: string;
    };
    disabled: boolean;
}

class Login extends React.Component<{}, LoginState> {
    state: LoginState = {
        errorText: {
            userName: "",
            password: "",
        },
        user: {
            userName: "",
            password: "",
            nickname: ""
        },
        modalData: {
            showModal: false,
            message: ""
        },
        disabled: false
    };
    setUser(data: Partial<Services.User>) {
        const { user } = this.state;
        const newUser = { ...user,  ...data};
        this.setState({ user: newUser });
    }
    setErrorText(data: Partial<Services.User>) {
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
    onRequestClose() {
        this.setState({
            modalData: {
                showModal: false,
                message: ""
            }
        });
    }
    onChangeUserName(e) {
        const userName = e.target.value;
        if (!(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(userName))) {
            this.setErrorText({userName: "用户名必须以字母开头，长度为5-16字节，允许字母数字下划线"});
        } else {
            this.setErrorText({userName: ""});
        }
        this.setUser({ userName });
    }
    onChangePassworde(e) {
        const password = e.target.value;
        if (!(/[a-zA-Z0-9_]{4,15}$/.test(password))) {
            this.setErrorText({password: "用户名长度必须为5-16字节，允许字母数字下划线"});
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
        this.setDisabled(true);
        if (!user.userName) {
            this.setErrorText({userName: "用户名必须以字母开头，长度为5-16字节，允许字母数字下划线"});
            this.setDisabled(false);
            return false;
        }
        if (!user.password) {
            this.setErrorText({password: "用户名长度必须为5-16字节，允许字母数字下划线"});
            this.setDisabled(false);
            return false;
        }
        if (!this.hasCorrectText()) {
            this.setDisabled(false);
            return false;
        }
        Services.Login(user)
            .then(result => {
                if (result.error) {
                    this.showModalMessage(result.message);
                } else {
                    this.showModalMessage(result.message);
                    localStorage.setItem("qaqData", JSON.stringify(user));
                    location.reload();                   
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
                    onChange={this.onChangePassworde.bind(this)}/>
                <div className="btnWrap">
                    <RaisedButton
                        label="登录"
                        disabled={disabled}
                        primary
                        onClick={this.login.bind(this)}/>
                </div>
                <Snackbar
                    {...snackbarStyle}
                    open={modalData.showModal}
                    message={modalData.message}
                    autoHideDuration={4000}
                    onRequestClose={this.onRequestClose.bind(this)} />
            </div>
        );
    }
}

export default Login;