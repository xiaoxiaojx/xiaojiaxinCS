import * as React from "react";
import { Card } from "material-ui/Card";
import "./index.scss";

class Index extends React.Component<{}, {}> {
    render() {
        return (
            <Card className="IndexWrap">
                <header>
                    Index
                </header>
            </Card>
        )
    }
}

export default Index;