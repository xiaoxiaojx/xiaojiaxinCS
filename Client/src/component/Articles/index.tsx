import * as React from "react";
import { Card } from "material-ui/Card";
import "./index.scss";

class Articles extends React.Component<{}, {}> {
    render() {
        return (
            <Card className="ArticlesWrap">
                <header>
                    Articles
                </header>
            </Card>
        )
    }
}

export default Articles;