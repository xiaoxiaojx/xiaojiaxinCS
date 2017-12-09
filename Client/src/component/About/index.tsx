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
                <CardText>
                    <h3>
                        网站的定位
                    </h3>
                    <p>
                        致力于带来更轻量, 更快速写文章的体验
                    </p>
                    <h3>
                        基本信息
                    </h3>
                    <p>
                        专业: 计算机·软件工程
                    </p>
                    <p>
                        邮箱: xiaojiaixn@gmail.com
                    </p>
                    <p>
                        微信: xjx784487301
                    </p>
                </CardText>
            </Card>
        );
    }
}

export default About;