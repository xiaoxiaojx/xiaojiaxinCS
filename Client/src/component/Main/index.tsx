import * as React from "react";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import "./index.scss";

const TEST_IMG_1 = require("../../common/image/testImg3.jpeg");
const WU_KONG = require("../../common/image/testImg5.jpg");

class Main extends React.Component<{}, {}> {
    render() {
        return (
            <Card className="MainWrap">
                <CardHeader
                    title="Xiao Jiaxin"
                    subtitle="A front-end programmer"
                    avatar={WU_KONG}
                    />
                <CardMedia
                    overlay={<CardTitle title="Shang hai" subtitle="I love Shang hai" />}
                    >
                    <img src={TEST_IMG_1} alt="" />
                </CardMedia>
                <CardTitle title="Card title" subtitle="Card subtitle" />
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                <CardActions>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
                </CardActions>
            </Card>
        );
    }
}

export default Main;