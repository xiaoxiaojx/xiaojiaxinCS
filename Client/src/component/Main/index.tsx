import * as React from "react";
import { Card } from "material-ui/Card";
import "./index.scss";

class Main extends React.Component<{}, {}> {
    render() {
        return (
            <Card className="MainWrap">
                {this.props.children}
            </Card>
        );
    }
}

export default Main;