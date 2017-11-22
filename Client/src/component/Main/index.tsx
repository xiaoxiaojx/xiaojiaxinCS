import * as React from "react";
import { Card, CardHeader, CardTitle, CardText } from "material-ui/Card";
import {
	getLocalStorageData
} from "../../common/utils";
import "./index.scss";

//  const TEST_IMG_1 = require("../../common/image/testImg3.jpeg");
const WU_KONG = require("../../common/image/testImg5.jpg");

class Main extends React.Component<{}, {}> {
    render() {
        const data = getLocalStorageData();

        return (
            <Card className="MainWrap">
                <CardHeader
                    title={data["nickname"]}
                    subtitle="欢迎你"
                    avatar={WU_KONG}
                    />
                <CardTitle title="也不知道做点什么功能好" subtitle="啊" />
                <CardText>
                    2333
                </CardText>
            </Card>
        );
    }
}

export default Main;