import * as React from "react";
import { observer } from "mobx-react";
import {
    TextField,
    RaisedButton
} from "material-ui";
import Tooltip from "../Tooltip";
import Store from "../../store";
import Rules from "../../common/rules";
import {
    redirect
} from "../../common/utils";
import {
    RegisterReq,
    Register as RegisterService
} from "../../../services";
import "./index.scss";

interface RegisterProps {
    store: Store;
}

interface RegisterState {
    errorText: RegisterReq;
    user: RegisterReq;
    modalData: {
        showModal: boolean;
        message: string;
    };
    disabled: boolean;
}

@observer
class Register extends React.Component<RegisterProps, RegisterState> {
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
        const { store } = this.props;
        this.setDisabled(true);
        if ( !user.nickname) {
            this.setErrorText({nickname: Rules.nickname.error});
            this.setDisabled(false);
            return false;
        }
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
        RegisterService(user)
            .then(result => {
                if (result.error) {
                    this.showModalMessage(result.message);
                } else {
                    this.showModalMessage(result.message);
                    store.setLocalStorageQaqData(user);
                    store.setShowLoginRegisterModal(false);
                    redirect("/settings");
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
        if (!nickname || nickname.length > 10) {
            this.setErrorText({nickname: Rules.nickname.error});
        } else {
            this.setErrorText({nickname: ""});
        }
        this.setUser({ nickname });
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
    render() {
        const { errorText, user, modalData, disabled } = this.state;

        return (
            <div className="RegisterWrap">
                <TextField
                    floatingLabelText="昵称"
                    errorText={errorText.nickname}
                    value={user.nickname}
                    onChange={this.onChangeNickname.bind(this)}/>
                <TextField
                    className="marginTop"
                    floatingLabelText="账号"
                    errorText={errorText.userName}
                    value={user.userName}
                    onChange={this.onChangeUserName.bind(this)}/>
                <TextField
                    className="marginTop"
                    type="password"
                    floatingLabelText="密码"
                    value={user.password}
                    errorText={errorText.password}
                    onChange={this.onChangePassword.bind(this)}/>
                <div className="btnWrap">
                    <RaisedButton
                        disabled={ disabled }
                        label="注册"
                        primary
                        onClick={ this.register.bind(this) }/>
                </div>
                <Tooltip
                    visible={modalData.showModal}
                    message={modalData.message} />
            </div>
        );
    }
}

export default Register;