import * as React from "react";
import { observer } from "mobx-react";
import {
    FlatButton,
    TextField,
    RaisedButton
} from "material-ui";
import {
    Card
} from "material-ui/Card";
import {
    RadioButton,
    RadioButtonGroup
} from "material-ui/RadioButton";
import Store from "../../store";
import Rules from "../../common/rules";
import Modal from "../Modal";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import {
    redirect
} from "../../common/utils";
import {
    SetUserInfo as SetUserInfoService,
    SetUserInfoReq,
    User
} from "../../../services";
import "./index.scss";

interface SettingsProps {
    store: Store;
}

interface SettingsState {
    userInfo: Partial<User>;
    showModal: boolean;
    modalText: string[];
}

@observer
class Settings extends React.Component<SettingsProps, SettingsState> {
    state: SettingsState = {
        userInfo: {},
        showModal: false,
        modalText: []
    };
    fileNode: HTMLInputElement;

    componentDidMount() {
        const { store } = this.props;
        store.getUserInfo().then(result => this.setUserInfo(result.data));
    }
    setShowModal(showModal: boolean) {
        this.setState({ showModal });
    }
    setUserInfoService() {
        const { userInfo } = this.state;
        const { store } = this.props;
        const qaqData = store.localStorageQaqData;
        SetUserInfoService({...userInfo, userName: qaqData["userName"]} as SetUserInfoReq)
            .then(result => {
                redirect("/");
            });
    }
    setUserInfo(data: Partial<User>) {
        if (data.selfIntroduction && data.selfIntroduction.length >= 50) {
            return;
        }
        const userInfo = {...this.state.userInfo, ...data};
        this.setState({ userInfo });
    }
    handleUpload() {
        this.fileNode.click();
    }
    handleFileChange(e) {
        const file = this.fileNode.files[0];
        const fileReader = new FileReader();
        fileReader.onload =  (event: any) => {
            this.setUserInfo({
                avatar: event.target.result
            });
        };
        fileReader.readAsDataURL(file);
    }
    handleSubmit() {
        const { userInfo } = this.state;
        const modalText: string[] = [];
        if (!userInfo.nickname) {
            modalText.push(Rules.nickname.error);
        }
        if (!userInfo.sex) {
            modalText.push(Rules.sex.error);
        }
        if (!Rules.email.RegExp.test(userInfo.email)) {
            modalText.push(Rules.email.error);
        }
        if (!userInfo.selfIntroduction) {
            modalText.push(Rules.selfIntroduction.error);
        }
        if (modalText.length === 0) {
            this.setUserInfoService();
        }
        else if (modalText.length !== 0) {
            this.setShowModal(true);
        }
        this.setState({ modalText });
    }
    onCancel() {
        this.setShowModal(false);
    }
    render() {
        const { userInfo, showModal, modalText } = this.state;
        const { avatar = "" } = userInfo;
        const src = avatar ? avatar : DEFAULT_AVATAR_IMG;
        const modalContent = modalText.length > 0 ?
            modalText.map((text, index) =>
                <h5 key={index}> {text} </h5>
            ) : null;

        return (
            <Card className="SettingsWrap">
                <h2>
                    个人资料
                </h2>
                <hr />
                <div className="nicknameWrap">
                    <label>
                        昵称:
                    </label>
                    <TextField
                        value={userInfo.nickname}
                        onChange={ (e: any) => this.setUserInfo({nickname: e.target.value}) } />
                </div>
                <hr />
                <div className="avatarWrap">
                    <label>
                        头像:
                    </label>
                    <img
                        src={src} />
                    <FlatButton
                        label="上传头像"
                        primary
                        onClick={this.handleUpload.bind(this)} />
                    <input
                        ref={node => this.fileNode = node}
                        accept=".png, .jpg, .jpeg"
                        type="file"
                        name="avatar"
                        onChange={this.handleFileChange.bind(this)} />
                </div>
                <hr />
                <div className="sexWrap">
                    <label>
                        性别:
                    </label>
                    <RadioButtonGroup
                        name="shipSpeed"
                        valueSelected={userInfo.sex}
                        onChange={(e: any) => this.setUserInfo({sex: e.target.value})}>
                        <RadioButton
                            value="男"
                            label="男"
                        />
                        <RadioButton
                            value="女"
                            label="女"
                        />
                    </RadioButtonGroup>
                </div>
                <hr />
                <div className="nicknameWrap">
                    <label>
                        邮箱:
                    </label>
                    <TextField
                        value={userInfo.email}
                        onChange={ (e: any) => this.setUserInfo({email: e.target.value}) }/>
                </div>
                <hr/>
                <div className="nicknameWrap">
                    <label>
                        个人介绍:
                    </label>
                    <TextField
                        multiLine
                        rows={2}
                        value={userInfo.selfIntroduction}
                        onChange={ (e: any) => this.setUserInfo({selfIntroduction: e.target.value}) } />
                </div>
                <hr/>
                <div className="nicknameWrap">
                    <RaisedButton
                        label="提交修改"
                        primary
                        onClick={this.handleSubmit.bind(this)} />
                </div>
                <hr/>
                <Modal
                    title="提交失败"
                    visible={showModal}
                    onOk={() => this.setShowModal(false)}
                    onCancel={() => this.setShowModal(false)}>
                    <div> { modalContent } </div>
                </Modal>
            </Card>
        );
    }
}

export default Settings;