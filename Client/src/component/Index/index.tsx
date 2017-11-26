import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "material-ui/Card";
import ArticleTmp from "../ArticleTmp";
import {
    CircularProgress
} from "material-ui";
import Store from "../../store";
import "./index.scss";

interface IndexProps {
    store: Store;
}

interface IndexState {
}

@observer
class Index extends React.Component<IndexProps, IndexState> {
    render() {
        const { store } = this.props;

        return (
            <Card className="IndexWrap">
                <header>
                </header>
                <section>
                    {
                        store.loadingIndexPage ?
                        <CircularProgress
                            className="progress"
                            size={100}
                            thickness={5} />
                        :
                        store.articles.map((article, index) =>
                            <ArticleTmp key={index} article={article}/>
                        )
                    }
                </section>
            </Card>
        );
    }
}

export default Index;