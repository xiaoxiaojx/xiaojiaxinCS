import * as React from "react";
import {
    TextField,
    RaisedButton,
    Snackbar
} from "material-ui";
import {
	snackbarStyle
} from "../../common/constant";
import {
    RegisterReq,
    Register as RegisterService
} from "../../../services";
import "./index.scss";

interface RegisterState {
    errorText: RegisterReq;
    user: RegisterReq;
    modalData: {
        showModal: boolean;
        message: string;
    };
    disabled: boolean;
}

class Register extends React.Component<{}, RegisterState> {
    state: RegisterState = {
        errorText: {
            userName: "",
            password: "",
            nickname: ""
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
    setUser(data: Partial<RegisterReq>) {
        const { user } = this.state;
        const newUser = { ...user,  ...data};
        this.setState({ user: newUser });
    }
    setErrorText(data: Partial<RegisterReq>) {
        const { errorText } = this.state;
        const newErrorText = { ...errorText,  ...data};
        this.setState({ errorText: newErrorText });
    }
    setDisabled(disabled: boolean) {
        this.setState({
            disabled
        });
    }
    onRequestClose() {
        this.setState({
            modalData: {
                showModal: false,
                message: ""
            }
        });
    }
    hasCorrectText(): boolean {
        const { errorText } = this.state;
        return Object.keys(errorText).every(item => errorText[item] === "");
    }
    showModalMessage(message: string) {
        this.setState({
            modalData: {
                showModal: true,
                message
            }
        });
    }
    register(): boolean {
        const { user } = this.state;
        this.setDisabled(true);
        if ( !user.nickname) {
            this.setErrorText({nickname: "昵称不能为空"});
            this.setDisabled(false);
            return false;
        }
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
        RegisterService(user)
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
    onChangeNickname(e) {
        const nickname = e.target.value;
        if (!nickname) {
            this.setErrorText({nickname: "昵称不能为空"});
        } else {
            this.setErrorText({nickname: ""});
        }
        this.setUser({ nickname });
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
    render() {
        const { errorText, user, modalData, disabled } = this.state;

        return (
            <div className="RegisterWrap">
                <TextField
                    floatingLabelText="用户名"
                    errorText={errorText.nickname}
                    value={user.nickname}
                    onChange={this.onChangeNickname.bind(this)}/>
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
                        disabled={ disabled }
                        label="注册"
                        primary
                        onClick={ this.register.bind(this) }/>
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

export default Register;