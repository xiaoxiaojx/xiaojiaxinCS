import * as React from "react";
import { Card, CardHeader, CardTitle, CardText } from "material-ui/Card";
import {
	getLocalStorageData
} from "../../common/utils";
import {
	DEFAULT_AVATAR_IMG
} from "../../common/baseImage";
import "./index.scss";

class Home extends React.Component<{}, {}> {
    render() {
        const data = getLocalStorageData();

        return (
            <Card className="HomeWrap">
                <CardHeader
                    title={data["nickname"]}
                    subtitle="个性签名"
                    avatar={DEFAULT_AVATAR_IMG}
                    />
                <CardTitle title="也不知道做点什么功能好" subtitle="啊" />
                <CardText>
                    2333
                </CardText>
            </Card>
        );
    }
}

export default Home;