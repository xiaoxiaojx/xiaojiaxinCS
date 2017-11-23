import * as React from "react";
import {
    FlatButton
} from "material-ui";
import { Card } from "material-ui/Card";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import "./index.scss";

interface SettingsState {
    avatarUrl: string;
}

class Settings extends React.Component<{}, SettingsState> {
    state: SettingsState = {
        avatarUrl: ""
    };
    fileNode: HTMLInputElement;

    handleUpload() {
        this.fileNode.click();
    }
    handleFileChange(e) {
        const file = this.fileNode.files[0];
        const fileReader = new FileReader();
        fileReader.onload =  (event: any) => {
            this.setState({
                avatarUrl: event.target.result
            })
        }
        fileReader.readAsDataURL(file);        
    }
    render() {
        const { avatarUrl } = this.state;
        const src = avatarUrl ? avatarUrl : DEFAULT_AVATAR_IMG;

        return (
            <Card className="SettingsWrap">
                <div className="avatarWrap">
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
            </Card>
        );
    }
}

export default Settings;