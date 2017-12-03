import * as React from "react";
import { observer } from "mobx-react";
import { Card } from "material-ui/Card";
import ISearch from "material-ui/svg-icons/action/search";
import ArticleTmp from "../ArticleTmp";
import LikeListTmp from "../LikeListTmp";
import {
    CircularProgress,
    AutoComplete,
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
    getLikeList() {
        const { cpArticles } = this.props.store;
        return cpArticles.sort((a, b) => b.like - a.like)
            .slice(0, 3);
    }
    render() {
        const { store } = this.props;
        const likeList = this. getLikeList();

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
                        <div className="indexArticles">
                            <div className="articlesList">
                            {
                                store.articles.map((article, index) =>
                                <ArticleTmp key={index} article={article}/>
                                )
                            }
                            </div>
                            <div>
                                <div className="search">
                                    <AutoComplete
                                        value={store.searchArticlesTitle}
                                        onUpdateInput={val => store.setSearchArticlesTitle(val)}
                                        onNewRequest={val => store.realSearchArticlesTitle(val)}
                                        dataSource={store.articles.map(art => art.title)}
                                        hintText="请输入文章标题"
                                        floatingLabelText="搜索文章" />
                                    <ISearch />
                                </div>
                                <div>

                                </div>
                                <div className="other">
                                    <img src="http://upload-images.jianshu.io/upload_images/2738521-72b26ecb7788fa6c.jpg"/>
                                </div>
                                <div className="readList">
                                    <div>点赞·排行</div>
                                    <div>
                                        {
                                            likeList.map((item, index) =>
                                            <LikeListTmp data={item} key={index}/>
                                        )
                                        }
                                    </div>
                                </div>
                                <div className="contact">
                                    <div>联系·我们</div>
                                    <div>邮箱 784487301@qq.com</div>
                                </div>
                            </div>
                        </div>
                    }
                </section>
            </Card>
        );
    }
}

export default Index;