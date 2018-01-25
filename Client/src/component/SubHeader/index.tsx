import * as React from "react";
import {
    AutoComplete,
} from "material-ui";
import ISearch from "material-ui/svg-icons/action/search";
import { observer } from "mobx-react";
import Chips from "../Chips";

import Store from "../../store";
import "./index.scss";

interface SubHeaderProps {
    store: Store;
}

@observer
class SubHeader extends React.Component<SubHeaderProps, {}> {
    render() {
        const { store } = this.props;
        return (
            <div className="SubHeaderWrap">
                <Chips store={store}/>
                <div className="search">
                    <AutoComplete
                        value={store.filterArticles.title}
                        onUpdateInput={val => store.setFilterArticles({title: val})}
                        onNewRequest={val => store.setFilterArticles({title: val}, false)}
                        dataSource={store.articles.map(art => art.title)}
                        hintText="请输入文章标题"
                        floatingLabelText="搜索文章" />
                    <ISearch />
                </div>
            </div>
        );
    }
}

export default SubHeader;