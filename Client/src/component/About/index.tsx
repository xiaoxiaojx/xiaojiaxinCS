import * as React from "react";
import { Card, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import {
    ABOUT_AVATAR_IMG,
    ABOUT_BG_IMG
} from "../../common/baseImage";
import "./index.scss";

class About extends React.Component<{}, {}> {
    render() {
        return (
            <Card className="AboutWrap">
                <CardHeader
                    title="Xiao Jiaxin"
                    subtitle="17年毕业的前端攻城🦁️"
                    avatar={ABOUT_AVATAR_IMG}
                    />
                <CardMedia
                    overlay={<CardTitle title="City" subtitle="Shang hai" />}
                    >
                    <img src={ABOUT_BG_IMG} alt="" />
                </CardMedia>
                <CardTitle title="专业" subtitle="计算机系软件工程" />
                <CardText>
                    <h3>
                        为什么要写这样一个网站?
                    </h3>
                    <p>
                        当然是为了写一个更轻量的网站, 能够快速记录笔者的优美的文章。 据权威资料显示, 该网站已经大大方便了人们的生活(第二句话如有人投诉或者质疑, 立删)。
                    </p>
                    <h3>
                        请说真说!
                    </h3>
                    <p>
                        作业太少了。
                    </p>
                </CardText>
            </Card>
        );
    }
}

export default About;