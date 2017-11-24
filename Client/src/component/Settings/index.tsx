import * as React from "react";
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
import Modal from "../Modal";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import {
	getLocalStorageData
} from "../../common/utils";
import {
    GetUserInfo,
    SetUserInfo as SetUserInfoService,
    SetUserInfoReq,
    User
} from "../../../services";
import "./index.scss";

interface SettingsState {
    userInfo: Partial<User>;
    showModal: boolean;
    modalText: string[];
}

class Settings extends React.Component<{}, SettingsState> {
    state: SettingsState = {
        userInfo: {},
        showModal: false,
        modalText: []
    };
    fileNode: HTMLInputElement;

    componentDidMount() {
        this.getUserInfo();
    }
    setShowModal(showModal: boolean) {
        this.setState({ showModal });
    }
    setUserInfoService() {
        const { userInfo } = this.state;
        const qaqData = getLocalStorageData();
        SetUserInfoService({...userInfo, userName: qaqData["userName"]} as SetUserInfoReq);
    }
    getUserInfo() {
        const qaqData = getLocalStorageData();
        if (qaqData) {
            GetUserInfo({userName: qaqData["userName"]})
                .then(result => this.setState({ userInfo: result.data }));
        }
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
            modalText.push("昵称不能为空!");
        }
        if (!userInfo.sex) {
            modalText.push("性别不能为空!");
        }
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(userInfo.email)) {
            modalText.push("邮箱验证不正确!");
        }
        if (!userInfo.selfIntroduction) {
            modalText.push("个人介绍不能为空!");
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
                        onChange={ e => this.setUserInfo({nickname: e.target.value}) } />
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
                        onChange={e => this.setUserInfo({sex: e.target.value})}>
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
                        onChange={ e => this.setUserInfo({email: e.target.value}) }/>
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
                        onChange={ e => this.setUserInfo({selfIntroduction: e.target.value}) } />
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